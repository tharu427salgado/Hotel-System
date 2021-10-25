import { TestBed } from '@angular/core/testing';

import { RestInterceptor } from './rest.interceptor';

describe('RestInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      RestInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: RestInterceptor = TestBed.inject(RestInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
