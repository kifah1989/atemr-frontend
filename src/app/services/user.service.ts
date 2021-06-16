import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import {environment} from 'src/environments/environment';
import {User} from './user.model';
import {Role} from './role.model';
import {catchError, map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getUser(): Observable<User[]> {

    return this.http.get<User[]>(`${environment.webApi}GetUsers`);
  }

  getRoles(): Observable<Role[]> {

    return this.http.get<Role[]>(`${environment.webApi}GetRoles`);
  }

  assignUserToRole(userId, roleId) {

    const body = `{
      "userId": "${userId}",
      "roleId": "${roleId}"
    }`;
    const options = {responseType: 'text' as 'json'};
    return this.http.put(`${environment.webApi}AssignUserToRole`, body, options).pipe(
      map(res => res),
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(err);
      }),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value', err);
        return of([]);
      })
    );
  }

  //returning the response of a key value pair from the back end code
  unassignUserToRole(uId, rId) {
    const body = {
      userId: uId,
      roleId: rId
    };
    return this.http.post(`${environment.webApi}UnassignUserToRole`, body);
  }

  addRole(name, description) {
    const body = `{ "name": "${name}",
   "description": "${description}"}`;
    const options = {responseType: 'text' as 'json'};
    return this.http.post(`${environment.webApi}AddRole`, body, options).pipe(
      map(res => res),
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(err);
      }),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value', err);
        return of([]);
      })
    );
  }

  deleteRole(roleId) {
    const body = `{ "roleId": "${roleId}" }`;
    const options = {responseType: 'text' as 'json'};
    return this.http.post<Role[]>(`${environment.webApi}DeleteRole`, body, options).pipe(
      map(res => res),
      catchError(err => {
        console.log('caught mapping error and rethrowing', err);
        return throwError(err);
      }),
      catchError(err => {
        console.log('caught rethrown error, providing fallback value', err);
        return of([]);
      })
    );
  }
}
