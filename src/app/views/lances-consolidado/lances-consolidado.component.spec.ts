import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LancesConsolidadoComponent } from './lances-consolidado.component';

describe('LancesConsolidadoComponent', () => {
  let component: LancesConsolidadoComponent;
  let fixture: ComponentFixture<LancesConsolidadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LancesConsolidadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LancesConsolidadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
