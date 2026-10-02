import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private http = inject(HttpClient);
  
  issueLoan(userId: string, bookId: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/loans?userId=${userId}&bookId=${bookId}`, {});
  }

  getUserLoans(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/loans/user/${userId}`);
  }
}
