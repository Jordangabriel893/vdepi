import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmacologiaComponent } from './farmacologia.component';

describe('FarmacologiaComponent', () => {
  let component: FarmacologiaComponent;
  let fixture: ComponentFixture<FarmacologiaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmacologiaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmacologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
