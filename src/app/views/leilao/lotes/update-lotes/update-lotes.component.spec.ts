import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLotesComponent } from './update-lotes.component';

describe('UpdateLotesComponent', () => {
  let component: UpdateLotesComponent;
  let fixture: ComponentFixture<UpdateLotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
