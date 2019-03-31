import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VoteSet } from './vote-set';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VoteSetService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  getVoteSets(query?: object) {
  	return this.http.get<VoteSet[]>(this.baseUrl + 'voteset')
  }

  getVoteSet(id: string) {
  	return this.http.get<VoteSet>(this.baseUrl + 'voteset/' + id);
  }

  createVoteSet(vote_set: VoteSet) {
  	return this.http.post(this.baseUrl + 'voteset', vote_set);
  }

  editVoteSet(id: string, data: object) {
  	return this.http.patch(this.baseUrl + 'voteset/' + id, data);
  }

  deleteVoteSet(id: string) {
  	return this.http.delete(this.baseUrl + 'voteset/' + id);
  }
}
