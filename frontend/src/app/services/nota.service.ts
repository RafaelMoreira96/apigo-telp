import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';
import { GradeStudent } from '../models/gradestudent';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  constructor(private http: HttpClient) {}

  findById(id: any): Observable<GradeStudent> {
    return this.http.get<GradeStudent>(`${API_CONFIG.baseUrl}/grades/${id}`);
  }

  findAll(id: any): Observable<GradeStudent[]> {
    return this.http.get<GradeStudent[]>(`${API_CONFIG.baseUrl}/grades/st/${id}`);
  }

  create(activity: GradeStudent): Observable<GradeStudent> {
    return this.http.post<GradeStudent>(
      `${API_CONFIG.baseUrl}/grades/`,
      activity
    );
  }

  update(activity: GradeStudent): Observable<GradeStudent> {
    return this.http.put<GradeStudent>(
      `${API_CONFIG.baseUrl}/grades/`,
      activity
    );
  }

  delete(id: any): Observable<GradeStudent> {
    return this.http.delete<GradeStudent>(
      `${API_CONFIG.baseUrl}/grades/${id}`
    );
  }
}
