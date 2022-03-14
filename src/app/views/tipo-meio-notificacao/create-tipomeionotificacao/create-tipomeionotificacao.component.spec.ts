import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTipomeionotificacaoComponent } from './create-tipomeionotificacao.component';

describe('CreateTipomeionotificacaoComponent', () => {
  let component: CreateTipomeionotificacaoComponent;
  let fixture: ComponentFixture<CreateTipomeionotificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTipomeionotificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTipomeionotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
