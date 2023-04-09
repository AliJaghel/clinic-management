import { Inject, Injectable, inject } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, Subject, tap } from 'rxjs';
import { MockAuthenticationService } from '../mock-backend/mock-authentication.service';
import { LoginFormModel } from '../models/login-form.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  private mockAuthenticationService = inject(MockAuthenticationService) // typed as string


  loginSubject: Subject<boolean> = new Subject<boolean>();
  login(loginForm: LoginFormModel): Observable<any> {
    return this.mockAuthenticationService.login(loginForm)
    // return this.http.post<any>(`/api/` + this.baseName + `/login/`, loginForm).pipe(tap(res => {
    //   localStorage.setItem('token', res['access_token']);
    //   localStorage.setItem('refreshToken', res['refresh_token']);
    //   this.loginSubject.next(true);
    // }))
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.loginSubject.next(false);
  }


}
