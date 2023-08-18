import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dataFilter'
})
export class DataFilterPipe implements PipeTransform {

    transform(array: any[], query: string): any {
        if (query) {
            return array.filter(item => {
                return Object.keys(item).some(k => {
                    if (typeof (item[k]) === 'object' && item[k] !== null) {
                        return Object.keys(item[k]).some(j => {
                            if (typeof (item[k][j]) === 'object' && item[k][j] !== null) {
                                return Object.keys(item[k][j]).some(l => {
                                    return String(item[k][j][l]).toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1
                                });
                            } else {
                                return String(item[k][j]).toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1
                            }
                        });
                    } else {
                        return String(item[k]).toLocaleLowerCase().indexOf(query.toLocaleLowerCase()) > -1
                    }
                });
            });
        }
        return array;
    }
}
