import { Injectable } from '@angular/core';
import * as Model from './../views/_models/model'

@Injectable()
export class StoreService {

    setStoreContext(store: Model.Loja) {
      localStorage.removeItem('currentStore');
      localStorage.setItem('currentStore', JSON.stringify(store));
    }

    getStoreContext(): Model.Loja {
      return JSON.parse(localStorage.getItem('currentStore'));
    }
}
