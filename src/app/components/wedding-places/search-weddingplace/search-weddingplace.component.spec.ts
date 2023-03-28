import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWeddingplaceComponent } from './search-weddingplace.component';

describe('SearchWeddingplaceComponent', () => {
  let component: SearchWeddingplaceComponent;
  let fixture: ComponentFixture<SearchWeddingplaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchWeddingplaceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchWeddingplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
