import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  baseUrl = 'http://dummy.restapiexample.com/api/v1';
  constructor(private http: HttpClient) {}

  get() {
    return this.http.get(`${this.baseUrl}/employees`);
  }

  getById(id) {
    return this.http.get(`${this.baseUrl}/employee/${id}`);
  }

  geSort(sortBy, orderBy) {
    return this.http.get(
      `${this.baseUrl}/event?sortBy=${sortBy}&orderBy=${orderBy}`
    );
  }

  create(data) {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  update(id, data) {
    return this.http.put(`${this.baseUrl}/update/${id}`, data);
  }

  delete(id) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
