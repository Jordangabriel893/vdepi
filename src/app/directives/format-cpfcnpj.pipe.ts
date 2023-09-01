import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatCpfCnpf' })
export class FormatCpfCnpjPipe implements PipeTransform {
    transform(value: string): string {
        if (value.match(/[^0-9]/)) {
            return value;
        }

        value = value.trim().replace(/^\+/, '');
        let result;

        switch (value.length) {
            case 11: //###.###.###-## / CPF
                result = value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6, 9) + '-' + value.slice(9);
                break;
            case 14: //##.###.###/####-##  / CNPJ
                result = value.slice(0, 2) + '.' + value.slice(2, 5) + '.' + value.slice(5, 8) + '/' + value.slice(8, 12) + '-' + value.slice(12);
                break;
            default:
                return value;
        }

        return result
    }
}
