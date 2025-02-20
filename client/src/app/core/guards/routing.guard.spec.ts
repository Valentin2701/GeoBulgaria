import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { routingGuard } from './routing.guard';

describe('routingGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => routingGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
