import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { InfoGeneralComponent } from '../../info-general.component/info-general.component';

//CADIZ
import { JEREZ_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/jerez.guide';
import { TREBUJENA_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/trebujena.guide';

//SEVILLA
import { MAIRENA_ALJARAFE_GUIDE } from '../../guides/europa/espana/andalucia/sevilla/mairena-aljarafe.guide';

//SUDAMERICA
import { RIO_DE_JANEIRO_GUIDE } from '../../guides/america/sudamerica/brasil/rio-janeiro.guide';

@Component({
  selector: 'app-guide-viewer',
  standalone: true,
  imports: [CommonModule, InfoGeneralComponent, MatExpansionModule, MatIconModule],
  templateUrl: './guide-viewer.component.html',
  styleUrls: ['./guide-viewer.component.scss']
})
export class GuideViewerComponent {
  guide: any = null;
  pageStyle: Record<string, string> = {};
  showScrollTop = false;
  scrollIcon = 'flight';

  @HostListener('window:scroll')
  onScroll() {
    this.showScrollTop = window.scrollY > 350;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private guides: Record<string, any> = {
    'europa/espana/andalucia/cadiz/jerez': JEREZ_GUIDE,
    'europa/espana/andalucia/cadiz/trebujena': TREBUJENA_GUIDE,
    'europa/espana/andalucia/sevilla/mairena-aljarafe': MAIRENA_ALJARAFE_GUIDE,
    'america/sudamerica/brasil/rio-de-janeiro': RIO_DE_JANEIRO_GUIDE
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const placePath = params.get('path');

      if (placePath && this.guides[placePath]) {
        this.guide = this.guides[placePath];
        this.applyGuideStyle(this.guide);
      } else {
        this.guide = null;
        this.pageStyle = {};
      }
    });
  }

  private applyGuideStyle(guide: any) {
    this.pageStyle = {
      '--bg-image': `url(${guide.background})`,
      '--bg-pos': guide.bgPos ?? '50% 50%',
      '--bg-pos-mobile': guide.bgPosMobile ?? guide.bgPos ?? '50% 50%',
      '--bg-brightness': String(guide.bgBrightness ?? 0.9),

      '--flag-image': `url(${guide.flag ?? ''})`,

      '--flag-opacity': String(
        guide.flagOverlay ? (guide.flagOpacity ?? 0.12) : 0
      ),

      '--flag-opacity-mobile': String(
        guide.flagOverlay
          ? (guide.flagOpacityMobile ?? guide.flagOpacity ?? 0.12)
          : 0
      ),

      '--flag-size': guide.flagSize ?? '55%',
      '--flag-size-mobile': guide.flagSizeMobile ?? guide.flagSize ?? '70%',
    };
  }

  /**
   * Agrupa los lugares en días o zonas.
   * Por ahora usa un simple índice: Día 1, Día 2, ...
   */
  groupByDay(lugares: any[]): { dia: string, lugares: any[] }[] {
    const dias: { dia: string, lugares: any[] }[] = [];
    const chunkSize = 3; // cuántos lugares por día aprox
    for (let i = 0; i < lugares.length; i += chunkSize) {
      dias.push({
        dia: `Día ${Math.floor(i / chunkSize) + 1}`,
        lugares: lugares.slice(i, i + chunkSize)
      });
    }
    return dias;
  }
}
