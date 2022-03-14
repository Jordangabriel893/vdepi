import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTiponotificacaoComponent } from './edit-tiponotificacao.component';

describe('EditTiponotificacaoComponent', () => {
  let component: EditTiponotificacaoComponent;
  let fixture: ComponentFixture<EditTiponotificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTiponotificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTiponotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
