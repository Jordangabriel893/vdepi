import { Component, Input, OnInit, forwardRef, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-judicial-lote',
  templateUrl: './input-judicial-lote.component.html',
  styleUrls: ['./input-judicial-lote.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputJudicialLoteComponent),
      multi: true,
    },
  ],
})
export class InputJudicialLoteComponent implements ControlValueAccessor  {

  @Input() label: string;
  @Input() multiple: boolean;
  @Input() items: any[] = [];
  @Input() bindLabel: string;	
  @Input() bindValue: string;
  @Input() rota: string;
  @Output() callback = new EventEmitter<any>();
  @Input() loading: boolean = false;

  value: string;

  onChange: any = () => {};
  onTouched: any = () => {};

  

  constructor() { }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // You can implement this if needed
  }

  updateValue(value: string): void {
    this.value = value;
    this.onChange(this.value);
    this.onTouched();
  }

  executeCallback() {

    this.callback.emit();
  }

}
