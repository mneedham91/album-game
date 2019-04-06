import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from './user';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  getUsers(query = {}) {
    let params = new HttpParams();
    Object.keys(query).forEach(function (key) {
      params = params.append(key, query[key]);
    });
  	return this.http.get<User[]>(this.baseUrl + 'user', { params });
  }

  getUser(id: string) {
  	return this.http.get<User>(this.baseUrl + 'user/' + id);
  }

  createUser(user: User, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.post(this.baseUrl + 'user', user, httpOptions);
  }

  editUser(id: string, data: object, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.patch(this.baseUrl + 'user/' + id, data, httpOptions);
  }

  deleteUser(id: string, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.delete(this.baseUrl + 'user/' + id, httpOptions);
  }
}
