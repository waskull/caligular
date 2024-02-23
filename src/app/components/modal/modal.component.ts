import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { UserformComponent } from '../userform/userform.component';
import { ProductformComponent } from '../productform/productform.component';
import { SaleformComponent } from '../saleform/saleform.component';
import { OrderformComponent } from '../orderform/orderform.component';
import { ProviderformComponent } from '../providerform/providerform.component';
import { CommonModule } from '@angular/common';
declare var window: any;

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [UserformComponent, ProductformComponent, SaleformComponent, OrderformComponent, ProviderformComponent, CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() buttonName:string = 'Nuevo Registro';
  @Input() data!:any;
  @Input() modalId = 'modal';
  @Output() emitData = new EventEmitter<any>();
  formModal: any;
  @Input() userForm: boolean = false;
  @Input() productForm: boolean = false;
  @Input() inventoryForm: boolean = false;
  @Input() saleForm: boolean = false;
  @Input() orderForm: boolean = false;
  @Input() providerForm: boolean = false;

  openFormModal() {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById(this.modalId)
    );
    this.formModal.show();
  }

  emitUser(data:any){
    this.emitData.emit(data);
    this.formModal.hide();
  }

  close(){
    this.formModal.hide();
  }
}
