import { InjectionToken } from "@angular/core";
import { NotifierService } from "angular-notifier/src/services/notifier.service";
import { environment } from "environments/environment";
import { Restangular } from "ngx-restangular";

//Restangular service that uses accounting
export const RESTANGULAR_TOKEN = new InjectionToken<any>('Restangular');
export function RestangularTokenFactory(restangular: Restangular, notifierService: NotifierService) {
  return restangular.withConfig((RestangularConfigurer) => {
     RestangularConfigurer.setBaseUrl(environment.apiDados);

     let currentUser = JSON.parse(localStorage.getItem('currentUser'));
     if (currentUser && currentUser.access_token) {
      RestangularConfigurer.setDefaultHeaders({ 'Authorization': 'Bearer ' + currentUser.access_token, withCredentials: true, 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': true });
     }

     RestangularConfigurer.addErrorInterceptor((response, subject, responseHandler) => {
       if (response.status === 401) {
         //localStorage.removeItem('currentUser');
         window.location.href = '/#/login';
         return false;
       }

       if (response.status === 403) {
         notifierService.notify("error", "Acesso Negado");
         return false;
       }

       return true;
     });
   });
}
