import { Inject, Injectable, inject } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, Subject, of, tap } from 'rxjs';
import { LoginFormModel } from '../models/login-form.model';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService extends BaseService {
  override baseName = 'users'

  loginSubject: Subject<boolean> = new Subject<boolean>();
  public currentUser!: User;
  public get user(): User {
    return this.currentUser;
  }
  public get isLoggedIn(): boolean {
    return this.getAccessToken() != '' && !!localStorage.getItem('userRole');
  }

  login(loginForm: LoginFormModel): Observable<any> {
    return this.http.post<any>(environment.apiUrl + `/api/` + this.baseName + `/login`, loginForm).pipe(tap(res => {
      this.currentUser = res.user;
      localStorage.setItem('username', res.user.username);
      localStorage.setItem('userRole', res.user.role);
      localStorage.setItem('token', res['access_token']);
      this.loginSubject.next(true);
    }))
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    this.loginSubject.next(false);
  }

  getLoggedInUser(): Observable<User> {
    var id = this.getAccessToken().split('.')[1];
    if (id)
      return this.http.get<any>(environment.apiUrl + `/api/` + this.baseName + `/` + id)
    else
      return of()
  }

  getAccessToken(): string {
    const item = localStorage.getItem('token');
    if (item === null) return '';
    else return item;
  }
}
