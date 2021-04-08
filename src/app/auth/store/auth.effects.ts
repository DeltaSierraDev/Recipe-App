import { AuthService } from './../auth.service';
import { User } from './../user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from "@ngrx/effects";
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuth = (expiresIn: number, email: string, userId: string, token: string) => {
  const expirationDate = new Date(new Date().getTime() + +expiresIn *1000);
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate
  });
};

const handleError = (errorResponse: any) => {
  let errorMessage = 'Undefined error!'
  if (!errorResponse.error || !errorResponse.error.error ) {
      return of(new AuthActions.AuthenticateFail(errorMessage));
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
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
};


@Injectable()
export class AuthEffects {

  constructor(private actions$: Actions, private http: HttpClient, private router: Router, private authService: AuthService){}
  private signupURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey;
  private signinURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey;

  @Effect()
  authSighnup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http.post<AuthResponseData>(this.signupURL, {
        email: signupAction.paylad.email,
        password: signupAction.paylad.password,
        returnSecureToken: true
        }
      ).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuth(
            +resData.expiresIn,
            resData.expiresIn,
            resData.localId,
            resData.idToken
            )
        }),
        catchError(errorResponse => {
          return handleError(errorResponse)
        })
      )
    })
  );

  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    switchMap((authData: AuthActions.LoginStart) => {
      return this.http.post<AuthResponseData>(this.signinURL, {
        email: authData.paylad.email,
        password: authData.paylad.password,
        returnSecureToken: true
        }
      ).pipe(
        tap(resData => {
          this.authService.setLogoutTimer(+resData.expiresIn * 1000);
        }),
        map(resData => {
          return handleAuth(
            +resData.expiresIn,
            resData.expiresIn,
            resData.localId,
            resData.idToken
            )
        }),
        catchError(errorResponse => {
          return handleError(errorResponse)
        })
      )
    }),
  );

  @Effect({dispatch: false})
  authRedirect = this.actions$.pipe(ofType(AuthActions.AUTHENTICATE_SUCCESS), tap(()=>{
    this.router.navigate(['/']);
  }));

  @Effect()
  autoLogin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string,
        id: string,
        _token: string,
        _tokenExpirationDate: string
      } = JSON.parse(localStorage.getItem('userData'));
      if (!userData) {
        return { type: 'NO-EFFECT' };
      }
      const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
      if (loadedUser.token) {
        const expireDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
        this.authService.setLogoutTimer(expireDuration);

        return new AuthActions.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        });
      }
      return { type: 'NO-EFFECT' };
    })
  );

  @Effect({dispatch: false})
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authService.clearLogoutTimer();
      localStorage.removeItem('userData');
      this.router.navigate(['/auth']);
    })
  );


}
