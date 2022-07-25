import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLeilaoComponent } from './search-leilao.component';

describe('SearchLeilaoComponent', () => {
  let component: SearchLeilaoComponent;
  let fixture: ComponentFixture<SearchLeilaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchLeilaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLeilaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
