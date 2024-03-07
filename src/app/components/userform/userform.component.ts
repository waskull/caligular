import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { User } from '../../interfaces';
import { catchError, throwError } from 'rxjs';
import { default as dayjs } from 'dayjs';
import 'dayjs/locale/es-mx';
import { validateTypeDate } from '../../validators/dateValidator';
import { OnlynumbersDirective } from '../../onlynumbers.directive';

@Component({
  selector: 'userform',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, OnlynumbersDirective],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.scss'
})
export class UserformComponent implements OnInit {
  userService = inject(UserService);
  fb = inject(FormBuilder);
  @Output() emitForm = new EventEmitter<any>();
  @Output() editUser = new EventEmitter<any>();
  @Input() userData!: any;
  userForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  ngOnInit(): void {
    this.userForm = this.initForm();
  }
  initForm(): FormGroup {
    const d = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      cedula: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[0-9]*$")]],
      email: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      birthdate: ['', [Validators.required, validateTypeDate]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(7), Validators.pattern("^[0-9]*$")]],
      roles: ['cliente', [Validators.required]],
    });
    if (this.userData) {
      this.editing = true;
      d.patchValue({
        firstname: this.userData?.firstname,
        lastname: this.userData?.lastname,
        email: this.userData?.email,
        cedula: this.userData?.cedula,
        birthdate: this.userData?.birthdate,
        phone: this.userData?.phone,
        roles: this.userData?.roles[0]
      });
    }
    return d;
  }
  sendData() {
    let user: User = {
      firstname: this.userForm.value.firstname,
      lastname: this.userForm.value.lastname,
      cedula: this.userForm.value.cedula,
      birthdate: this.userForm.value.birthdate,
      email: this.userForm.value.email,
      phone: this.userForm.value.phone,
      password: this.userForm.value.password,
      roles: [
        this.userForm.value.roles
      ]
    };

    if (this.userData) {
      const id: number = this.userData?.id;
      this.userService.update(user, this.userData?.id).pipe(
        catchError(err => {
          if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
          else {
            this.error = err?.error?.message || 'Error al Editar el Usuario';
          }
          return throwError(() => err);
        })
      ).subscribe(res => {
        console.log(res.data);
        this.error = '';
        user.id = id;
        user.email = this.userForm.value.email;
        this.editUser.emit(user);
      });
    }
    else {
      delete user?.id;
      this.userService.create(user).pipe(
        catchError(err => {
          if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
          else {
            this.error = err?.error?.message || 'Error al Crear el Usuario';
          }
          return throwError(() => err);
        })
      ).subscribe(res => {
        const { password, ...newUser } = res.data;
        console.log(res); console.log(newUser);
        this.error = '';
        this.emitForm.emit(newUser);
      });
    }
  }
}
