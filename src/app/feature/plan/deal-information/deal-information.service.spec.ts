import { TestBed } from '@angular/core/testing';

import { DealInformationService } from './deal-information.service';

describe('DealInformationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DealInformationService = TestBed.get(DealInformationService);
    expect(service).toBeTruthy();
  });
});
