import { Injectable, signal } from '@angular/core';

export type AppLanguage = 'es' | 'en' | 'fr' | 'pt';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  readonly currentLanguage = signal<AppLanguage>('es');

  setLanguage(language: AppLanguage) {
    this.currentLanguage.set(language);
    document.documentElement.lang = language;
  }
}
