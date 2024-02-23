import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProviderService } from '../../services/provider.service';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'providerform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './providerform.component.html',
  styleUrl: './providerform.component.scss'
})
export class ProviderformComponent implements OnInit {
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  dataForm!: FormGroup;
  providerService = inject(ProviderService);
  editing: boolean = false;
  error: string = '';
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.dataForm = this.initForm();
  }

  initForm():FormGroup{
    const d = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      address: ['', [Validators.required, Validators.minLength(5)]],
      phone: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.minLength(5)]],
      phone2: ['']
    });
    if(this.data){
      this.editing = true;
      d.patchValue(this.data);
    }
    return d;
  }

  sendData(){
    let Data:any = {
      name:this.dataForm.value.name,
      address:this.dataForm.value.address,
      email: this.dataForm.value.email,
      phone2: this.dataForm.value.phone2,
      phone: this.dataForm.value.phone
    };
    if(this.data){
      const id: number = this.data?.id;
      this.providerService.update(Data,id).pipe(
        catchError(err => {
          if(Array.isArray(err?.error?.message)){this.error =err?.error?.message[0]}
          else{
            this.error= err?.error?.message || 'Error al Editar el proveedor';
          }
          return throwError(() => err);
      })
      ).subscribe(res => {
        this.error = '';
        Data.id = id;
       
        this.emitForm.emit(Data);
      });
    }
    else{
      delete Data?.id;
      this.providerService.create(Data).pipe(
        catchError(err => {
          if(Array.isArray(err?.error?.message)){this.error =err?.error?.message[0]}
          else{
            this.error= err?.error?.message || 'Error al Editar el proveedor';
          }
          return throwError(() => err);
      })
      ).subscribe(res => {
        this.error = '';
        this.emitForm.emit(Data);
      });
    }
  }
}
