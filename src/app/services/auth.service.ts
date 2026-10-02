import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor() { }

  getAccessToken(): string | null {
    // Stub: Simula a recuperação de um token OAuth2 armazenado (ex: localStorage)
    return localStorage.getItem('access_token');
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  getCurrentUserRoles(): string[] {
    // Stub: Simula a extração das roles contidas no token JWT
    return ['ROLE_LIBRARY_USER', 'ROLE_EMPLOYEE'];
  }
}
