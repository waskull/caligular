import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'productform',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './productform.component.html',
  styleUrl: './productform.component.scss'
})
export class ProductformComponent implements OnInit {
  @Output() emitForm = new EventEmitter<any>();
  @Input() data!: any;
  dataForm!: FormGroup;
  imageURL!: string;
  editing: boolean = false;
  error: string = '';
  productService = inject(ProductService);
  fb = inject(FormBuilder);
  constructor() { }

  ngOnInit(): void {
    this.dataForm = this.initForm();
  }
  initForm(): FormGroup {
    const d = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      desc: ['', [Validators.required, Validators.minLength(2)]],
      price: [0.1, [Validators.required, Validators.min(0.1)]],
      wholesale_price: [0.1, [Validators.required, Validators.min(0.1)]],
      image: [null, [Validators.required]]
    });
    if (this.data) {
      this.editing = true;
      d.patchValue(this.data);
    }
    return d;
  }
  showPreview(event:any) {
    const file = (event.target as HTMLInputElement).files[0];
    this.dataForm.patchValue({
      image: file
    });
    this.dataForm.get('image').updateValueAndValidity()

    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  sendData() {
    let Data: any = {
      name: this.dataForm.value.name,
      price: this.dataForm.value.price,
      image: this.dataForm.value.image,
      wholesale_price: this.dataForm.value.wholesale_price,
      desc: this.dataForm.value.desc
    };
    const formData = new FormData();
    formData.append("image", this.dataForm.value.image);
    formData.append("price", this.dataForm.value.price);
    formData.append("wholesale_price", this.dataForm.value.wholesale_price);
    formData.append("name", this.dataForm.value.name);
    formData.append("desc", this.dataForm.value.desc);
    if(this.dataForm.value.price < this.dataForm.value.wholesale_price) {this.error='El precio al mayor no puede ser superior al precio al detal';return;}
    console.log(formData);
    if (this.data) {
      const id: number = this.data?.id;
      this.productService.update(formData, id).pipe(
        catchError(err => {
          if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
          else {
            this.error = err?.error?.message || 'Error al Editar el producto';
          }
          return throwError(() => err);
        })
      ).subscribe(res => {
        this.error = '';
        Data.id = id;
        this.dataForm.reset();
        this.emitForm.emit(Data);
      });
    }
    else {
      delete Data?.id;
      this.productService.create(formData).pipe(
        catchError(err => {
          if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
          else {
            this.error = err?.error?.message || 'Error al Crear el producto';
          }
          return throwError(() => err);
        })
      ).subscribe(res => {
        this.error = '';
        this.dataForm.reset();
        this.emitForm.emit(Data);
      });
    }
  }
}
