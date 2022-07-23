import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  error: any;
  isSubmit = false

  // forgot password form
  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(30),
      Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
    ])
  }
  )

  constructor(private loginService: LoginService, private router: Router) { }

  // forgot password logic
  onSubmit() {

    this.isSubmit = true
    const loginData = this.forgotPasswordForm.value
    this.loginService.forgotPassword(loginData.email).then(() => {
      this.router.navigate(['/verify-email'])
    }, err => {
      this.error = 'Email is invalid'
    })

  }
}
