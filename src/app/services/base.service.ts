import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public  baseName = '';
  constructor(protected http: HttpClient) {
  }

  getAll():Observable<any[]>{
    return this.http.get<any[]>(environment.apiUrl + `/api/` + this.baseName);
  }

  getById(id:number):Observable<any>{
    return this.http.get<any>(environment.apiUrl + `/api/` + this.baseName+'/'+id);
  }

  create(data:any):Observable<any>{
    return this.http.post<any>(environment.apiUrl + `/api/` + this.baseName, data);
  }

  update(id:number,data:any):Observable<any>{
    return this.http.put<any>(environment.apiUrl + `/api/` + this.baseName+'/'+id,data);
  }

  delete(id:number):Observable<any>{
    return this.http.delete<any>(environment.apiUrl + `/api/` + this.baseName+'/'+id);
  }





}
