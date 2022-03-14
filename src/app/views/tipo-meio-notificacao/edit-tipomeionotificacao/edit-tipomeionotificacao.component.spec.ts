import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipomeionotificacaoComponent } from './edit-tipomeionotificacao.component';

describe('EditTipomeionotificacaoComponent', () => {
  let component: EditTipomeionotificacaoComponent;
  let fixture: ComponentFixture<EditTipomeionotificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTipomeionotificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTipomeionotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
