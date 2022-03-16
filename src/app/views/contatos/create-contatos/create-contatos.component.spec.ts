import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContatosComponent } from './create-contatos.component';

describe('CreateContatosComponent', () => {
  let component: CreateContatosComponent;
  let fixture: ComponentFixture<CreateContatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
