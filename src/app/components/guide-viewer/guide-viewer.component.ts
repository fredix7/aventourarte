import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';
import { InfoGeneralComponent } from '../../info-general.component/info-general.component';
import { ImageService } from '../../shared/image.service';
import { ImgUrlPipe } from '../../shared/img-url.pipe';

import { SAN_FERNANDO_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/san-fernando.guide';
import { JEREZ_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/jerez.guide';
import { TREBUJENA_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/trebujena.guide';
import { MAIRENA_ALJARAFE_GUIDE } from '../../guides/europa/espana/andalucia/sevilla/mairena-aljarafe.guide';
import { ROMA_VATICANO_GUIDE } from '../../guides/europa/italia/roma-vaticano.guide';
import { BUCAREST_GUIDE } from '../../guides/europa/rumania/bucarest.guide';
import { RIO_DE_JANEIRO_GUIDE } from '../../guides/america/sudamerica/brasil/rio-janeiro.guide';
import { NEW_YORK_GUIDE } from '../../guides/america/norteamerica/usa/new-york.guide';

@Component({
  selector: 'app-guide-viewer',
  standalone: true,
  imports: [CommonModule, InfoGeneralComponent, MatExpansionModule, MatIconModule, ImgUrlPipe],
  templateUrl: './guide-viewer.component.html',
  styleUrls: ['./guide-viewer.component.scss']
})
export class GuideViewerComponent {
  guide: any = null;
  pageStyle: Record<string, string> = {};
  requestedGuidePath: string | null = null;
  showScrollTop = false;

  private guides: Record<string, any> = {
    'europa/espana/andalucia/cadiz/san-fernando': SAN_FERNANDO_GUIDE,
    'europa/espana/andalucia/cadiz/jerez-de-la-frontera': JEREZ_GUIDE,
    'europa/espana/andalucia/cadiz/trebujena': TREBUJENA_GUIDE,
    'europa/espana/andalucia/sevilla/mairena-del-aljarafe': MAIRENA_ALJARAFE_GUIDE,
    'europa/italia/roma-vaticano': ROMA_VATICANO_GUIDE,
    'europa/rumania/bucarest': BUCAREST_GUIDE,
    'america/norteamerica/estados-unidos/nueva-york': NEW_YORK_GUIDE,
    'america/sudamerica/brasil/rio-de-janeiro': RIO_DE_JANEIRO_GUIDE
  };

  constructor(private route: ActivatedRoute, private router: Router, private img: ImageService) {}

  ngOnInit() {
    this.loadGuideFromUrl();
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => this.loadGuideFromUrl());
  }

  @HostListener('window:scroll')
  onScroll() {
    this.showScrollTop = (window.scrollY || 0) > 350;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  hasDetails(item: any): boolean {
    return Boolean(item.acceso || item.fecha || item.horario || item.precio || item.precioOrientativo);
  }

  guideLocationLabel(): string {
    if (!this.guide?.path) return 'Guía AvenTourArte';

    const segments = this.guide.path.split('/').slice(0, -1);
    const visibleSegments = segments.filter((segment: string) => !['europa', 'america', 'norteamerica', 'sudamerica'].includes(segment));
    const locationSegments = visibleSegments.map((segment: string) => this.formatLocationSegment(segment));

    return locationSegments.reverse().join(', ') || 'Guía AvenTourArte';
  }

  sectionIcon(title: string): string {
    const normalizedTitle = title
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();

    if (normalizedTitle.includes('historia')) return 'history_edu';
    if (normalizedTitle.includes('geografia') || normalizedTitle.includes('clima')) return 'terrain';
    if (normalizedTitle.includes('visitar') || normalizedTitle.includes('ruta')) return 'explore';
    if (normalizedTitle.includes('gastronomia') || normalizedTitle.includes('comer')) return 'restaurant';
    if (normalizedTitle.includes('cultura') || normalizedTitle.includes('vida')) return 'groups';
    if (normalizedTitle.includes('fiesta') || normalizedTitle.includes('festivo')) return 'celebration';
    if (normalizedTitle.includes('consejo')) return 'route';

    return 'travel_explore';
  }

  private formatLocationSegment(segment: string): string {
    const locationNames: Record<string, string> = {
      espana: 'España',
      cadiz: 'Cádiz',
      andalucia: 'Andalucía',
      sevilla: 'Sevilla',
      italia: 'Italia',
      rumania: 'Rumanía',
      brasil: 'Brasil',
      usa: 'Estados Unidos'
    };

    return locationNames[segment] ?? segment
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');
  }

  private loadGuideFromUrl() {
    const routePath = this.route.snapshot.paramMap.get('guidePath');
    const cleanUrl = this.router.url.split('?')[0].split('#')[0];
    const placePath = routePath ?? decodeURIComponent(cleanUrl.replace(/^\/guia\/?/, '')).replace(/^\/+/, '');

    if (placePath && this.guides[placePath]) {
      this.guide = this.guides[placePath];
      this.requestedGuidePath = null;
      this.applyGuideStyle(this.guide);
      return;
    }

    this.guide = null;
    this.requestedGuidePath = placePath || null;
    this.pageStyle = {};
  }

  private applyGuideStyle(guide: any) {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    this.pageStyle = {
      '--bg-image': `url(${this.img.background(guide.background, isMobile)})`,
      '--bg-pos': guide.bgPos ?? '50% 50%',
      '--bg-pos-mobile': guide.bgPosMobile ?? guide.bgPos ?? '50% 50%',
      '--bg-dim': String(guide.bgDim ?? 0.10),
      '--bg-size': guide.bgSize ?? 'cover',
      '--bg-size-mobile': guide.bgSizeMobile ?? guide.bgSize ?? 'cover',
      '--flag-image': `url(${this.img.url(guide.flag, { w: 1400, crop: 'fit' })})`,
      '--flag-opacity': String(guide.flagOverlay ? (guide.flagOpacity ?? 0.18) : 0),
      '--flag-opacity-mobile': String(guide.flagOverlay ? (guide.flagOpacityMobile ?? 0.22) : 0),
      '--flag-size': guide.flagSize ?? '75%',
      '--flag-size-mobile': guide.flagSizeMobile ?? '95%',
    };
  }

  groupByDay(lugares: any[]): { dia: string, lugares: any[] }[] {
    const dias: { dia: string, lugares: any[] }[] = [];
    const chunkSize = 3;

    for (let i = 0; i < lugares.length; i += chunkSize) {
      dias.push({
        dia: `Día ${Math.floor(i / chunkSize) + 1}`,
        lugares: lugares.slice(i, i + chunkSize)
      });
    }

    return dias;
  }
}
