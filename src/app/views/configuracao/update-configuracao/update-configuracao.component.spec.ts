import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConfiguracaoComponent } from './update-configuracao.component';

describe('UpdateConfiguracaoComponent', () => {
  let component: UpdateConfiguracaoComponent;
  let fixture: ComponentFixture<UpdateConfiguracaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateConfiguracaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateConfiguracaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
