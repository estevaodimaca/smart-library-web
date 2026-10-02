import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  template: `
    <div>
      <div class="mb-8 flex justify-between items-end">
        <div>
          <h1 class="text-3xl font-bold text-slate-900 dark:text-white tracking-tight font-outfit">{{ 'Dashboard' | translate }}</h1>
          <p class="text-slate-500 dark:text-slate-400 mt-1 text-sm">Resumo estatístico da sua biblioteca hoje.</p>
        </div>
        <button class="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium shadow-sm hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors">
           <span class="material-symbols-outlined text-[18px]">download</span> {{ 'action.download_report' | translate }}
        </button>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm transition-colors duration-300">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <span class="material-symbols-outlined">menu_book</span>
            </div>
            <span class="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded-full">+12%</span>
          </div>
          <div class="text-3xl font-extrabold text-slate-900 dark:text-white">4,209</div>
          <div class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Livros Cadastrados</div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm transition-colors duration-300">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 rounded-full bg-fuchsia-50 dark:bg-fuchsia-900/30 flex items-center justify-center text-fuchsia-600 dark:text-fuchsia-400">
              <span class="material-symbols-outlined">swap_horiz</span>
            </div>
            <span class="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-2 py-1 rounded-full">+5%</span>
          </div>
          <div class="text-3xl font-extrabold text-slate-900 dark:text-white">124</div>
          <div class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Empréstimos Ativos</div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm transition-colors duration-300">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 rounded-full bg-rose-50 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400">
              <span class="material-symbols-outlined">warning</span>
            </div>
            <span class="bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400 text-xs font-bold px-2 py-1 rounded-full">+2%</span>
          </div>
          <div class="text-3xl font-extrabold text-slate-900 dark:text-white">18</div>
          <div class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Devoluções Atrasadas</div>
        </div>

        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm transition-colors duration-300">
          <div class="flex justify-between items-start mb-4">
            <div class="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <span class="material-symbols-outlined">group</span>
            </div>
          </div>
          <div class="text-3xl font-extrabold text-slate-900 dark:text-white">892</div>
          <div class="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Usuários Ativos</div>
        </div>
      </div>

      <!-- Content Area -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden transition-colors duration-300">
        <div class="px-6 py-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-800/50">
          <h3 class="font-semibold text-slate-800 dark:text-slate-200">Últimos Empréstimos</h3>
          <a href="#" class="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">Ver Todos</a>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr>
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">Usuário</th>
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">Livro</th>
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">Data Checkout</th>
                <th class="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-700">Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 dark:divide-slate-700">
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-slate-900 dark:text-white">Estêvão Dimaca</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">estevao@dimasoft.com</div>
                </td>
                <td class="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 font-medium">Domain-Driven Design</td>
                <td class="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">26 Set, 2026</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-300">
                    Ativo
                  </span>
                </td>
              </tr>
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-slate-900 dark:text-white">Maria Silva</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400">maria@exemplo.com</div>
                </td>
                <td class="px-6 py-4 text-sm text-slate-700 dark:text-slate-300 font-medium">Clean Code</td>
                <td class="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">15 Set, 2026</td>
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-300">
                    Atrasado
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
})
export class DashboardComponent {}
