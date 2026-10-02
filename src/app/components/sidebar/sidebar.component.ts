import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { AuthService } from '../../services/auth.service';

export interface MenuTransaction {
  id: string;
  name: string;
  route: string;
  icon: string;
  subTransactions?: MenuTransaction[];
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  userMenus: MenuTransaction[] = [];

  private authService = inject(AuthService);
  private router = inject(Router);

  ngOnInit() {
    this.userMenus = [
      {
        id: '1', name: 'Dashboard', route: '/dashboard', icon: 'home'
      },
      {
        id: '2', name: 'Loan Management', route: '', icon: 'book',
        subTransactions: [
          { id: '21', name: 'My Loans', route: '/my-loans', icon: 'list' },
          { id: '22', name: 'Issue Loan', route: '/issue-loan', icon: 'add' }
        ]
      },
      {
        id: '3', name: 'Gestão', route: '', icon: 'settings',
        subTransactions: [
          { id: '31', name: 'Utilizadores', route: '/users', icon: 'people' },
          { id: '32', name: 'Perfis', route: '/profiles', icon: 'admin_panel_settings' },
          { id: '33', name: 'Transacções', route: '/transactions', icon: 'account_tree' }
        ]
      }
    ];
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
