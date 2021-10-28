import { HttpResponse, HttpClient } from '@angular/common/http';
import * as fileSaver from 'file-saver';
import { Component, ModuleWithComponentFactories, OnInit } from '@angular/core';
import { Restangular } from 'ngx-restangular';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-vistoria',
  templateUrl: './vistoria.component.html',
  styleUrls: ['./vistoria.component.scss']
})
export class VistoriaComponent implements OnInit {
  vistoria
  loading = true;
  constructor(
    private restangular: Restangular,
    private http: HttpClient,
    private notifierService: NotifierService,
  ) {
    this.restangular.one("vistoria").get().subscribe((response) => {
      console.log(response.data)
     this.vistoria = response.data
     this.loading = false;
    },
    () => this.loading = false)
  
   }

  ngOnInit() {
  }

  laudo(id){
    this.restangular.one(`vistoria/${id}/laudo`, )
    .withHttpConfig({responseType: 'blob'})
    .get()
    .subscribe((response) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      fileSaver.saveAs(blob, `Comprovante_${id}.pdf`);
    },(error) => {
      this.notifierService.notify('error', 'Não foi possivel fazer o download do comprovante!')
      
    }) 

  
   }
   getFile(id): Observable<Blob> {   
    return  this.restangular.one(`vistoria/${id}/laudo`, ).get({ responseType: 'blob' });
}
}
