import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private router: Router, private store: Store<fromApp.AppState>) { }

  private sub: Subscription;

  ngOnInit(): void {
    this.sub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy(){
    if (this.sub) {
      this.sub.unsubscribe();
    }
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
    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({email: email, password: password}));

    } else {
      this.store.dispatch(new AuthActions.SignupStart({email: email, password: password}));
    }
    form.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

}
