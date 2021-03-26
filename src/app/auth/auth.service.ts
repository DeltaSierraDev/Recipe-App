import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

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

  constructor(private http: HttpClient) {}

  user = new BehaviorSubject<User>(null);

  private signupURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAgcDk49qlfEMvN9KafLpV3Zaf-RSFh7Vc';
  private signinURL = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAgcDk49qlfEMvN9KafLpV3Zaf-RSFh7Vc';

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

  private handleAuth(email: string, userid: string, token: string, expiresIn: number){
    const expirationDate = new Date(new Date().getTime() + expiresIn*1000);
    const user = new User(email, userid, token, expirationDate);
    console.log("LOGGED USER: " + user);
    this.user.next(user);
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
