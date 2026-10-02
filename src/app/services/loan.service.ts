import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private http = inject(HttpClient);
  
  issueLoan(userId: string, bookId: string): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/api/loans?userId=${userId}&bookId=${bookId}`, {});
  }

  getUserLoans(userId: string): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/loans/user/${userId}`);
  }
}
