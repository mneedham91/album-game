import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Track } from './track';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  getTracks(query?: object) {
  	return this.http.get<Track[]>(this.baseUrl + 'track')
  }

  getTrack(id: string) {
  	return this.http.get<Track>(this.baseUrl + 'track/' + id);
  }

  createTrack(track: Track) {
  	return this.http.post(this.baseUrl + 'track', track);
  }

  editTrack(id: string, data: object) {
  	return this.http.patch(this.baseUrl + 'track/' + id, data);
  }

  deleteTrack(id: string) {
  	return this.http.delete(this.baseUrl + 'track/' + id);
  }
}
