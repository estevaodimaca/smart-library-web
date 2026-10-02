import { Injectable, signal } from '@angular/core';

export type Language = 'pt' | 'en';

export const TRANSLATIONS = {
  pt: {
    'general': 'Geral',
    'search.placeholder': 'Buscar livros, usuários, empréstimos...',
    'theme.toggle': 'Mudar Tema',
    'lang.toggle': 'Mudar Idioma',
    
    // Sidebar static
    'sidebar.admin': 'Admin System',
    'sidebar.superuser': 'Super Usuário',
    'sidebar.logout': 'Encerrar Sessão',
    
    // Transactions from DB (or Hardcoded)
    'Dashboard': 'Visão Geral',
    'Loan Management': 'Gestão de Empréstimos',
    'My Loans': 'Meus Empréstimos',
    'Issue Loan': 'Novo Empréstimo',
    'Books': 'Livros',
    
    // Dashboard Stats
    'dash.total_books': 'Livros Cadastrados',
    'dash.active_loans': 'Empréstimos Ativos',
    'dash.late_returns': 'Devoluções Atrasadas',
    'dash.active_users': 'Usuários Ativos',
    'dash.last_loans': 'Últimos Empréstimos',
    'dash.see_all': 'Ver Todos',
    
    // Table Headers
    'table.user': 'Usuário',
    'table.book': 'Livro',
    'table.checkout_date': 'Data Checkout',
    'table.status': 'Status',
    'status.active': 'Ativo',
    'status.late': 'Atrasado',
    
    // Actions
    'action.download_report': 'Relatório',
    'action.cancel': 'Cancelar',
    
    // My Loans
    'myloans.title': 'Meus Empréstimos',
    'myloans.subtitle': 'Acompanhe os livros que você pegou emprestado.',
    'myloans.empty_title': 'Nenhum empréstimo ativo',
    'myloans.empty_desc': 'Você não tem nenhum livro pendente para devolução no momento. Que tal explorar o catálogo?',
    'myloans.explore': 'Explorar Livros',
    
    // Issue Loan
    'issueloan.title': 'Novo Empréstimo',
    'issueloan.subtitle': 'Registre a saída de um livro do acervo.',
    'issueloan.user': 'Usuário (Leitor)',
    'issueloan.search_user': 'Buscar por Nome, NUIT ou Email...',
    'issueloan.book': 'Livro',
    'issueloan.search_book': 'Buscar por Título ou ISBN...',
    'issueloan.submit': 'Emitir Empréstimo'
  },
  en: {
    'general': 'General',
    'search.placeholder': 'Search books, users, loans...',
    'theme.toggle': 'Toggle Theme',
    'lang.toggle': 'Change Language',
    
    // Sidebar static
    'sidebar.admin': 'Admin System',
    'sidebar.superuser': 'Super User',
    'sidebar.logout': 'Logout',
    
    // Transactions from DB (or Hardcoded)
    'Dashboard': 'Overview',
    'Loan Management': 'Loan Management',
    'My Loans': 'My Loans',
    'Issue Loan': 'Issue Loan',
    'Books': 'Books',
    
    // Dashboard Stats
    'dash.total_books': 'Total Books',
    'dash.active_loans': 'Active Loans',
    'dash.late_returns': 'Late Returns',
    'dash.active_users': 'Active Users',
    'dash.last_loans': 'Latest Loans',
    'dash.see_all': 'See All',
    
    // Table Headers
    'table.user': 'User',
    'table.book': 'Book',
    'table.checkout_date': 'Checkout Date',
    'table.status': 'Status',
    'status.active': 'Active',
    'status.late': 'Late',
    
    // Actions
    'action.download_report': 'Report',
    'action.cancel': 'Cancel',
    
    // My Loans
    'myloans.title': 'My Loans',
    'myloans.subtitle': 'Track the books you have borrowed.',
    'myloans.empty_title': 'No active loans',
    'myloans.empty_desc': 'You have no books pending return at the moment. How about exploring the catalog?',
    'myloans.explore': 'Explore Books',
    
    // Issue Loan
    'issueloan.title': 'Issue New Loan',
    'issueloan.subtitle': 'Register the checkout of a book from the collection.',
    'issueloan.user': 'User (Reader)',
    'issueloan.search_user': 'Search by Name, NUIT or Email...',
    'issueloan.book': 'Book',
    'issueloan.search_book': 'Search by Title or ISBN...',
    'issueloan.submit': 'Issue Loan'
  }
};

@Injectable({ providedIn: 'root' })
export class TranslationService {
  currentLang = signal<Language>('pt');

  constructor() {
    const saved = localStorage.getItem('lang') as Language;
    if (saved && (saved === 'pt' || saved === 'en')) {
      this.currentLang.set(saved);
    }
  }

  setLanguage(lang: Language) {
    this.currentLang.set(lang);
    localStorage.setItem('lang', lang);
  }

  translate(key: string): string {
    const lang = this.currentLang();
    const dictionary = TRANSLATIONS[lang] as any;
    return dictionary[key] || key;
  }
}
