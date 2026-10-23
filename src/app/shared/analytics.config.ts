/** Public integration settings. Never put an API key here. */
export const ANALYTICS_CONFIG = {
  websiteId: 'b31c760b-a0e3-471b-a060-fb041f8e4705',
  endpoint: 'https://gateway.umami.is/api/send',
  allowedHosts: ['fredix7.github.io'] as string[],
  // Provider privacy/DPA reviewed 2026-10-22; the measurement notice ships in the app.
  privacyReviewed: true,
};
