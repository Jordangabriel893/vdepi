import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciadorDocumentosComponent } from './gerenciador-documentos.component';

describe('FaturaComponent', () => {
  let component: GerenciadorDocumentosComponent;
  let fixture: ComponentFixture<GerenciadorDocumentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GerenciadorDocumentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciadorDocumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
