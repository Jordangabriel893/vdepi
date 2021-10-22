import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeiloeirosComponent } from './leiloeiros.component';

describe('LeiloeirosComponent', () => {
  let component: LeiloeirosComponent;
  let fixture: ComponentFixture<LeiloeirosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeiloeirosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeiloeirosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
