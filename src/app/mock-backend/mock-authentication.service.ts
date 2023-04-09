import { Injectable } from '@angular/core';

import { Observable, Subject, of, tap } from 'rxjs';
import { LoginFormModel } from '../models/login-form.model';

@Injectable({
  providedIn: 'root',
})
export class MockAuthenticationService {

  users = [
    { username: 'admin', password: '1234' }
  ]

  login(loginForm: LoginFormModel): Observable<any> {
    return new Observable((observer) => {
      setTimeout(() => {
        var isAuthenticated = this.users.find(user => user.username === loginForm.username && user.password === loginForm.password);
        if (isAuthenticated) {
          return observer.next({ access_token: 'some-token' });
        }
        else observer.error('The username or password is incorrect');
      }, 2000);

    });


  }


}
