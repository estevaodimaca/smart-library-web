import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);
  private http = inject(HttpClient);

  loginValue: string = '';
  isLoading: boolean = false;
  errorMsg: string = '';
  onLogin(event: Event) {
    event.preventDefault();
    if (!this.loginValue) return;

    this.isLoading = true;
    this.errorMsg = '';

    this.http.get<any[]>('http://localhost:8080/api/users').subscribe({
      next: (users) => {
        const foundUser = users.find(u => u.email === this.loginValue || u.taxId === this.loginValue || u.id === this.loginValue);
        
        if (foundUser) {
          localStorage.setItem('logged_user_id', foundUser.id);
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMsg = 'Utilizador não encontrado. Tente 105633920 ou 105633922.';
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMsg = 'Erro ao contactar o servidor.';
        this.isLoading = false;
      }
    });
  }
}
