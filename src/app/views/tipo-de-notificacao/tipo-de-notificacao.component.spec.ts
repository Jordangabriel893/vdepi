import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoDeNotificacaoComponent } from './tipo-de-notificacao.component';

describe('TipoDeNotificacaoComponent', () => {
  let component: TipoDeNotificacaoComponent;
  let fixture: ComponentFixture<TipoDeNotificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoDeNotificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoDeNotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
