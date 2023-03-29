import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTipodocumentoComponent } from './edit-tipodocumento.component';

describe('EditTipodocumentoComponent', () => {
  let component: EditTipodocumentoComponent;
  let fixture: ComponentFixture<EditTipodocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTipodocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTipodocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
