import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailEditorEblComponent } from './email-editor-ebl.component';

describe('SearchLeilaoComponent', () => {
  let component: EmailEditorEblComponent;
  let fixture: ComponentFixture<EmailEditorEblComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailEditorEblComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailEditorEblComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
