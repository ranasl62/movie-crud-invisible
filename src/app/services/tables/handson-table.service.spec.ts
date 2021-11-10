import { TestBed } from '@angular/core/testing';

import { HansonTableService } from './hanson-table.service';

describe('HandsonTableService', () => {
  let service: HansonTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HansonTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
