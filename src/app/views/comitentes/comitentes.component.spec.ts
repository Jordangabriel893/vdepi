import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComitentesComponent } from './comitentes.component';

describe('ComitentesComponent', () => {
  let component: ComitentesComponent;
  let fixture: ComponentFixture<ComitentesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComitentesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComitentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
