import { AppLanguage, LanguageService } from './language.service';

describe('LanguageService', () => {
  let service: LanguageService;
  let originalDocumentLanguage: string;

  beforeEach(() => {
    originalDocumentLanguage = document.documentElement.lang;
    service = new LanguageService();
  });

  afterEach(() => {
    document.documentElement.lang = originalDocumentLanguage;
  });

  it('starts with Spanish as the active language', () => {
    expect(service.currentLanguage()).toBe('es');
  });

  it('updates both the language signal and the document language', () => {
    const supportedLanguages: AppLanguage[] = ['es', 'en', 'fr', 'pt'];

    for (const language of supportedLanguages) {
      service.setLanguage(language);

      expect(service.currentLanguage()).withContext(`signal for ${language}`).toBe(language);
      expect(document.documentElement.lang)
        .withContext(`document language for ${language}`)
        .toBe(language);
    }
  });
});
