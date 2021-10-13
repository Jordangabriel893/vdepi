import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HabilitacaoComponent } from './habilitacao.component';

describe('HabilitacaoComponent', () => {
  let component: HabilitacaoComponent;
  let fixture: ComponentFixture<HabilitacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HabilitacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HabilitacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
