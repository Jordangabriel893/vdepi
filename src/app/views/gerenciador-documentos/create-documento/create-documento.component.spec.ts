import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentoComponent } from './create-documento.component';

describe('CreateFaturaComponent', () => {
  let component: CreateDocumentoComponent;
  let fixture: ComponentFixture<CreateDocumentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDocumentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
