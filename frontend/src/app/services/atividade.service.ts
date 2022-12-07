import { Activity } from '../models/activity';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../config/api.config';

@Injectable({
  providedIn: 'root',
})
export class AtividadeService {
  constructor(private http: HttpClient) {}

  findById(id: any): Observable<Activity> {
    return this.http.get<Activity>(`${API_CONFIG.baseUrl}/activities/${id}`);
  }

  findAll(): Observable<Activity[]> {
    return this.http.get<Activity[]>(`${API_CONFIG.baseUrl}/activities/`);
  }

  create(activity: Activity): Observable<Activity> {
    return this.http.post<Activity>(
      `${API_CONFIG.baseUrl}/activities/`,
      activity
    );
  }

  update(activity: Activity): Observable<Activity> {
    return this.http.put<Activity>(
      `${API_CONFIG.baseUrl}/activities/`,
      activity
    );
  }

  delete(id: any): Observable<Activity> {
    return this.http.delete<Activity>(
      `${API_CONFIG.baseUrl}/activities/${id}`
    );
  }
}
