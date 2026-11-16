import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { CdkTrapFocus } from '@angular/cdk/a11y';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TravelNode } from '../data/travel-data';
import { GUIDE_REGISTRY } from '../components/guide-viewer/guide-viewer.component';
import { HeaderSubmenuComponent } from '../header-submenu.component/header-submenu.component';
import { AppLanguage, LanguageService } from '../shared/language.service';
import { AnalyticsService } from '../shared/analytics.service';

interface DestinationSearchResult {
  name: string;
  path: string;
  breadcrumb: string;
  flag?: string;
}

interface HeaderText {
  destinations: string;
  searchPlaceholder: string;
  searchLabel: string;
  searchEmpty: string;
  exploreKicker: string;
  exploreTitle: string;
  languageLabel: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderSubmenuComponent, CdkTrapFocus],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly analytics = inject(AnalyticsService);
  private readonly document = inject(DOCUMENT);
  private readonly navigation = inject(Router).events.subscribe(event => {
    if (event instanceof NavigationEnd) this.closeMenu(false);
  });
  private searchTimer?: ReturnType<typeof setTimeout>;
  private focusTimer?: ReturnType<typeof setTimeout>;
  private compactQuery?: MediaQueryList;
  private releaseBackground?: () => void;
  private readonly onBreakpointChange = (event: MediaQueryListEvent) => {
    const hadNavigationFocus = this.elementRef.nativeElement.querySelector('.main-menu')?.contains(this.document.activeElement);
    this.closeMenu(false);
    this.compact = event.matches;
    if (hadNavigationFocus) {
      this.focusTimer = setTimeout(() => {
        const target = this.compact ? this.menuToggle?.nativeElement : this.elementRef.nativeElement.querySelector<HTMLElement>('.main-menu .menu-btn');
        target?.focus({ preventScroll: true });
      });
    }
  };

  @ViewChild('menuToggle') private menuToggle?: ElementRef<HTMLButtonElement>;
  @ViewChild('menuClose') private menuClose?: ElementRef<HTMLButtonElement>;
  compact = false;

  ngOnInit(): void {
    this.compactQuery = this.document.defaultView?.matchMedia('(max-width: 1100px)');
    this.compact = this.compactQuery?.matches ?? false;
    this.compactQuery?.addEventListener('change', this.onBreakpointChange);
  }

  ngOnDestroy(): void {
    clearTimeout(this.searchTimer);
    clearTimeout(this.focusTimer);
    this.releaseBackground?.();
    this.compactQuery?.removeEventListener('change', this.onBreakpointChange);
    this.navigation.unsubscribe();
  }

  private measureSearch(): void {
    clearTimeout(this.searchTimer);
    this.searchTimer = undefined;
    if (this.hasSearchQuery) this.analytics.action('search', { results: this.searchResults.length ? 'some' : 'none' });
  }
  @Input() treeData: TravelNode[] = [];

  constructor(
    readonly languageService: LanguageService,
    private readonly elementRef: ElementRef<HTMLElement>
  ) {}

  menuOpen = false;
  languageMenuOpen = false;
  searchQuery = '';
  openContinentKey: string | null = null;

  readonly languages: { code: AppLanguage; label: string; flag: string; name: string }[] = [
    { code: 'es', label: 'ES', flag: 'https://flagcdn.com/es.svg', name: 'Español' },
    { code: 'en', label: 'EN', flag: 'https://flagcdn.com/gb.svg', name: 'English' },
    { code: 'fr', label: 'FR', flag: 'https://flagcdn.com/fr.svg', name: 'Français' },
    { code: 'pt', label: 'PT', flag: 'https://flagcdn.com/pt.svg', name: 'Português' },
  ];

  readonly headerTexts: Record<AppLanguage, HeaderText> = {
    es: {
      destinations: 'Destinos',
      searchPlaceholder: 'Buscar destino',
      searchLabel: 'Buscar destinos disponibles',
      searchEmpty: 'No hay destinos con ese nombre',
      exploreKicker: 'Explora AvenTourArte',
      exploreTitle: 'Busca un destino o navega por el menu',
      languageLabel: 'Cambiar idioma',
    },
    en: {
      destinations: 'Destinations',
      searchPlaceholder: 'Search destination',
      searchLabel: 'Search available destinations',
      searchEmpty: 'No destinations found',
      exploreKicker: 'Explore AvenTourArte',
      exploreTitle: 'Search for a destination or browse the menu',
      languageLabel: 'Change language',
    },
    fr: {
      destinations: 'Destinations',
      searchPlaceholder: 'Chercher une destination',
      searchLabel: 'Chercher les destinations disponibles',
      searchEmpty: 'Aucune destination trouvee',
      exploreKicker: 'Explorez AvenTourArte',
      exploreTitle: 'Cherchez une destination ou parcourez le menu',
      languageLabel: 'Changer de langue',
    },
    pt: {
      destinations: 'Destinos',
      searchPlaceholder: 'Procurar destino',
      searchLabel: 'Procurar destinos disponiveis',
      searchEmpty: 'Nenhum destino encontrado',
      exploreKicker: 'Explore AvenTourArte',
      exploreTitle: 'Procure um destino ou navegue pelo menu',
      languageLabel: 'Alterar idioma',
    },
  };

  keyOf(n: TravelNode) {
    return n.path ?? n.nombre;
  }

  toggleContinent(key: string) {
    this.openContinentKey = this.openContinentKey === key ? null : key;
  }

  toggleMenu() {
    if (this.menuOpen) {
      this.closeMenu();
      return;
    }
    this.menuOpen = true;
    this.languageMenuOpen = false;
    this.searchQuery = '';
    if (this.compact) {
      this.lockBackground();
      this.focusTimer = setTimeout(() => this.menuClose?.nativeElement.focus());
    }
  }

  get text(): HeaderText {
    return this.headerTexts[this.languageService.currentLanguage()];
  }

  get closeLabel(): string {
    return { es: 'Cerrar', en: 'Close', fr: 'Fermer', pt: 'Fechar' }[this.languageService.currentLanguage()];
  }

  get searchResults(): DestinationSearchResult[] {
    const query = this.normalize(this.searchQuery);
    if (!query) {
      return [];
    }

    return this.allDestinations
      .filter((destination) =>
        this.normalize(`${destination.name} ${destination.breadcrumb}`).includes(query)
      )
      .slice(0, 7);
  }

  get allDestinations(): DestinationSearchResult[] {
    return this.flattenDestinations(this.treeData)
      .filter(destination => Object.hasOwn(GUIDE_REGISTRY, destination.path));
  }

  get hasSearchQuery(): boolean {
    return Boolean(this.normalize(this.searchQuery));
  }

  get activeLanguage() {
    return this.languages.find((language) => language.code === this.languageService.currentLanguage());
  }

  closeMenu(restoreFocus = true) {
    const wasOpen = this.menuOpen;
    clearTimeout(this.focusTimer);
    if (this.searchTimer !== undefined) this.measureSearch();
    this.menuOpen = false;
    this.openContinentKey = null;
    this.languageMenuOpen = false;
    this.searchQuery = '';
    this.releaseBackground?.();
    this.releaseBackground = undefined;
    if (wasOpen && restoreFocus && this.compact) {
      // Wait until Angular removes inert from the trigger.
      this.focusTimer = setTimeout(() => this.menuToggle?.nativeElement.focus({ preventScroll: true }));
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: Event) {
    if (!this.menuOpen && !this.languageMenuOpen && !this.hasSearchQuery && !this.openContinentKey) return;
    event.preventDefault();
    this.closeMenu();
  }

  private lockBackground(): void {
    const body = this.document.body;
    const view = this.document.defaultView;
    if (!view || this.releaseBackground) return;
    const scrollX = view.scrollX;
    const scrollY = view.scrollY;
    const properties = ['position', 'top', 'left', 'width', 'overflow'] as const;
    const saved = properties.map(name => [name, body.style.getPropertyValue(name), body.style.getPropertyPriority(name)]);
    const siblings = Array.from(this.elementRef.nativeElement.parentElement?.children ?? [])
      .filter((element): element is HTMLElement => element instanceof HTMLElement && element !== this.elementRef.nativeElement);
    const inert = siblings.map(element => [element, element.inert] as const);
    siblings.forEach(element => element.inert = true);
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}px`;
    body.style.left = `-${scrollX}px`;
    body.style.width = '100%';
    body.style.overflow = 'hidden';
    this.releaseBackground = () => {
      saved.forEach(([name, value, priority]) => value ? body.style.setProperty(name, value, priority) : body.style.removeProperty(name));
      inert.forEach(([element, value]) => element.inert = value);
      view.scrollTo({ left: scrollX, top: scrollY, behavior: 'instant' });
    };
  }

  toggleLanguageMenu() {
    this.languageMenuOpen = !this.languageMenuOpen;
  }

  selectLanguage(language: AppLanguage) {
    this.languageService.setLanguage(language);
    this.languageMenuOpen = false;
  }

  onSearchInput(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    clearTimeout(this.searchTimer);
    this.searchTimer = undefined;
    if (this.hasSearchQuery) this.searchTimer = setTimeout(() => this.measureSearch(), 800);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.openContinentKey = null;
      this.searchQuery = '';
    }
    if (!this.languageMenuOpen) {
      return;
    }

    if (!this.elementRef.nativeElement.contains(event.target as Node)) {
      this.languageMenuOpen = false;
    }
  }

  private flattenDestinations(
    nodes: TravelNode[],
    ancestors: string[] = [],
    inheritedFlag?: string
  ): DestinationSearchResult[] {
    const destinations: DestinationSearchResult[] = [];

    for (const node of nodes) {
      const nextAncestors = [...ancestors, node.nombre];
      const flag = node.flag ?? inheritedFlag;

      if (node.path) {
        destinations.push({
          name: node.nombre,
          path: node.path,
          breadcrumb: ancestors.join(' / '),
          flag,
        });
      }

      destinations.push(...this.flattenDestinations(node.hijos ?? [], nextAncestors, flag));
    }

    return destinations;
  }

  private normalize(value: string): string {
    return value
      .toLocaleLowerCase('es')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
