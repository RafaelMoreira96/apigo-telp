import { Student } from './../models/student';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(private http: HttpClient) {}

  findById(id: any): Observable<Student> {
    return this.http.get<Student>(`${API_CONFIG.baseUrl}/students/${id}`);
  }

  findAll(): Observable<Student[]> {
    return this.http.get<Student[]>(`${API_CONFIG.baseUrl}/students/`);
  }

  create(student: Student): Observable<Student> {
    return this.http.post<Student>(
      `${API_CONFIG.baseUrl}/students/`,
      student
    );
  }

  update(student: Student): Observable<Student> {
    return this.http.put<Student>(
      `${API_CONFIG.baseUrl}/students/`,
      student
    );
  }

  delete(id: any): Observable<Student> {
    return this.http.delete<Student>(
      `${API_CONFIG.baseUrl}/students/${id}`
    );
  }
}
