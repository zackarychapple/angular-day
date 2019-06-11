import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatFeedComponent } from './cat-feed.component';

describe('CatFeedComponent', () => {
  let component: CatFeedComponent;
  let fixture: ComponentFixture<CatFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
