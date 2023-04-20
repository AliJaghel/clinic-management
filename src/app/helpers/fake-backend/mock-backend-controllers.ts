import { LoginFormModel } from './../../models/login-form.model';
import { User } from './../../models/user.model';
import { HttpResponse } from "@angular/common/http";
import { delay, dematerialize, materialize, of, throwError } from "rxjs";
import { Role } from "src/app/models/role.model";
import { databaseTables } from './mock-database-tables';
import { Patient } from 'src/app/models/patient.model';

export class MockBackendControllers {
  public static headers: any;
  public static url: any;
  static helper = {
    unauthorized: () => {
      return throwError({ status: 401, error: { message: 'unauthorized' } })
        .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
    },
    error: (message: string) => {
      return throwError({ status: 400, error: { message } })
        .pipe(materialize(), delay(500), dematerialize());
    },
    ok: (body: any) => {
      return of(new HttpResponse({ status: 200, body }))
        .pipe(delay(500)); // delay observable to simulate server api call
    },
    isAuthenticate: () => {
      const authHeader = this.headers.get('Authorization') || '';
      const id = parseInt(this.headers.get('Authorization')!.split('.')[1]);
      const userId = databaseTables.users.find((user: User) => user.id === id)?.id;
      return authHeader === 'Bearer fake-jwt-token.' + userId;
    },
    idFromUrl: () => {
      const urlParts = this.url.split('/');
      return parseInt(urlParts[urlParts.length - 1]);
    },
  }
  static user = {
    isAdmin: () => {
      return this.helper.isAuthenticate() && this.user.currentUser()?.role === Role.Admin;
    },

    currentUser: () => {
      if (!this.helper.isAuthenticate()) return;
      const id = parseInt(this.headers.get('Authorization')!.split('.')[1]);
      return databaseTables.users.find((user: User) => user.id === id);
    },

    authenticate: (loginForm: LoginFormModel) => {
      const user = databaseTables.users.find((user: User) => user.username === loginForm.username && user.password === loginForm.password);
      if (!user) return this.helper.error('Username or password is incorrect');
      return this.helper.ok({
        user: user,
        access_token: `fake-jwt-token.${user.id}`
      });
    },

    getUsers: () => {
      if (!this.user.isAdmin()) return this.helper.unauthorized();
      return this.helper.ok(databaseTables.users);
    },

    getUserById: () => {
      if (!this.helper.isAuthenticate()) return this.helper.unauthorized();
      // only admins can access other user records
      if (!this.user.isAdmin() && this.user.currentUser()?.id !== this.helper.idFromUrl()) return this.helper.unauthorized();
      const user = databaseTables.users.find(x => x.id === this.helper.idFromUrl());
      return this.helper.ok(user);
    }
  }
  static patients = {
    getAll: () => {
      if (!this.helper.isAuthenticate()) return this.helper.unauthorized();
      return this.helper.ok(databaseTables.patients);
    },
    getById: () => {
      if (!this.helper.isAuthenticate()) return this.helper.unauthorized();
      return this.helper.ok(databaseTables.patients.find(x => x.id === this.helper.idFromUrl()));
    }
    ,
    create: (obj: Patient) => {
      if (!this.helper.isAuthenticate()) return this.helper.unauthorized();
      return this.helper.ok(databaseTables.patients.push(obj));
    },
    update: (obj: Patient) => {
      if (!this.helper.isAuthenticate()) return this.helper.unauthorized();
      const index = databaseTables.patients.findIndex(x => x.id === this.helper.idFromUrl());
      databaseTables.patients[index] = obj;
      return this.helper.ok(databaseTables.patients[index]);
    },
    delete: () => {
      if (!this.helper.isAuthenticate()) return this.helper.unauthorized();
      const index = databaseTables.patients.findIndex(x => x.id === this.helper.idFromUrl());
      databaseTables.patients.splice(index, 1);
      return this.helper.ok(this.helper.idFromUrl());
    }
  }
}
