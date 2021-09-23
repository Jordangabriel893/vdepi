import { Injectable } from '@angular/core';
//import { Http, Headers, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as Model from './../views/_models/model'

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

    login(username: string, password: string) {

      //var options = this.getRequestOptions();
      return this.http.post<any>(environment.apiUrl + '/account/authenticate', { username, password })
        .pipe(map(user => {
          // login successful if there's a jwt token in the response
          //let user = response.json();
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.removeItem('currentUser');
            localStorage.setItem('currentUser', JSON.stringify(user));
          }

          return user;
        }));
    }

    logout() {
      //var options = this.getRequestOptions();

      //var login = localStorage.getItem('currentUser');
      //this.http
      //  .post(environment.apiUrl + '/account/logout', login, options)
      //  .subscribe(x => {
      //    // remove o usuario do local storage
      //    localStorage.removeItem('currentUser');
      //  });
      localStorage.removeItem('currentUser');
    }

    getUser() : Model.User {
      return JSON.parse(localStorage.getItem('currentUser'));
    }


    //private getRequestOptions() {
    //  const headers = new Headers({
    //    'Accept': 'application/json',
    //    'Content-type': 'application/json'
    //  });
    //  return { headers };
    //}
}
