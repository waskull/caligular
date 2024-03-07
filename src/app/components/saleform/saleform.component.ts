import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { InventoryService } from '../../services/inventory.service';
import { SaleService } from '../../services/sale.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Method } from '../../constants/Enum';
import { OnlynumbersDirective } from '../../onlynumbers.directive';

@Component({
  selector: 'saleform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, OnlynumbersDirective],
  templateUrl: './saleform.component.html',
  styleUrl: './saleform.component.scss'
})
export class SaleformComponent implements OnInit {
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  methods = Method;
  dataForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  clientList: any[] = [];
  inventoryList: any[] = [];
  deliveryList: any[] = [];
  selectedItems: any[] = [];
  total: number = 0;
  subtotal:number = 0;
  userService = inject(UserService);
  fb = inject(FormBuilder);
  inventoryService = inject(InventoryService);
  salesService = inject(SaleService);

  constructor() { }

  ngOnInit(): void {
    this.dataForm = this.initForm();
    this.loadFormData();
  }

  addItem(item: any) {
    item = JSON.parse(item);
    let t = false;
    this.selectedItems.forEach(e => {
      if (e.id === item.id) t = true;
    });
    if (!t) {
      item.quantity = 1;
      this.selectedItems.push(item);
      this.calculateTotal();
    }
    this.dataForm.patchValue({ quantity: 1 });
  }

  minus(product: any){
    if(product.quantity <= 1) return;
    const isItemInCart = this.selectedItems.find((cartItem) => cartItem.id === product.id);
    if (isItemInCart) {
      this.selectedItems.forEach((item) => {
            if (item.id === product.id) {
                item.quantity--;
            }
        });
    }
    this.calculateTotal();
  }

  plus(product:any){
      const isItemInCart = this.selectedItems.find((cartItem) => cartItem.id === product.id);
      if (isItemInCart) {
        this.selectedItems.forEach((item) => {
              if (item.id === product.id) {
                  item.quantity++;
              }
          });
      }
      this.calculateTotal();

  }

  removeItem(item: any) {
    this.selectedItems = this.selectedItems.filter(res => res.id !== item.id);
    this.calculateTotal();
  }

  calculateTotal() {
    this.subtotal = 0;
    this.total = 0;
    this.selectedItems.forEach((e: { item: { price: string; wholesale_price:string }; quantity: string; }) => {
      this.subtotal += parseFloat(e.item.price) * parseInt(e.quantity);
    });
    this.selectedItems.forEach((e: { item: { price: string; wholesale_price:string }; quantity: string; }) => {
      if(this.subtotal>=10) {
        this.total += parseFloat(e.item.wholesale_price) * parseInt(e.quantity);
      }
      else{
        this.total += parseFloat(e.item.price) * parseInt(e.quantity);
      }
    });
  }

  calculateDelivery():number{
    if(this.total < 30 ){return this.total+=4;}
    else if(this.total >= 30 && this.total<60){return this.total+=2;}
    else{return this.total}
  }

  loadFormData() {
    this.inventoryService.getAll().subscribe(res => {
      this.inventoryList = res;
    });
    this.userService.getAll().subscribe(res => {
      this.clientList = res;
    });
    this.userService.getAllDelivery().subscribe(res => {
      this.deliveryList = res;
    });
  }
  initForm(): FormGroup {
    const d = this.fb.group({
      client: [0, [Validators.required, Validators.min(1)]],
     // delivery_man: [0, [Validators.required, Validators.min(1)]],
      item: [0, [Validators.required, Validators.min(1)]],
      pay_code: ['', [Validators.minLength(1), Validators.maxLength(4)]],
      quantity: [1, [Validators.required, Validators.min(1)]],
      address: ['', [Validators.required, Validators.minLength(2)]],
      paymentMethod: ['', [Validators.required, Validators.minLength(2)]],
    });
    if (this.data) {
      this.editing = true;
      d.patchValue(this.data);
    }
    return d;
  }
  clearCode(){
    this.dataForm.patchValue({pay_code:''});
  }
  sendData() {
    let tmpList: any[] = [];
    this.selectedItems.forEach(e => {
      tmpList.push({
        id: e.id,
        quantity: e.quantity
      });
    });
    let Data: any = {
      items: tmpList,
      //delivery_man: this.dataForm.value.delivery_man,
      paymentMethod: this.dataForm.value.paymentMethod,
      pay_code: this.dataForm.value.paymentMethod  === this.methods.Cash ? [] : [this.dataForm.value.pay_code],
      address: this.dataForm.value.address,
      user: parseInt(this.dataForm.value.client),
    };
    
    this.salesService.create(Data).pipe(
      catchError(err => {
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.error = err?.error?.message || 'Error al Crear la venta';
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.error = '';
      this.total = 0;
      this.subtotal = 0;
      this.emitForm.emit(Data);
      this.dataForm.reset();
      this.selectedItems = [];
    });

  }
}
