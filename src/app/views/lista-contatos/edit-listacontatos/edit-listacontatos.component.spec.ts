import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditListacontatosComponent } from './edit-listacontatos.component';

describe('EditListacontatosComponent', () => {
  let component: EditListacontatosComponent;
  let fixture: ComponentFixture<EditListacontatosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditListacontatosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditListacontatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
