import { frontendHttps } from './frontend-https';

describe('frontendHttps', () => {
  it('should work', () => {
    expect(frontendHttps()).toEqual('frontend-https');
  });
});
