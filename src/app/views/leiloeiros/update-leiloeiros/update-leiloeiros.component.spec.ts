import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeiloeirosComponent } from './update-leiloeiros.component';

describe('UpdateLeiloeirosComponent', () => {
  let component: UpdateLeiloeirosComponent;
  let fixture: ComponentFixture<UpdateLeiloeirosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateLeiloeirosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLeiloeirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
