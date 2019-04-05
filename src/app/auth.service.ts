import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  login(name: string, password: string) {
  	return this.http.post<any>(this.baseUrl + 'login', { name, password } );
  }
}
