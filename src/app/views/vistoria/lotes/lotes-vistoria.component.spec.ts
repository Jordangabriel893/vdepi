import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesVistoriaComponent } from './lotes-vistoria.component';

describe('LotesVistoriaComponent', () => {
  let component: LotesVistoriaComponent;
  let fixture: ComponentFixture<LotesVistoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LotesVistoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LotesVistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
