import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContaComponent } from './create-conta.component';

describe('CreateContaComponent', () => {
  let component: CreateContaComponent;
  let fixture: ComponentFixture<CreateContaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
