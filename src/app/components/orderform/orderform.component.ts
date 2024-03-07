import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { InventoryService } from '../../services/inventory.service';
import { OrderService } from '../../services/order.service';
import { CommonModule } from '@angular/common';
import { DecimalsOnlyDirective } from '../../decimalsdirective.directive';

@Component({
  selector: 'orderform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DecimalsOnlyDirective],
  templateUrl: './orderform.component.html',
  styleUrl: './orderform.component.scss'
})
export class OrderformComponent implements OnInit {
  @Output() emitForm = new EventEmitter<any>();
  @Input() show = false;
  @Input() data!: any;
  dataForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  purchaseData!: any;
  inventoryList: any[] = [];
  selectedItems: any[] = [];
  orderService = inject(OrderService);
  fb = inject(FormBuilder);
  inventoryService = inject(InventoryService);
  constructor() { }

  ngOnInit(): void {
    this.dataForm = this.initForm();
    this.loadFormData();
  }

  minus(product: any) {
    if (product.quantity <= 1) return;
    const isItemInCart = this.selectedItems.find((cartItem) => cartItem.id === product.id);
    if (isItemInCart) {
      this.selectedItems.forEach((item) => {
        if (item.id === product.id) {
          item.quantity--;
        }
      });
    }
  }

  plus(product: any) {
    const isItemInCart = this.selectedItems.find((cartItem) => cartItem.id === product.id);
    if (isItemInCart) {
      this.selectedItems.forEach((item) => {
        if (item.id === product.id) {
          item.quantity++;
        }
      });
    }

  }

  addItem(item: any) {
    item = JSON.parse(item);
    console.log(item, typeof item);
    let t = false;
    this.selectedItems.forEach(e => {
      if (e.id === item.id) t = true;
    });
    if (!t) {
      item.quantity = 1;
      this.selectedItems.push(item);
    }
    this.dataForm.patchValue({ quantity: 1 });
  }

  removeItem(item: any) {
    this.selectedItems = this.selectedItems.filter(res => res.id !== item.id);
  }

  loadFormData() {
    this.inventoryService.getAll().subscribe(res => {
      this.inventoryList = res;
    });
    if(this.show){this.dataForm.controls.price.disable();}
  }
  initForm(): FormGroup {
    const d = this.fb.group({
      price: [0.10, [Validators.required, Validators.min(0.10)]],
      item: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
    if (this.data) {
      this.editing = true;
      d.patchValue(this.data);
    }
    return d;
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
      price: parseInt(this.dataForm.value.price),
      items: tmpList
    };

    this.orderService.create(Data).pipe(
      catchError(err => {
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.error = err?.error?.message || 'Error al Crear la compra';
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.error = '';
      this.emitForm.emit(Data);
      this.dataForm.reset();
      this.selectedItems = [];
    });

  }
}
