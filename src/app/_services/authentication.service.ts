import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import * as Model from './../views/_models/model'
import jwt_decode from "jwt-decode";

 @Injectable()
export class AuthenticationService {
  permissoes;
  constructor(
    private http: HttpClient
    ) { }

  login(username: string, password: string) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    let options = {
      headers: headers
    }

    let grant_type = 'password';
    let client_id = 'admin-eblonline';
    let client_secret = 'X3l5h0UhDy7F0xE2sMpSPREcTyqgtZNO';

    let body = `grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&username=${username}&password=${password}`;

    return this.http.post<any>(environment.apiUrl + '/connect/token', body, options)
      .pipe(map(user => {
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.removeItem('currentUser');
          const decodedToken: any = jwt_decode(user.access_token);
          localStorage.setItem('currentUser', JSON.stringify({ access_token: user.access_token, username: decodedToken.email, }))
        }

        return user

      }),
      tap(user => {

        const opcoes = {
          headers: new HttpHeaders({
             'Authorization': 'Bearer ' + user.access_token,
              'withCredentials': 'true', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': 'true'
          })
        }

        this.http.get<any>(environment.apiDados + '/permissao', opcoes).subscribe(permissao =>{
          const getItem = this.getUser()

          localStorage.setItem('currentUser', JSON.stringify({ ...getItem, permission: permissao.data.permissoes}))

        })
      })
      );

  }



    logout() {
      localStorage.removeItem('currentUser');
    }

    getUser() : Model.User {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
}
