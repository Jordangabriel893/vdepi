import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../_services';
import { NotifierService } from 'angular-notifier';
import { first } from 'rxjs/operators';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['login.style.scss']
})

export class LoginComponent implements OnInit {
  submitted = false;
  loginForm: FormGroup;
  loading = false;
  returnUrl: string;
  fieldTextType: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private notifierService: NotifierService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // reset login status
    //this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/'
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        () => {
          window.location.href = '/#/home';
        },
        err => {
          let msgError = "Houve um erro inesperado, por favor tente novamente";
          if(err.error && err.error.error_description === 'invalid_username_or_password') {
            msgError = "Usuário ou Senha inválidos"
          }
          this.notifierService.notify("error", msgError);
          this.loading = false;
      });
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }
}
