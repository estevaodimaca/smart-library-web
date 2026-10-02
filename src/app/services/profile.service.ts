import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/profiles`;
  
  getProfiles(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getProfile(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createProfile(profile: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, profile);
  }

  updateProfile(id: string, profile: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, profile);
  }

  deleteProfile(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
