import { Component, OnInit, inject } from '@angular/core';
import { SidebarComponent } from "../../../components/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  imports: [FormsModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  constructor() { }
  router = inject(Router);
  fb = inject(FormBuilder);
  loginForm!: FormGroup;
  authService = inject(AuthService);

  message: string = ''
  error: boolean = false;
  public isSubmiting = false;

  initForm(): FormGroup {
    return this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  login(): void {
    this.error = false;
    this.message = '';
    this.isSubmiting = true;
    this.authService.login(this.loginForm.value).pipe(
      catchError(err => {
        this.isSubmiting = false;
        this.error = true;
        if (Array.isArray(err?.error?.message)) { this.error = err?.error?.message[0] }
        else {
          this.message = err?.error?.message || 'Error al logearse';
        }
        return throwError(() => err);
      })
    ).subscribe(res => {
      this.isSubmiting = false;
      if (res.data.user.roles.includes('cliente') || res.data.user.roles.includes('repartidor')) {
        this.error = true;
        this.message = 'Solo gerentes y vendedores tienen acceso a esta aplicación';
      }
      else {
        this.authService.currentUser.set(res.data.user);
        localStorage.setItem('token', res.data.accessToken);
        this.router.navigate(['dashboard']);
      }

    }
    );
  }

  resetPassword(){
    this.router.navigate(['password']);
  }

  ngOnInit(): void {
    this.loginForm = this.initForm();
  }
}
