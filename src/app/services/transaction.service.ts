import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/transactions`;
  
  getTransactions(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getTransaction(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, transaction);
  }

  updateTransaction(id: string, transaction: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, transaction);
  }

  deleteTransaction(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
