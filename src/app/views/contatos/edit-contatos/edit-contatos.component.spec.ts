import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContatosComponent } from './edit-contatos.component';

describe('EditContatosComponent', () => {
  let component: EditContatosComponent;
  let fixture: ComponentFixture<EditContatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
