import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoricoLancesComponent } from './historico-lances.component';

describe('HistoricoLancesComponent', () => {
  let component: HistoricoLancesComponent;
  let fixture: ComponentFixture<HistoricoLancesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistoricoLancesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoricoLancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
