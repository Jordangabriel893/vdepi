import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLeiloeirosComponent } from './create-leiloeiros.component';

describe('CreateLeiloeirosComponent', () => {
  let component: CreateLeiloeirosComponent;
  let fixture: ComponentFixture<CreateLeiloeirosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLeiloeirosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLeiloeirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
