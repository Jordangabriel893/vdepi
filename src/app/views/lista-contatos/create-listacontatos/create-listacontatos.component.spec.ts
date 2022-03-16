import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateListacontatosComponent } from './create-listacontatos.component';

describe('CreateListacontatosComponent', () => {
  let component: CreateListacontatosComponent;
  let fixture: ComponentFixture<CreateListacontatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateListacontatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListacontatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
