import { Route, UrlSegment, UrlSegmentGroup } from '@angular/router';

import { guideRouteMatcher } from './app.routes';

describe('guideRouteMatcher', () => {
  const match = (segments: UrlSegment[]) =>
    guideRouteMatcher(segments, new UrlSegmentGroup(segments, {}), {} as Route);

  it('matches a guide URL and exposes the complete guide path', () => {
    const segments = [
      new UrlSegment('guia', {}),
      new UrlSegment('europa', {}),
      new UrlSegment('espana', {}),
      new UrlSegment('chipiona', {}),
    ];

    const result = match(segments);

    expect(result).not.toBeNull();
    expect(result?.consumed).toEqual(segments);
    expect(result?.posParams?.['guidePath'].path).toBe('europa/espana/chipiona');
  });

  it('rejects URLs that do not start with the guide prefix', () => {
    const segments = [new UrlSegment('destinos', {}), new UrlSegment('chipiona', {})];

    expect(match(segments)).toBeNull();
  });

  it('rejects the guide prefix when no destination path follows it', () => {
    expect(match([new UrlSegment('guia', {})])).toBeNull();
  });
});
