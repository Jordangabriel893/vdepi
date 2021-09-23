import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'groupBy2' })
export class GroupByPipe2 implements PipeTransform {
    transform(value: Array<any>, field: string): Array<any> {
        const groupedObj = value.reduce((prev, cur) => {
            if (!prev[cur[field]]) {
                prev[cur[field]] = [cur];
            } else {
                prev[cur[field]].push(cur);
            }
            return prev;
        }, {});
        let teste = Object.keys(groupedObj).map(key => { return { key, value: groupedObj[key] } });
        return teste;
    }
}
