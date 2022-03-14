import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoMeioNotificacaoComponent } from './tipo-meio-notificacao.component';

describe('TipoMeioNotificacaoComponent', () => {
  let component: TipoMeioNotificacaoComponent;
  let fixture: ComponentFixture<TipoMeioNotificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoMeioNotificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoMeioNotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
