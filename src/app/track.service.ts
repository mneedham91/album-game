import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Track } from './track';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  getTracks(query = {}) {
    let params = new HttpParams();
    Object.keys(query).forEach(function (key) {
      params = params.append(key, query[key]);
    });
  	return this.http.get<Track[]>(this.baseUrl + 'track', { params })
  }

  getTrack(id: string) {
  	return this.http.get<Track>(this.baseUrl + 'track/' + id);
  }

  createTrack(track: Track, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.post(this.baseUrl + 'track', track, httpOptions);
  }

  editTrack(id: string, data: object, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.patch(this.baseUrl + 'track/' + id, data, httpOptions);
  }

  deleteTrack(id: string, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.delete(this.baseUrl + 'track/' + id, httpOptions);
  }
}
