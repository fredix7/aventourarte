import { environment } from './environment';

describe('environment', () => {
  it('exposes only the Cloudinary cloud name to the frontend', () => {
    expect(environment.cloudinary.cloudName).toBeTruthy();
    expect(Object.keys(environment.cloudinary)).toEqual(['cloudName']);
  });
});
