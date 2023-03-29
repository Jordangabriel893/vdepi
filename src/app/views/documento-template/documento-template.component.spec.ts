import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentoTemplateComponent } from './documento-template.component';

describe('DocumentoTemplateComponent', () => {
  let component: DocumentoTemplateComponent;
  let fixture: ComponentFixture<DocumentoTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentoTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
