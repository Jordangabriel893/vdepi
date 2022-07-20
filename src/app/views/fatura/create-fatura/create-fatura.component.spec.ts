import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFaturaComponent } from './create-fatura.component';

describe('CreateFaturaComponent', () => {
  let component: CreateFaturaComponent;
  let fixture: ComponentFixture<CreateFaturaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFaturaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFaturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
