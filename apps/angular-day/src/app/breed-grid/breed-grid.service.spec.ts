import { TestBed } from '@angular/core/testing';

import { BreedGridService } from './breed-grid.service';

describe('BreedGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BreedGridService = TestBed.get(BreedGridService);
    expect(service).toBeTruthy();
  });
});
