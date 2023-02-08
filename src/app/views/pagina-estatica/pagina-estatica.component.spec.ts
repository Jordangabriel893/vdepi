import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaEstaticaComponent } from './pagina-estatica.component';

describe('PaginaEstaticaComponent', () => {
  let component: PaginaEstaticaComponent;
  let fixture: ComponentFixture<PaginaEstaticaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaEstaticaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaEstaticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
