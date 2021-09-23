import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { Injectable } from '@angular/core';

@Pipe({
  name: 'currencyFormat'
})
@Injectable()
export class CurrencyFormatPipe implements PipeTransform {
  transform(value: number, number_format: string = '1.2-2'): string {
        //if (value) {
          let currencyPipe = new CurrencyPipe('pt-BR');
            let new_value: string;

            new_value = currencyPipe.transform(value, 'BRL', 'symbol', number_format);
            new_value = new_value.replace('R$', 'R$ ');

            return new_value                                    
        //}
    }
}
