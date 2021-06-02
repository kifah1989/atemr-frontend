
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './user.model';
import { Role } from './role.model';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  getUser(): Observable<User[]> {

    return this.http.get<User[]>(`${environment.webApi}GetUsers`);
  }

  getRoles(): Observable<Role[]> {

    return this.http.get<Role[]>(`${environment.webApi}GetRoles`);
  }

  assignUserToRole(userId, roleId): Observable<Role[]> {

    const body = `{
      "userId": "${userId}",
      "roleId": "${roleId}"
    }`;
    return this.http.put<Role[]>(`${environment.webApi}AssignUserToRole`, body);
  }
  unassignUserToRole(userId, roleId): Observable<Role[]> {

    const body = `{
      "userId": "${userId}",
      "roleId": "${roleId}"
    }`;
    return this.http.post<Role[]>(`${environment.webApi}UnassignUserToRole`, body);
  }
  addRole(name, description): Observable<Role[]> {

    const body = `{ "name": "${name}",
   "description": "${description}"}`;
    return this.http.post<Role[]>(`${environment.webApi}AddRole`, body);
  }
  deleteRole(roleId): Observable<Role[]> {

    const body = `{ "roleId": "${roleId}" }`;
    return this.http.post<Role[]>(`${environment.webApi}DeleteRole`, body);
  }
}
