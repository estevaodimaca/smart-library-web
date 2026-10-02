import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { UserService } from '../../services/user.service';
import { BookService } from '../../services/book.service';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-issue-loan',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslatePipe],
  template: `
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight font-outfit">{{ 'issueloan.title' | translate }}</h1>
      <p class="text-slate-500 dark:text-slate-400 mt-1 text-sm">{{ 'issueloan.subtitle' | translate }}</p>
    </div>
    
    <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-8 transition-colors max-w-2xl">
      <!-- Success/Error Message -->
      <div *ngIf="message" class="mb-6 p-4 rounded-xl text-sm font-medium" [ngClass]="isError ? 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400' : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400'">
        {{ message }}
      </div>

      <form class="space-y-6" (ngSubmit)="submitLoan()">
        <!-- User Search -->
        <div class="relative">
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{{ 'issueloan.user' | translate }}</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">person</span>
            <input type="text" [(ngModel)]="userSearch" name="userSearch" autocomplete="off" (input)="filterUsers()" (focus)="showUserDropdown = true; filterUsers()" (blur)="hideUserDropdown()" [placeholder]="'issueloan.search_user' | translate" class="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-900 dark:text-white outline-none transition-all">
          </div>
          <!-- Dropdown -->
          <div *ngIf="showUserDropdown && filteredUsers.length > 0" class="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            <div *ngFor="let user of filteredUsers" (mousedown)="selectUser(user)" class="px-4 py-3 hover:bg-indigo-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-0 transition-colors">
              <div class="font-medium text-slate-900 dark:text-white">{{ user.firstName }} {{ user.lastName }}</div>
              <div class="text-xs text-slate-500">{{ user.email }} | NUIT: {{ user.taxId }}</div>
            </div>
          </div>
          <div *ngIf="selectedUser" class="mt-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
             <span class="material-symbols-outlined text-[16px]">check_circle</span> Selecionado: {{ selectedUser.firstName }} {{ selectedUser.lastName }}
          </div>
        </div>

        <!-- Book Search -->
        <div class="relative">
          <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">{{ 'issueloan.book' | translate }}</label>
          <div class="relative">
            <span class="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 text-[20px]">menu_book</span>
            <input type="text" [(ngModel)]="bookSearch" name="bookSearch" autocomplete="off" (input)="filterBooks()" (focus)="showBookDropdown = true; filterBooks()" (blur)="hideBookDropdown()" [placeholder]="'issueloan.search_book' | translate" class="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm text-slate-900 dark:text-white outline-none transition-all">
          </div>
          <!-- Dropdown -->
          <div *ngIf="showBookDropdown && filteredBooks.length > 0" class="absolute z-10 w-full mt-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-lg max-h-60 overflow-y-auto">
            <div *ngFor="let book of filteredBooks" (mousedown)="selectBook(book)" class="px-4 py-3 hover:bg-indigo-50 dark:hover:bg-slate-700/50 cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-0 flex justify-between items-center transition-colors">
              <div>
                <div class="font-medium text-slate-900 dark:text-white">{{ book.title }}</div>
                <div class="text-xs text-slate-500">ISBN: {{ book.isbn }} | Autor: {{ book.author }}</div>
              </div>
              <span class="text-xs font-bold px-2 py-1 rounded-md" [ngClass]="book.availableCopies > 0 ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'">
                {{ book.availableCopies }} Disp.
              </span>
            </div>
          </div>
          <div *ngIf="selectedBook" class="mt-2 text-sm text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
             <span class="material-symbols-outlined text-[16px]">check_circle</span> Selecionado: {{ selectedBook.title }}
          </div>
        </div>
        
        <div class="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3">
          <button type="button" (click)="resetForm()" class="px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">{{ 'action.cancel' | translate }}</button>
          <button type="submit" [disabled]="!selectedUser || !selectedBook || isLoading" class="disabled:opacity-50 disabled:cursor-not-allowed px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium shadow-sm shadow-indigo-600/20 transition-all flex items-center gap-2">
            <span class="material-symbols-outlined text-[18px]">bookmark_add</span> 
            {{ isLoading ? 'Processando...' : ('issueloan.submit' | translate) }}
          </button>
        </div>
      </form>
    </div>
  `
})
export class IssueLoanComponent implements OnInit {
  private userService = inject(UserService);
  private bookService = inject(BookService);
  private loanService = inject(LoanService);
  private cdr = inject(ChangeDetectorRef);

