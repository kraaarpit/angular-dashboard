import { EmployeeService } from './../../service/employee.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.less']
})
export class EmployeeComponent implements OnInit {
  employeeForm: any;
  isUpdate: boolean;
  id: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.id;
    console.log(this.id);
    if (this.id) {
      this.isUpdate = true;
      this.employeeService
        .getById(this.id)
        .subscribe((res) => this.createForm(res['data']));
    } else {
      this.createForm({});
    }
  }
  createForm(data) {
    this.employeeForm = this.fb.group({
      employee_name: [data.employee_name || '', [Validators.required]],
      employee_salary: [data.employee_salary || '', [Validators.required]],
      employee_age: [data.employee_age || '', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.isUpdate) {
      this.employeeService
        .update(this.id, this.employeeForm.value)
        .subscribe((res) => {
          console.log('updated', res);
          this.router.navigate(['dashboard']);
        });
    } else {
      this.employeeService.create(this.employeeForm.value).subscribe((res) => {
        console.log('updated', res);
        this.router.navigate(['dashboard']);
      });
    }
  }

  get employee_name() {
    return this.employeeForm.get('employee_name');
  }
  get employee_salary() {
    return this.employeeForm.get('employee_salary');
  }
  get employee_age() {
    return this.employeeForm.get('employee_age');
  }
}
