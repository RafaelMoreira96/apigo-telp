import { CourseStudent } from '../models/coursestudent';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class MateriaAlunoService {
  constructor(private http: HttpClient) {}

  findById(id: any): Observable<CourseStudent> {
    return this.http.get<CourseStudent>(
      `${API_CONFIG.baseUrl}/studentsCourse/${id}`
    );
  }

  findAll(): Observable<CourseStudent[]> {
    return this.http.get<CourseStudent[]>(
      `${API_CONFIG.baseUrl}/studentsCourse/`
    );
  }

  create(activity: CourseStudent): Observable<CourseStudent> {
    return this.http.post<CourseStudent>(
      `${API_CONFIG.baseUrl}/studentsCourse/`,
      activity
    );
  }

  update(activity: CourseStudent): Observable<CourseStudent> {
    return this.http.put<CourseStudent>(
      `${API_CONFIG.baseUrl}/studentsCourse/`,
      activity
    );
  }

  delete(id: any): Observable<CourseStudent> {
    return this.http.delete<CourseStudent>(
      `${API_CONFIG.baseUrl}/studentsCourse/${id}`
    );
  }
}
