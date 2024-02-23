import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent implements OnInit {
  router = inject(Router);
  fb = inject(FormBuilder);
  passwordForm!: FormGroup;
  recoveryForm!: FormGroup;
  authService = inject(AuthService);
  hideContent = false;

  message: string = '';
  error: boolean = false;
  public isSubmiting = false;

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  resetForm(): FormGroup {
    return this.fb.group({
      code: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      password2: ['', [Validators.required, Validators.minLength(4)]],
    });
  }
  reset(): void {
    this.error = false;
    this.message = '';
    this.isSubmiting = true;
    this.authService.reset(this.passwordForm.value).pipe(
      catchError(err => {
        this.isSubmiting = false;
        this.error = true;
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.message = err?.error?.message || 'Error al recuperar la contraseña';
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.isSubmiting = false;
      alert("Una codigo de recuperación fue enviado al correo: " + this.passwordForm.value.email);
      this.hideContent = true;
    }
    );
  }
  resetPassword(): void {
    this.error = false;
    this.message = '';
    this.isSubmiting = true;
    this.authService.resetPassword({email:this.passwordForm.value.email,code:this.recoveryForm.value.code,password:this.recoveryForm.value.password}).pipe(
      catchError(err => {
        this.isSubmiting = false;
        this.error = true;
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.message = err?.error?.message || 'Error al reiniciar la contraseña';
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.isSubmiting = false;
      this.hideContent = false;
      alert("La contraseña se ha actualizado");
      this.router.navigate(['/']);
    }
    );
  }
  goBack() {
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    this.passwordForm = this.initForm();
    this.recoveryForm = this.resetForm();
  }
}