  allUsers: any[] = [];
  allBooks: any[] = [];

  filteredUsers: any[] = [];
  filteredBooks: any[] = [];

  userSearch = '';
  bookSearch = '';

  selectedUser: any = null;
  selectedBook: any = null;

  showUserDropdown = false;
  showBookDropdown = false;

  isLoading = false;
  message = '';
  isError = false;

  ngOnInit() {
    this.userService.getUsers().subscribe(data => this.allUsers = data);
    this.bookService.getBooks().subscribe(data => this.allBooks = data);
  }

  filterUsers() {
    const term = this.userSearch.toLowerCase();
    if (!term) {
      this.filteredUsers = this.allUsers;
      return;
    }
    this.filteredUsers = this.allUsers.filter(u => 
      u.firstName?.toLowerCase().includes(term) || 
      u.lastName?.toLowerCase().includes(term) ||
      u.email?.toLowerCase().includes(term) ||
      u.taxId?.toLowerCase().includes(term)
    );
  }

  filterBooks() {
    const term = this.bookSearch.toLowerCase();
    if (!term) {
      this.filteredBooks = this.allBooks;
      return;
    }
    this.filteredBooks = this.allBooks.filter(b => 
      b.title?.toLowerCase().includes(term) || 
      b.isbn?.toLowerCase().includes(term)
    );
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.userSearch = user.firstName + ' ' + user.lastName;
    this.showUserDropdown = false;
  }

  selectBook(book: any) {
    this.selectedBook = book;
    this.bookSearch = book.title;
    this.showBookDropdown = false;
  }

  hideUserDropdown() {
    setTimeout(() => this.showUserDropdown = false, 200);
  }

  hideBookDropdown() {
    setTimeout(() => this.showBookDropdown = false, 200);
  }

  resetForm() {
    this.userSearch = '';
    this.bookSearch = '';
    this.selectedUser = null;
    this.selectedBook = null;
    this.message = '';
    this.isError = false;
  }

  submitLoan() {
    if (!this.selectedUser || !this.selectedBook) return;
    
    if (this.selectedBook.availableCopies <= 0) {
      this.message = 'Este livro não possui exemplares disponíveis para empréstimo.';
      this.isError = true;
      return;
    }

    this.isLoading = true;
    this.message = '';
    this.cdr.detectChanges();
    
    try {
      this.loanService.issueLoan(this.selectedUser.id, this.selectedBook.id).subscribe({
        next: (res) => {
          this.isLoading = false;
          this.message = 'Empréstimo registado com sucesso!';
          this.isError = false;
          
          const bookIndex = this.allBooks.findIndex(b => b.id === this.selectedBook.id);
          if (bookIndex > -1) {
            this.allBooks[bookIndex].availableCopies--;
          }
          
          this.cdr.detectChanges();
          setTimeout(() => this.resetForm(), 3000);
        },
        error: (err) => {
          console.error("Erro na requisição:", err);
          this.isLoading = false;
          this.message = 'Erro ao registar empréstimo. Verifique se o servidor está rodando e a consola (F12).';
          this.isError = true;
          this.cdr.detectChanges();
        }
      });
    } catch (e) {
      console.error("Erro síncrono:", e);
      this.isLoading = false;
      this.message = 'Erro interno inesperado.';
      this.isError = true;
      this.cdr.detectChanges();
    }
  }
}
