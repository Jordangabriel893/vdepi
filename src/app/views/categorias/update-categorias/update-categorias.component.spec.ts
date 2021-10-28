import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCategoriasComponent } from './update-categorias.component';

describe('UpdateCategoriasComponent', () => {
  let component: UpdateCategoriasComponent;
  let fixture: ComponentFixture<UpdateCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
