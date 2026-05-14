import { Component, ElementRef, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TravelNode } from '../data/travel-data';
import { HeaderSubmenuComponent } from '../header-submenu.component/header-submenu.component';
import { AppLanguage, LanguageService } from '../shared/language.service';

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
  imports: [CommonModule, RouterModule, HeaderSubmenuComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
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
    this.menuOpen = !this.menuOpen;
  }

  get text(): HeaderText {
    return this.headerTexts[this.languageService.currentLanguage()];
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
    return this.flattenDestinations(this.treeData);
  }

  get hasSearchQuery(): boolean {
    return Boolean(this.normalize(this.searchQuery));
  }

  get activeLanguage() {
    return this.languages.find((language) => language.code === this.languageService.currentLanguage());
  }

  closeMenu() {
    this.menuOpen = false;
    this.languageMenuOpen = false;
    this.searchQuery = '';
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
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
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
