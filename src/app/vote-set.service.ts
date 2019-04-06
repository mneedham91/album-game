import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { VoteSet } from './vote-set';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteSetService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  getVoteSets(query = {}) {
    let params = new HttpParams();
    Object.keys(query).forEach(function (key) {
      params = params.append(key, query[key]);
    });
  	return this.http.get<VoteSet[]>(this.baseUrl + 'voteset', { params });
  }

  getVoteSet(id: string) {
  	return this.http.get<VoteSet>(this.baseUrl + 'voteset/' + id);
  }

  createVoteSet(vote_set: VoteSet, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.post(this.baseUrl + 'voteset', vote_set, httpOptions);
  }

  editVoteSet(id: string, data: object, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.patch(this.baseUrl + 'voteset/' + id, data, httpOptions);
  }

  deleteVoteSet(id: string, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.delete(this.baseUrl + 'voteset/' + id, httpOptions);
  }
}
