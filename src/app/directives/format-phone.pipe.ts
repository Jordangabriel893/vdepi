import { Pipe, PipeTransform } from '@angular/core';
import { Injectable } from '@angular/core';

@Pipe({ name: 'formatPhone' })
@Injectable()
export class FormatPhonePipe implements PipeTransform {
    transform(value: string): string {
        if (value.match(/[^0-9]/))
            return value;

        value = value.trim().replace(/^\+/, '');
        let result;
        let ddd;
        let firstGroup;
        let lastGroup;
        let firstDigit;

        switch (value.length) {
            case 10: //(##) ####-#### / 8 Digitos
                ddd = value.slice(0, 2);
                firstGroup = value.slice(2, 6);
                lastGroup = value.slice(6, 10);
                result = "(" + ddd + ") "+ firstGroup + "-" + lastGroup;
                break;
            case 11: //(##) # ####-####  / 9 Digitos
                ddd = value.slice(0, 2);
                firstDigit = value.slice(2, 3);
                firstGroup = value.slice(3, 7);
                lastGroup = value.slice(7, 11);
                result = "(" + ddd + ") " + firstDigit + " " + firstGroup + "-" + lastGroup;
                break;
            default:
                return value;               
        }

        return result;
    }
}
