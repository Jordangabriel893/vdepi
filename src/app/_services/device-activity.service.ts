import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { DispositivoAtividade } from './../views/_models/model';


@Injectable()
export class DeviceActivityService {
  dispositivo

  constructor(private http: HttpClient) {

  }

  gerarAtividade(dispositivoAtividade: DispositivoAtividade) {

    return this.http.post('api/dispositivoAtividade', dispositivoAtividade);
  }
}
