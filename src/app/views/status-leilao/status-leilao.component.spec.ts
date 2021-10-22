import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLeilaoComponent } from './status-leilao.component';

describe('StatusLeilaoComponent', () => {
  let component: StatusLeilaoComponent;
  let fixture: ComponentFixture<StatusLeilaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusLeilaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusLeilaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
