import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InformationsService } from 'app/serviços/informations.service';

@Component({
  selector: 'app-labor',
  templateUrl: './labor.component.html',
  styleUrls: ['./labor.component.scss']
})
export class LaborComponent implements OnInit {
  @Input() isHome: boolean;
  laboratorios = [];
  departamento: string;
  constructor(
    private router: Router,
    private informationsService: InformationsService,
  ) { }

  ngOnInit() {
    this.departamento = localStorage.getItem('title');
    this.informationsService.getDados().subscribe(data => {
      console.log(data)
      if (this.isHome) {
        data.departamentos.map(item => this.laboratorios.push(...item.laboratorios));
      } else {
        data.departamentos.map(item => {
          const titleTrimmedLowerCase = this.departamento.trim().toLowerCase().replace(/[-–]/g, "");
          const itemNomeTrimmedLowerCase = item.nome.trim().toLowerCase().replace(/[-–]/g, "");
          if (itemNomeTrimmedLowerCase === titleTrimmedLowerCase) {

            this.laboratorios = item.laboratorios
          }


        });
      }
    });
  }

  redirecionarParaLaboratorio(nome) {
    localStorage.setItem('titleLab', nome);
    this.router.navigate(['/laboratorio']);
  }

}
