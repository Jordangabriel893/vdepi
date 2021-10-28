import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateComitenteComponent } from './update-comitente.component';

describe('UpdateComitenteComponent', () => {
  let component: UpdateComitenteComponent;
  let fixture: ComponentFixture<UpdateComitenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateComitenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComitenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
