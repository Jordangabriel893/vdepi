import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTipodocumentoComponent } from './create-tipodocumento.component';

describe('CreateTipodocumentoComponent', () => {
  let component: CreateTipodocumentoComponent;
  let fixture: ComponentFixture<CreateTipodocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTipodocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTipodocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
