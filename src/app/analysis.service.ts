import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Album } from './album';
import { Track } from './track';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  findSameFaves(user_one: string, user_two: string) {
  	let params = new HttpParams();
    params = params.append('user_one', user_one);
    params = params.append('user_two', user_two);
  	return this.http.get<Album[]>(this.baseUrl + 'analysis/findSameFaves', { params });
  }

  findSameUnfaves(user_one: string, user_two: string) {
  	let params = new HttpParams();
    params = params.append('user_one', user_one);
    params = params.append('user_two', user_two);
  	return this.http.get<Album[]>(this.baseUrl + 'analysis/findSameUnfaves', { params });
  }

  findMismatchVotes(user_one: string, user_two: string, strict: boolean) {
  	let params = new HttpParams();
    params = params.append('user_one', user_one);
    params = params.append('user_two', user_two);
    if (strict) {
    	params = params.append('strict', 'true');
    }
  	return this.http.get<Album[]>(this.baseUrl + 'analysis/findMismatchVotes', { params });
  }
}
