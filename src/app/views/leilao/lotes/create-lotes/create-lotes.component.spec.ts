import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLotesComponent } from './create-lotes.component';

describe('CreateLotesComponent', () => {
  let component: CreateLotesComponent;
  let fixture: ComponentFixture<CreateLotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
