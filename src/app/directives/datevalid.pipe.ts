import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'prixDateValid' })
export class DateValidPipe implements PipeTransform {
    transform(value: string, ): string {
        let timezone = value.substring(value.length - 1);

        if (timezone.toLowerCase() == "z")
            return value;
        else
            return value + "Z";
    }
}