import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNotificacaoComponent } from './edit-notificacao.component';

describe('EditNotificacaoComponent', () => {
  let component: EditNotificacaoComponent;
  let fixture: ComponentFixture<EditNotificacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditNotificacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditNotificacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
