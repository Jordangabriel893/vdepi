import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssinaturaComponent } from './assinatura.component';

describe('AssinaturaComponent', () => {
  let component: AssinaturaComponent;
  let fixture: ComponentFixture<AssinaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssinaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssinaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
