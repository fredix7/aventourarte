import { Routes, UrlMatcher, UrlSegment } from '@angular/router';
import { GuideViewerComponent } from './components/guide-viewer/guide-viewer.component';

export const guideRouteMatcher: UrlMatcher = (segments: UrlSegment[]) => {
  if (segments.length < 2 || segments[0].path !== 'guia') {
    return null;
  }

  return {
    consumed: segments,
    posParams: {
      guidePath: new UrlSegment(segments.slice(1).map(segment => segment.path).join('/'), {})
    }
  };
};

export const routes: Routes = [
  { path: '', pathMatch: 'full', component: GuideViewerComponent },
  { matcher: guideRouteMatcher, component: GuideViewerComponent }
];
