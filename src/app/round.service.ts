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

  createRound(round: Round) {
  	return this.http.post(this.baseUrl + 'round', round);
  }

  editRound(id: string, data: object) {
  	return this.http.patch(this.baseUrl + 'round/' + id, data);
  }

  deleteRound(id: string) {
  	return this.http.delete(this.baseUrl + 'round/' + id);
  }
}
