
import { Store } from '@ngrx/store';
import { environment } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private router: Router, private store: Store<fromApp.AppState>) {}

  //user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;


  private signupURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
  private signinURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;

  signup(email: string, password: string){
    return this.http.post<AuthResponseData>(this.signupURL, {
      email: email,
      password: password,
      returnSecureToken: true
      }
    )
    .pipe(catchError(this.handleError), tap(
      responseData => {
        this.handleAuth(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }
      )
    );
  }

  signin(email: string, password: string){
    return this.http.post<AuthResponseData>(this.signinURL, {
      email: email,
      password: password,
      returnSecureToken: true
      }
    )
    .pipe(catchError(this.handleError), tap(
      responseData => {
        this.handleAuth(responseData.email, responseData.localId, responseData.idToken, +responseData.expiresIn);
        }
      )
    );
  }

  signout(){
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autologout(expirationDuration: number){
    this.tokenExpirationTimer = setTimeout(
      () => {
      this.signout();
      },expirationDuration);
  }

  autologin(){
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      this.store.dispatch(new AuthActions.Login({
        email: loadedUser.email,
        userId: loadedUser.id,
        token: loadedUser.token,
        expirationDate: new Date(userData._tokenExpirationDate)
      }));
      const expireDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autologout(expireDuration);
    }
  }

  private handleAuth(email: string, userid: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    const user = new User (email, userid, token, expirationDate)
    this.store.dispatch(new AuthActions.Login({
      email: email,
      userId: userid,
      token: token,
      expirationDate: expirationDate
    }));
    this.autologout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorResponse: HttpErrorResponse){
    let errorMessage = 'Undefined error!'
      if (!errorResponse.error || !errorResponse.error.error ) {
          return throwError(errorMessage);
      } else {
        switch (errorResponse.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email address is already in use!';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email address is not found!';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'Wrong password!';
            break;
        }
        return throwError(errorMessage);
      }
  }

}
