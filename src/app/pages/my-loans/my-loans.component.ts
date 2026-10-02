import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { LoanService } from '../../services/loan.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-loans',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight font-outfit">{{ 'myloans.title' | translate }}</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-1 text-sm">{{ 'myloans.subtitle' | translate }}</p>
    </div>
    
    <div *ngIf="isLoading" class="text-slate-500 text-center py-10">Carregando...</div>

    <div *ngIf="!isLoading && loans.length === 0" class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-8 text-center transition-colors">
      <div class="w-16 h-16 bg-slate-50 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
        <span class="material-symbols-outlined text-3xl text-slate-400 dark:text-slate-500">menu_book</span>
      </div>
      <h3 class="text-lg font-medium text-slate-900 dark:text-white">{{ 'myloans.empty_title' | translate }}</h3>
      <p class="text-slate-500 dark:text-slate-400 mt-2 max-w-sm mx-auto">{{ 'myloans.empty_desc' | translate }}</p>
      <button class="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium shadow-sm shadow-indigo-600/20 transition-colors">
        {{ 'myloans.explore' | translate }}
      </button>
    </div>

    <div *ngIf="!isLoading && loans.length > 0" class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
      <table class="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead class="bg-slate-50 dark:bg-slate-800">
          <tr>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Livro</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Data de Levantamento</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Data de Entrega</th>
            <th scope="col" class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
          <tr *ngFor="let loan of loans" class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-lg flex items-center justify-center">
                  <span class="material-symbols-outlined text-[20px]">book</span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-slate-900 dark:text-white">{{ loan.bookTitle || 'Livro ID: ' + loan.bookId }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-slate-600 dark:text-slate-300">{{ loan.checkoutDate }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-slate-600 dark:text-slate-300">{{ loan.dueDate }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full" 
                    [ngClass]="loan.status === 'PENDING' ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400' : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'">
                {{ loan.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class MyLoansComponent implements OnInit {
  private loanService = inject(LoanService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  loans: any[] = [];
  isLoading = true;

  ngOnInit() {
    const loggedUserId = localStorage.getItem('logged_user_id');
    
    if (!loggedUserId) {
      // Se não houver ID do utilizador (entrou sem passar pelo login), forçamos o regresso ao login
      this.router.navigate(['/']);
      return;
    }

    this.isLoading = true;
    this.cdr.detectChanges();
    
    try {
      this.loanService.getUserLoans(loggedUserId).subscribe({
        next: (data) => {
          this.loans = data;
          this.isLoading = false;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error("Erro ao carregar empréstimos:", err);
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      });
    } catch (e) {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}
