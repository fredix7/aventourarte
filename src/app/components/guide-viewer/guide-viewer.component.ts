import { Component, HostListener, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';
import { InfoGeneralComponent } from '../../info-general.component/info-general.component';
import { ImageService } from '../../shared/image.service';
import { ImgUrlPipe } from '../../shared/img-url.pipe';

import { CADIZ_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/cadiz.guide';
import { JEREZ_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/jerez.guide';
import { ROTA_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/rota.guide';
import { SAN_FERNANDO_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/san-fernando.guide';
import { SANLUCAR_BARRAMEDA_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/sanlucar-barrameda.guide';
import { TREBUJENA_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/trebujena.guide';
import { VEJER_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/vejer.guide';

import { MAIRENA_ALJARAFE_GUIDE } from '../../guides/europa/espana/andalucia/sevilla/mairena-aljarafe.guide';
import { LA_VALETA_GUIDE } from '../../guides/europa/malta/la-valeta.guide';
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
export class GuideViewerComponent implements OnDestroy {
  guide: any = null;
  pageStyle: Record<string, string> = {};
  requestedGuidePath: string | null = null;
  showScrollTop = false;
  activeTabId = '';
  tabs: { id: string; label: string; icon: string; sections: any[] }[] = [];
  expandedPhoto: { src: string; alt: string; gallery: string[]; index: number } | null = null;
  zoomLevel = 1;
  panX = 0;
  panY = 0;
  isPanning = false;

  private activePointers = new Map<number, { x: number; y: number }>();
  private dragStart: { x: number; y: number; panX: number; panY: number } | null = null;
  private pinchStartDistance = 0;
  private pinchStartZoom = 1;
  private pointerMoved = false;

  private guides: Record<string, any> = {
    'europa/espana/andalucia/cadiz/cadiz': CADIZ_GUIDE,
    'europa/espana/andalucia/cadiz/jerez-de-la-frontera': JEREZ_GUIDE,
    'europa/espana/andalucia/cadiz/rota': ROTA_GUIDE,
    'europa/espana/andalucia/cadiz/san-fernando': SAN_FERNANDO_GUIDE,
    'europa/espana/andalucia/cadiz/sanlucar-de-barrameda': SANLUCAR_BARRAMEDA_GUIDE,
    'europa/espana/andalucia/cadiz/trebujena': TREBUJENA_GUIDE,
    'europa/espana/andalucia/cadiz/vejer-de-la-frontera': VEJER_GUIDE,
    
    'europa/espana/andalucia/sevilla/mairena-del-aljarafe': MAIRENA_ALJARAFE_GUIDE,
    'europa/italia/roma-vaticano': ROMA_VATICANO_GUIDE,
    'europa/malta/la-valeta': LA_VALETA_GUIDE,
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

  ngOnDestroy() {
    document.body.style.overflow = '';
  }

  @HostListener('window:scroll')
  onScroll() {
    this.showScrollTop = (window.scrollY || 0) > 350;
  }

  @HostListener('document:keydown', ['$event'])
  handlePhotoKeys(event: KeyboardEvent) {
    if (!this.expandedPhoto) return;

    if (event.key === 'Escape') this.closePhoto();
    if (event.key === 'ArrowLeft') this.previousPhoto();
    if (event.key === 'ArrowRight') this.nextPhoto();
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  hasDetails(item: any): boolean {
    return Boolean(item.acceso || item.fecha || item.horario || item.precio || item.precioOrientativo);
  }

  buildGuideTabs(): { id: string; label: string; icon: string; sections: any[] }[] {
    if (!this.guide?.secciones?.length) return [];

    const isSpainGuide = this.guide.path?.includes('/espana/');
    const tabDefinitions = [
      {
        id: 'historia',
        label: 'Historia',
        icon: 'history_edu',
        match: (title: string) => title.includes('historia')
      },
      {
        id: 'geografia-clima',
        label: 'Geografía y clima',
        icon: 'terrain',
        match: (title: string) => title.includes('geografia') || title.includes('clima')
      },
      {
        id: 'que-ver',
        label: 'Qué ver',
        icon: 'explore',
        match: (title: string) =>
          title.includes('visitar') ||
          title.includes('ruta') ||
          title.includes('itinerario') ||
          title.includes('consejo de ruta')
      },
      {
        id: 'gastronomia',
        label: 'Gastronomía',
        icon: 'restaurant_menu',
        match: (title: string) => title.includes('gastronomia')
      },
      {
        id: 'donde-comer',
        label: 'Dónde comer',
        icon: 'restaurant',
        match: (title: string) => title.includes('donde comer')
      },
      {
        id: 'cultura',
        label: 'Cultura y vida local',
        icon: 'groups',
        match: (title: string) =>
          title.includes('cultura') || title.includes('vida local') || title.includes('tradiciones')
      },
      {
        id: 'fiestas',
        label: 'Fiestas y festivos',
        icon: 'celebration',
        match: (title: string) =>
          isSpainGuide && (title.includes('fiesta') || title.includes('festivo'))
      },
      {
        id: 'consejos',
        label: 'Consejos prácticos',
        icon: 'tips_and_updates',
        match: (title: string) =>
          !isSpainGuide && (title.includes('consejo') || title.includes('practico'))
      }
    ];

    const assignedSections = new Set<any>();
    const tabs = tabDefinitions
      .map(tab => {
        const sections = this.guide.secciones.filter((section: any) => {
          const normalizedTitle = this.normalizeTitle(section.titulo);
          const matches = tab.match(normalizedTitle);
          if (matches) assignedSections.add(section);
          return matches;
        });

        return { id: tab.id, label: tab.label, icon: tab.icon, sections };
      })
      .filter(tab => tab.sections.length);

    const uncategorizedSections = this.guide.secciones.filter((section: any) => !assignedSections.has(section));
    if (uncategorizedSections.length) {
      tabs.push({
        id: 'mas-info',
        label: 'Más info',
        icon: 'travel_explore',
        sections: uncategorizedSections
      });
    }

    if (!tabs.some(tab => tab.id === this.activeTabId)) {
      this.activeTabId = tabs[0]?.id ?? '';
    }

    return tabs;
  }

  setActiveTab(tabId: string) {
    this.activeTabId = tabId;
  }

  openPhoto(src: string, alt: string, gallery: string[] = [src]) {
    const cleanGallery = this.uniquePhotos(gallery.length ? gallery : [src]);
    const index = Math.max(cleanGallery.indexOf(src), 0);

    this.expandedPhoto = { src, alt, gallery: cleanGallery, index };
    this.resetPhotoTransform();
    document.body.style.overflow = 'hidden';
  }

  closePhoto() {
    this.expandedPhoto = null;
    this.resetPhotoTransform();
    document.body.style.overflow = '';
  }

  closePhotoFromBackdrop(event: Event) {
    if (event.target === event.currentTarget && !this.pointerMoved) {
      this.closePhoto();
    }
  }

  nextPhoto() {
    if (!this.expandedPhoto || this.expandedPhoto.gallery.length < 2) return;
    this.showGalleryPhoto(this.expandedPhoto.index + 1);
  }

  previousPhoto() {
    if (!this.expandedPhoto || this.expandedPhoto.gallery.length < 2) return;
    this.showGalleryPhoto(this.expandedPhoto.index - 1);
  }

  zoomIn() {
    this.setZoom(this.zoomLevel + 0.25);
  }

  zoomOut() {
    this.setZoom(this.zoomLevel - 0.25);
  }

  resetZoom() {
    this.resetPhotoTransform();
  }

  zoomPhotoWheel(event: WheelEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.setZoom(this.zoomLevel + (event.deltaY < 0 ? 0.18 : -0.18));
  }

  startLightboxPointer(event: PointerEvent) {
    event.preventDefault();
    event.stopPropagation();

    this.activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    (event.currentTarget as HTMLElement).setPointerCapture?.(event.pointerId);
    this.pointerMoved = false;

    if (this.activePointers.size === 1) {
      this.isPanning = this.zoomLevel > 1;
      this.dragStart = { x: event.clientX, y: event.clientY, panX: this.panX, panY: this.panY };
    }

    if (this.activePointers.size === 2) {
      this.isPanning = false;
      this.dragStart = null;
      this.pinchStartDistance = this.pointerDistance();
      this.pinchStartZoom = this.zoomLevel;
    }
  }

  moveLightboxPointer(event: PointerEvent) {
    if (!this.activePointers.has(event.pointerId)) return;

    event.preventDefault();
    event.stopPropagation();
    this.activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (this.activePointers.size === 2 && this.pinchStartDistance > 0) {
      this.pointerMoved = true;
      this.setZoom(this.pinchStartZoom * (this.pointerDistance() / this.pinchStartDistance));
      return;
    }

    if (!this.dragStart || this.zoomLevel <= 1) return;

    this.isPanning = true;
    this.pointerMoved = true;
    this.panX = this.dragStart.panX + event.clientX - this.dragStart.x;
    this.panY = this.dragStart.panY + event.clientY - this.dragStart.y;
  }

  endLightboxPointer(event: PointerEvent) {
    event.stopPropagation();
    this.activePointers.delete(event.pointerId);
    this.isPanning = false;
    this.pinchStartDistance = 0;

    const remainingPointer = [...this.activePointers.values()][0];
    this.dragStart = remainingPointer
      ? { x: remainingPointer.x, y: remainingPointer.y, panX: this.panX, panY: this.panY }
      : null;

    window.setTimeout(() => {
      this.pointerMoved = false;
    });
  }

  galleryFor(primary?: string, photos?: string[]): string[] {
    return this.uniquePhotos([primary, ...(photos ?? [])].filter(Boolean) as string[]);
  }

  photoFrameBg(src: string): string {
    return `url(${this.img.url(src, { w: 900, crop: 'fill' })})`;
  }

  lightboxImageStyle(): Record<string, string> {
    return {
      transform: `translate(${this.panX}px, ${this.panY}px) scale(${this.zoomLevel})`
    };
  }

  guideLocationLabel(): string {
    if (!this.guide?.path) return 'Guía AvenTourArte';

    const segments = this.guide.path.split('/').slice(0, -1);
    const visibleSegments = segments.filter((segment: string) => !['europa', 'america', 'norteamerica', 'sudamerica'].includes(segment));
    const locationSegments = visibleSegments.map((segment: string) => this.formatLocationSegment(segment));

    return locationSegments.reverse().join(', ') || 'Guía AvenTourArte';
  }

  sectionIcon(title: string): string {
    const normalizedTitle = this.normalizeTitle(title);

    if (normalizedTitle.includes('historia')) return 'history_edu';
    if (normalizedTitle.includes('geografia') || normalizedTitle.includes('clima')) return 'terrain';
    if (normalizedTitle.includes('visitar') || normalizedTitle.includes('ruta')) return 'explore';
    if (normalizedTitle.includes('gastronomia') || normalizedTitle.includes('comer')) return 'restaurant';
    if (normalizedTitle.includes('cultura') || normalizedTitle.includes('vida')) return 'groups';
    if (normalizedTitle.includes('fiesta') || normalizedTitle.includes('festivo')) return 'celebration';
    if (normalizedTitle.includes('consejo')) return 'route';

    return 'travel_explore';
  }

  trackByTabId(_: number, tab: { id: string }): string {
    return tab.id;
  }

  trackBySectionTitle(_: number, section: any): string {
    return section.titulo;
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
      this.closePhoto();
      this.guide = this.guides[placePath];
      this.requestedGuidePath = null;
      this.activeTabId = '';
      this.applyGuideStyle(this.guide);
      this.tabs = this.buildGuideTabs();
      return;
    }

    this.guide = null;
    this.closePhoto();
    this.requestedGuidePath = placePath || null;
    this.pageStyle = {};
    this.activeTabId = '';
    this.tabs = [];
  }

  private normalizeTitle(title: string): string {
    return (title || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  }

  private showGalleryPhoto(index: number) {
    if (!this.expandedPhoto) return;

    const gallery = this.expandedPhoto.gallery;
    const nextIndex = (index + gallery.length) % gallery.length;
    this.expandedPhoto = {
      ...this.expandedPhoto,
      src: gallery[nextIndex],
      index: nextIndex
    };
    this.resetPhotoTransform();
  }

  private uniquePhotos(photos: string[]): string[] {
    return [...new Set(photos.filter(Boolean))];
  }

  private setZoom(value: number) {
    this.zoomLevel = Math.min(Math.max(value, 0.5), 4);

    if (this.zoomLevel <= 1) {
      this.panX = 0;
      this.panY = 0;
    }
  }

  private resetPhotoTransform() {
    this.zoomLevel = 1;
    this.panX = 0;
    this.panY = 0;
    this.isPanning = false;
    this.pointerMoved = false;
    this.activePointers.clear();
    this.dragStart = null;
    this.pinchStartDistance = 0;
  }

  private pointerDistance(): number {
    const pointers = [...this.activePointers.values()];
    if (pointers.length < 2) return 0;

    return Math.hypot(pointers[0].x - pointers[1].x, pointers[0].y - pointers[1].y);
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
