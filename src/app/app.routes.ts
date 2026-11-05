import { Routes, UrlMatcher, UrlSegment } from '@angular/router';
import { GuideViewerComponent } from './components/guide-viewer/guide-viewer.component';

export const guideRouteMatcher: UrlMatcher = (segments: UrlSegment[]) => {
  const guidePath = segments.slice(1).map(segment => segment.path).join('/').replace(/\/+$/, '');
  if (segments[0]?.path !== 'guia' || !guidePath) {
    return null;
  }

  return {
    consumed: segments,
    posParams: {
      guidePath: new UrlSegment(guidePath, {})
    }
  };
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: GuideViewerComponent },
  { matcher: guideRouteMatcher, component: GuideViewerComponent },
  { path: '**', component: GuideViewerComponent, data: { notFound: true } }
];
