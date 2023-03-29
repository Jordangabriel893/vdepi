import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDocumentoTemplateComponent } from './edit-documento-template.component';

describe('EditDocumentoTemplateComponent', () => {
  let component: EditDocumentoTemplateComponent;
  let fixture: ComponentFixture<EditDocumentoTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDocumentoTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDocumentoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
