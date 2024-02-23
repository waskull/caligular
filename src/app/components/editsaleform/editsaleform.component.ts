import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { InventoryService } from '../../services/inventory.service';
import { SaleService } from '../../services/sale.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
@Component({
  selector: 'editsaleform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editsaleform.component.html',
  styleUrl: './editsaleform.component.scss'
})
export class EditsaleformComponent implements OnInit{
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  @Input() show: boolean = false;
  dataForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  clientList: any[] = [];
  inventoryList: any[] = [];
  deliveryList: any[] = [];
  selectedItems: any[] = [];
  total: number = 0;
  userService = inject(UserService);
  fb = inject(FormBuilder);
  inventoryService = inject(InventoryService);
  salesService = inject(SaleService);

  ngOnInit(): void {
    this.dataForm = this.initForm();
    this.selectedItems = this.data?.ite;
    this.data?.ite?.forEach((e:any) => {
      this.total+=e?.qty*e?.price;
    });

    
    this.loadFormData();
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
      delivery_man: [0, [Validators.required, Validators.min(1)]],
    });
    if (this.data) {
      this.editing = true;
      d.patchValue(this.data);
    }
    return d;
  }
  sendData() {
    this.salesService.update(this.data.id, parseInt(this.dataForm.value.delivery_man)).pipe(
      catchError(err => {
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.error = err?.error?.message || 'Error al editar la venta';
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.error = '';
      this.total = 0;
      this.emitForm.emit({});
    });

  }
}
