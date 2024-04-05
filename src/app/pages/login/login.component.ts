import { Component } from '@angular/core';
import { DefaultLoginLayoutComponent } from '../../components/default-login-layout/default-login-layout.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PrimaryInputComponent } from '../../components/primary-input/primary-input.component';
import { LoginService } from '../../services/login.service'
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [DefaultLoginLayoutComponent, ReactiveFormsModule, PrimaryInputComponent],
  providers: [LoginService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastrService,
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl(
        '',
        [Validators.required, Validators.email]
      ),

      password: new FormControl(
        '',
        [Validators.required, Validators.minLength(8)]
      )
    })
  }

  submit() {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: () => this.toastrService.success("Login feito com sucesso"),
      error: () => this.toastrService.error ("Erro inesperado! Tente novamente"),
    })
  }

  navigate() {
    this.router.navigate(["/cadastro"])
  }
}
