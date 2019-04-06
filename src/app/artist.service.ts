import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Artist } from './artist';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  getArtists(query = {}) {
    let params = new HttpParams();
    Object.keys(query).forEach(function (key) {
      params = params.append(key, query[key]);
    });
  	return this.http.get<Artist[]>(this.baseUrl + 'artist', { params })
  }

  getArtist(id: string) {
  	return this.http.get<Artist>(this.baseUrl + 'artist/' + id);
  }

  createArtist(artist: Artist, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.post(this.baseUrl + 'artist', artist, httpOptions);
  }

  editArtist(id: string, data: object, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.patch(this.baseUrl + 'artist/' + id, data, httpOptions);
  }

  deleteArtist(id: string, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.delete(this.baseUrl + 'artist/' + id, httpOptions);
  }
}
