import { ActivatedRoute } from '@angular/router';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { AuthenticationService } from 'app/_services';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Restangular } from 'ngx-restangular';
import { Location } from '@angular/common';
@Component({
    selector: 'app-assinatura',
    templateUrl: './assinatura.component.html',
    styleUrls: ['./assinatura.component.scss']
})
export class AssinaturaComponent implements OnInit {
    assinado = true;
    hasPermission = false;
    sub: Subscription[] = [];
    documentoLoteId;
    currentPath;
    constructor(
        private formBuilder: FormBuilder,
        private authenticationService: AuthenticationService,
        private route: ActivatedRoute,
        private restangular: Restangular,
        location: Location
    ) {
        this.currentPath = location.path();
        this.authenticationService.loginAnonimo().subscribe(item => {
            const id = this.currentPath.substring(12, this.currentPath.length);
            this.hasPermission = true;
            this.getDocumento(id);
        })
        window.addEventListener('message', (event) => {
            if (event.data === 'signed') {
                this.restangular.all(`/DocumentoLote/finalizar/${this.documentoLoteId}`).post().subscribe(a => {
                    this.assinado = false;
                })
            }
        }, false);
    }

    ngOnInit() {

    }
    getDocumento(id) {
        this.sub.push(
            this.restangular.all(`DocumentoLote/token`).get(id).subscribe(dados => {
                this.documentoLoteId = dados.data.documentoLoteId
                this.initIframe(dados.data.idDocD4sign)
            }))
    }
    initIframe(keyDoc) {
        //----------INÍCIO DAS VARIAVEIS----------//
        const key = keyDoc;
        const signer_disable_preview = '0';
        const signer_email = 'leolirarj@gmail.com';
        const signer_display_name = ''; //Opcional
        const signer_documentation = ''; //Opcional
        const signer_birthday = ''; //Opcional
        const signer_key_signer = ''; //Opcional

        const host = 'https://secure.d4sign.com.br/embed/viewblob';
        const container = 'signature-div';
        const width = '100%';
        const height = '700';
        //----------FIM DAS VARIAVEIS----------//

        let is_safari = navigator.userAgent.indexOf('Safari') > -1;
        const is_chrome = navigator.userAgent.indexOf('Chrome') > -1;
        if ((is_chrome) && (is_safari)) { is_safari = false; }
        if (is_safari) {
            if (!document.cookie.match(/^(.*;)?\s*fixed\s*=\s*[^;]+(.*)?$/)) {
                document.cookie = 'fixed=fixed; expires=Tue, 19 Jan 2038 03:14:07 UTC; path=/';
                let url = document.URL;
                const str = window.location.search;
                const param = str.replace('?', '');
                if (url.indexOf('?') > -1) {
                    url = url.substr(0, url.indexOf('?'));
                }
                window.location.replace('https://secure.d4sign.com.br/embed/safari_fix?param=' + param + '&r=' + url);
            }
        }
        const iframe = document.createElement('iframe');
        if (signer_key_signer === '') {
            iframe.setAttribute('src', host + '/' + key + '?email=' + signer_email + '&display_name=' + signer_display_name + '&documentation=' + signer_documentation + '&birthday=' + signer_birthday + '&disable_preview=' + signer_disable_preview);
        } else {
            iframe.setAttribute('src', host + '/' + key + '?email=' + signer_email + '&display_name=' + signer_display_name + '&documentation=' + signer_documentation + '&birthday=' + signer_birthday + '&disable_preview=' + signer_disable_preview + '&key_signer=' + signer_key_signer);
        }
        iframe.setAttribute('id', 'd4signIframe');
        iframe.setAttribute('width', width);
        iframe.setAttribute('height', height);

        //  iframe.style.border = 0;
        iframe.setAttribute('allow', 'geolocation');
        const cont = document.getElementById(container);
        cont.appendChild(iframe);
        window.addEventListener('message', (event) => {
            if (event.data === 'signed') {
                alert('ASSINADO');
            }
            if (event.data === 'wrong-data') {
                alert('DADOS ERRADOS');
            }
        }, false);
    }
}
