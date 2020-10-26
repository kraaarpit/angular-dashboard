import { Router } from '@angular/router';
import { LoginService } from './../../../../core/login.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  loginForm: any;
  // loginForm: any;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
    console.log('dd', this.loginForm);
  }

  onSubmit() {
    const isAuthorized = this.loginService.login(
      this.loginForm.value.email,
      this.loginForm.value.password
    );
    if (isAuthorized) {
      this.toastr.success('Redirecting to dashboard..', 'Login Success');
      return this.router.navigate(['/dashboard']);
    }
    this.loginForm.reset();

    this.toastr.error('Incorrect username or password', 'Login Error');
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
}
