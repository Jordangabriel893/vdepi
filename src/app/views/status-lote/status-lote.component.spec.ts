import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusLoteComponent } from './status-lote.component';

describe('StatusLoteComponent', () => {
  let component: StatusLoteComponent;
  let fixture: ComponentFixture<StatusLoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatusLoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusLoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
