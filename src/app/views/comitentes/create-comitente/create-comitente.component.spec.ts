import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateComitenteComponent } from './create-comitente.component';

describe('CreateComitenteComponent', () => {
  let component: CreateComitenteComponent;
  let fixture: ComponentFixture<CreateComitenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateComitenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateComitenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
