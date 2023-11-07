import { TestBed } from '@angular/core/testing';

import { MonGuard } from './mon.guard';

describe('MonGuard', () => {
  let guard: MonGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MonGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
