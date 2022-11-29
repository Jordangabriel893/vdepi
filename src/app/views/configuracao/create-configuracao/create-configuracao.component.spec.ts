import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConfiguracaoComponent } from './create-configuracao.component';

describe('CreateConfiguracaoComponent', () => {
  let component: CreateConfiguracaoComponent;
  let fixture: ComponentFixture<CreateConfiguracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateConfiguracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateConfiguracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
