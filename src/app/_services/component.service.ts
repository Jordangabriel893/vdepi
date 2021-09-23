import { Injectable } from '@angular/core';
import { Observable ,  Subject } from 'rxjs';

@Injectable()
export class ComponentService {
  private _listners = new Subject<any>();

  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  update() {
    this._listners.next();
  }

}
