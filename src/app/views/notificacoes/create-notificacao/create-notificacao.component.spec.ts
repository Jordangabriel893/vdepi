import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNotificacaoComponent } from './create-notificacao.component';

describe('CreateNotificacaoComponent', () => {
  let component: CreateNotificacaoComponent;
  let fixture: ComponentFixture<CreateNotificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNotificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
