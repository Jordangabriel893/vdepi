import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrematantesComponent } from './arrematantes.component';

describe('ArrematantesComponent', () => {
  let component: ArrematantesComponent;
  let fixture: ComponentFixture<ArrematantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrematantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrematantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
