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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {
  registerForm: any;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fName: ['', [Validators.required]],
      lName: ['', [Validators.required, Validators.pattern(/[A-Za-z]*/)]],
      email: ['', [Validators.required, Validators.email]],
      passwords: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(5)]],
          cPassword: ['', [Validators.required, Validators.minLength(5)]]
        },
        {
          validator: this.matchPassword
        }
      )
    });
  }
  get fName() {
    return this.registerForm.get('fName');
  }
  get lName() {
    return this.registerForm.get('lName');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get password() {
    return this.registerForm.get('passwords').get('password');
  }
  get cPassword() {
    return this.registerForm.get('passwords').get('cPassword');
  }

  matchPassword(group: FormGroup) {
    let pass = group.get('password').value;
    let cPass = group.get('cPassword').value;
    return pass === cPass ? null : { passMisMatch: true };
  }

  onSubmit() {
    this.loginService.signup(this.email.value, this.password.value);
    this.toastr.success('Redirecting to dashboard..', 'Registration Success');
    this.router.navigate(['/dashboard']);
  }
}
