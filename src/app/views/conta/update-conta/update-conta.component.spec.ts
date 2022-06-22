import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContaComponent } from './update-conta.component';

describe('UpdateContaComponent', () => {
  let component: UpdateContaComponent;
  let fixture: ComponentFixture<UpdateContaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
