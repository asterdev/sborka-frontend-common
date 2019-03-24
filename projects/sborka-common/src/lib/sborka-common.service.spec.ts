import { TestBed } from '@angular/core/testing';

import { SborkaCommonService } from './sborka-common.service';

describe('SborkaCommonService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SborkaCommonService = TestBed.get(SborkaCommonService);
    expect(service).toBeTruthy();
  });
});
