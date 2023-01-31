import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePaginaestaticaComponent } from './create-paginaestatica.component';

describe('CreatePaginaestaticaComponent', () => {
  let component: CreatePaginaestaticaComponent;
  let fixture: ComponentFixture<CreatePaginaestaticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePaginaestaticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePaginaestaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
