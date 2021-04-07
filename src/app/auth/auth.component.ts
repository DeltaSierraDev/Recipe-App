import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, AuthResponseData } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.isLoading = false;
      }
    });

  }

  isLoginMode = true;
  isLoading = false;
  error: string = null;

  onSwitch() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      // authObs = this.authService.signin(email, password);
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));

    } else {
      authObs = this.authService.signup(email, password);
    }

    // this.store.select('auth').subscribe(authState => {

    // });

    // authObs.subscribe(
    //   responseData => {
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   }, errorMessage => {
    //     this.error = errorMessage;
    //     this.isLoading = false;
    //   }
    // );

    form.reset();
  }

  onHandleError() {
    this.error=null;
  }

}
