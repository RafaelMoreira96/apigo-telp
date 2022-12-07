import { Course } from '../models/course';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class MateriaService {
  constructor(private http: HttpClient) {}

  findById(id: any): Observable<Course> {
    return this.http.get<Course>(`${API_CONFIG.baseUrl}/courses/${id}`);
  }

  findAll(): Observable<Course[]> {
    return this.http.get<Course[]>(`${API_CONFIG.baseUrl}/courses/`);
  }

  create(course: Course): Observable<Course> {
    return this.http.post<Course>(
      `${API_CONFIG.baseUrl}/courses/`,
      course
    );
  }

  update(course: Course): Observable<Course> {
    return this.http.put<Course>(
      `${API_CONFIG.baseUrl}/courses/`,
      course
    );
  }

  delete(id: any): Observable<Course> {
    return this.http.delete<Course>(
      `${API_CONFIG.baseUrl}/courses/${id}`
    );
  }
}
