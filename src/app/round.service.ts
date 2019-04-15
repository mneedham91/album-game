import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Round } from './round';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoundService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  getRounds(query = {}) {
    let params = new HttpParams();
    Object.keys(query).forEach(function (key) {
      params = params.append(key, query[key]);
    });
  	return this.http.get<Round[]>(this.baseUrl + 'round', { params })
  }

  getRound(id: string) {
  	return this.http.get<Round>(this.baseUrl + 'round/' + id);
  }

  createRound(round: Round, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.post(this.baseUrl + 'round', round, httpOptions);
  }

  editRound(id: string, data: object, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.patch(this.baseUrl + 'round/' + id, data, httpOptions);
  }

  editRoundImage(id: string, image: any, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
    return this.http.patch(this.baseUrl + 'round/' + id + '/image', image, httpOptions);
  }

  deleteRound(id: string, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.delete(this.baseUrl + 'round/' + id, httpOptions);
  }
}
