import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth/auth.service';
import { DEF_CONF } from '../../../constants/DatePicker';
// import { DpDatePickerModule } from 'ng2-date-picker';
import { default as dayjs } from 'dayjs';
import 'dayjs/locale/es-mx';
import { validateTypeDate } from '../../../validators/dateValidator';
import { OnlynumbersDirective } from '../../../onlynumbers.directive';
dayjs.locale('es-mx');

@Component({
  selector: 'app-edituser',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,OnlynumbersDirective],
  templateUrl: './edituser.component.html',
  styleUrl: './edituser.component.scss'
})
export class EdituserComponent implements OnInit {
  userForm!: FormGroup;
  editing: boolean = false;
  error: string = '';
  userData!: any;
  fb = inject(FormBuilder);
  router = inject(Router);
  userService = inject(UserService);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.userForm = this.initForm();

    this.userForm.patchValue({
      firstname: this.authService.currentUser()?.firstname,
      lastname: this.authService.currentUser()?.lastname,
      birthdate: this.authService.currentUser()?.birthdate,
      cedula: this.authService.currentUser()?.cedula,
      phone: this.authService.currentUser()?.phone
    });
    if (!this.userForm.value.firstname) {
      this.authService.getInfo().subscribe(res => {
        this.userForm.patchValue({
          firstname: res?.firstname,
          lastname: res?.lastname,
          birthdate: res?.birthdate,
          cedula: res?.cedula,
          phone: res?.phone
        });
      });
    }
  }
  initForm(): FormGroup {
    return this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      cedula: ['', [Validators.required, Validators.min(6), Validators.pattern("^[0-9]*$")]],
      birthdate: ['', [Validators.required, validateTypeDate]],
      pass: ['', [Validators.required, Validators.minLength(4)]],
      pass2: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', [Validators.required, Validators.minLength(7), Validators.pattern("^[0-9]*$")]],
    },
    );

  }
  sendData() {
    let user: any = {
      firstname: this.userForm.value.firstname,
      lastname: this.userForm.value.lastname,
      cedula: this.userForm.value.cedula,
      birthdate: this.userForm.value.birthdate,
      phone: this.userForm.value.phone,
      password: this.userForm.value.pass
    };
    const id: number = 0;
    this.userService.updateProfile(user).pipe(
      catchError(err => {
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.error = err?.error?.message || 'Error al Editar tu Usuario';
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.error = '';
      this.authService.currentUser.set(user);
      this.router.navigate(['dashboard']);
    });

  }
  cancel() {
    this.router.navigate(['dashboard']);
  }

  passwordMatch(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password);
      const confirmPasswordControl = formGroup.get(confirmPassword);

      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors.passwordMismatch
      ) {
        return null;
      }

      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({ passwordMismatch: true });
        return { passwordMismatch: true };
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    };
  }
}
