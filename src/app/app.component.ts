import { Component, inject } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { TranslationService, Language } from './services/translation.service';
import { TranslatePipe } from './pipes/translate.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, CommonModule, TranslatePipe],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'smart-library-web';
  currentUrl: string = '';
  isDarkMode = false;
  translationService = inject(TranslationService);

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.urlAfterRedirects;
      }
    });
    
    // Auto-detect system preference or previous setting (opcional, setamos default para false)
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      this.isDarkMode = true;
      document.documentElement.classList.add('dark');
    }
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }

  toggleLanguage() {
    const nextLang: Language = this.translationService.currentLang() === 'pt' ? 'en' : 'pt';
    this.translationService.setLanguage(nextLang);
  }

  isPublicRoute(): boolean {
    return this.currentUrl === '/' || this.currentUrl.startsWith('/login');
  }
}
