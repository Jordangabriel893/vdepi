import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentoTemplateComponent } from './create-documento-template.component';

describe('CreateDocumentoTemplateComponent', () => {
  let component: CreateDocumentoTemplateComponent;
  let fixture: ComponentFixture<CreateDocumentoTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDocumentoTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDocumentoTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
