import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePaginaestaticaComponent } from './update-paginaestatica.component';

describe('UpdatePaginaestaticaComponent', () => {
  let component: UpdatePaginaestaticaComponent;
  let fixture: ComponentFixture<UpdatePaginaestaticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePaginaestaticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePaginaestaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
