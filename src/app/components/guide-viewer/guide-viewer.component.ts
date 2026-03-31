import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { InfoGeneralComponent } from '../../info-general.component/info-general.component';
import { ImageService } from '../../shared/image.service';
import { ImgUrlPipe } from "../../shared/img-url.pipe";

//////////////////////////////////////EUROPA
////////////////////ESPAÑA
//////////ANDALUCIA
//CADIZ
import { JEREZ_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/jerez.guide';
import { TREBUJENA_GUIDE } from '../../guides/europa/espana/andalucia/cadiz/trebujena.guide';

//SEVILLA
import { MAIRENA_ALJARAFE_GUIDE } from '../../guides/europa/espana/andalucia/sevilla/mairena-aljarafe.guide';

////////////////////ITALIA
import { ROMA_VATICANO_GUIDE } from '../../guides/europa/italia/roma-vaticano.guide';

////////////////////RUMANIA
import { BUCAREST_GUIDE } from '../../guides/europa/rumania/bucarest.guide';

///////////////////////////////////////AMERICA
//SUDAMERICA
import { RIO_DE_JANEIRO_GUIDE } from '../../guides/america/sudamerica/brasil/rio-janeiro.guide';


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
  showScrollTop = false;
  scrollIcon = 'flight';

  @HostListener('window:scroll')
  onScroll() {
    this.showScrollTop = (window.scrollY || 0) > 350;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private guides: Record<string, any> = {
    'europa/espana/andalucia/cadiz/jerez-de-la-frontera': JEREZ_GUIDE,
    'europa/espana/andalucia/cadiz/trebujena': TREBUJENA_GUIDE,
    'europa/espana/andalucia/sevilla/mairena-del-aljarafe': MAIRENA_ALJARAFE_GUIDE,
    'europa/italia/roma-vaticano': ROMA_VATICANO_GUIDE, 
    'europa/rumania/bucarest': BUCAREST_GUIDE,
    'america/sudamerica/brasil/rio-de-janeiro': RIO_DE_JANEIRO_GUIDE
  };

  constructor(private route: ActivatedRoute, private img: ImageService) {}

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

  /**
   * Agrupa los lugares en días o zonas.
   */
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
