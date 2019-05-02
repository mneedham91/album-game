import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Rating } from './rating';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  getRatings(query = {}) {
    let params = new HttpParams();
    Object.keys(query).forEach(function (key) {
      params = params.append(key, query[key]);
    });
  	return this.http.get<Rating[]>(this.baseUrl + 'rating', { params })
  }

  getRating(id: string) {
  	return this.http.get<Rating>(this.baseUrl + 'rating/' + id);
  }

  createRating(round: Rating, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.post(this.baseUrl + 'rating', round, httpOptions);
  }

  editRating(id: string, data: object, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.patch(this.baseUrl + 'rating/' + id, data, httpOptions);
  }

  deleteRating(id: string, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.delete(this.baseUrl + 'rating/' + id, httpOptions);
  }
}
