import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'my-loans', loadComponent: () => import('./pages/my-loans/my-loans.component').then(m => m.MyLoansComponent) },
  { path: 'issue-loan', loadComponent: () => import('./pages/issue-loan/issue-loan.component').then(m => m.IssueLoanComponent) },
  { path: 'users', loadComponent: () => import('./pages/user-management/user-management.component').then(m => m.UserManagementComponent) },
  { path: 'profiles', loadComponent: () => import('./pages/profile-management/profile-management.component').then(m => m.ProfileManagementComponent) },
  { path: 'transactions', loadComponent: () => import('./pages/transaction-management/transaction-management.component').then(m => m.TransactionManagementComponent) }
];
