import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreedGridComponent } from './breed-grid.component';

describe('BreedGridComponent', () => {
  let component: BreedGridComponent;
  let fixture: ComponentFixture<BreedGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreedGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreedGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
