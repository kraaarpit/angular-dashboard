import { LoginService } from './../../../core/login.service';
import { EmployeeService } from './../service/employee.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less']
})
export class DashboardComponent implements OnInit {
  employees: any;
  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.employeeService.get().subscribe((res) => {
      this.employees = res['data'];
    });
  }
  create() {
    this.router.navigate(['/dashboard', 'create']);
  }
  edit(employee) {
    this.router.navigate(['/dashboard', 'employee', employee.id]);
  }
  delete(employee) {
    this.employeeService
      .delete(employee.id)
      .pipe(mergeMap((res) => this.employeeService.get()))
      .subscribe((res) => {
        this.employees = res['data'];
      });
  }

  logout() {
    this.loginService.logout();
  }
}
