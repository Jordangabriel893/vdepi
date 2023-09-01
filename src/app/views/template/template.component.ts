import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmailEditorComponent } from 'angular-email-editor';
import { NotifierService } from 'angular-notifier';
import { Restangular } from 'ngx-restangular';
@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  loading = true;
  templates;
  constructor(
    private formBuilder: FormBuilder,
    private notifierService: NotifierService,
    private router: Router,
    private restangular: Restangular,
    private route: ActivatedRoute,
  ) {

   }

   ngOnInit() {
    this.restangular.one('Marketing/TemplateNotificacao').get().subscribe(
      dados => {
        this.templates = dados.data
        this.loading = false;
      }
    )
  }
  edit(id) {
    this.router.navigate(['/update-template', id], { relativeTo: this.route });
  }

}
