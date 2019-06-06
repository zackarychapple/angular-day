import { TestBed } from '@angular/core/testing';

import { BreedListService } from './breed-list.service';

describe('BreedListService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BreedListService = TestBed.get(BreedListService);
    expect(service).toBeTruthy();
  });
});
