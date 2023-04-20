import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';
import { Role } from '../../models/role.model';
import { MockBackendControllers } from './mock-backend-controllers';



@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    const { url, method, headers, body } = request;
    MockBackendControllers.headers = headers;
    MockBackendControllers.url = url;

    return handleRoute();

    function handleRoute() {
      switch (true) {
        case url.endsWith('/users/login') && method === 'POST':
          const { username, password } = body
          return MockBackendControllers.user.authenticate({ username: username, password: password });
        case url.endsWith('/users') && method === 'GET':
          return MockBackendControllers.user.getUsers();
        case url.match(/\/users\/\d+$/) && method === 'GET':
          return MockBackendControllers.user.getUserById();
        //patients
        case url.endsWith('/patients') && method === 'GET':
          return MockBackendControllers.patients.getAll();
        case url.match(/\/patients\/\d+$/) && method === 'GET':
          return MockBackendControllers.patients.getById();
        case url.endsWith('/patients') && method === 'POST':
          return MockBackendControllers.patients.create(body);
          case url.match(/\/patients\/\d+$/) && method === 'PUT':
            return MockBackendControllers.patients.update(body);
            case url.match(/\/patients\/\d+$/) && method === 'DELETE':
              return MockBackendControllers.patients.delete();

        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }


  }
}
export const mockBackendProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: MockBackendInterceptor,
  multi: true
};
