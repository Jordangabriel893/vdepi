import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTiponotificacaoComponent } from './create-tiponotificacao.component';

describe('CreateTiponotificacaoComponent', () => {
  let component: CreateTiponotificacaoComponent;
  let fixture: ComponentFixture<CreateTiponotificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTiponotificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTiponotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
