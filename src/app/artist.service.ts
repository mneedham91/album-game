import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Artist } from './artist';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  getArtists(query?: object) {
  	return this.http.get<Artist[]>(this.baseUrl + 'artist')
  }

  getArtist(id: string) {
  	return this.http.get<Artist>(this.baseUrl + 'artist/' + id);
  }

  createArtist(artist: Artist) {
  	return this.http.post(this.baseUrl + 'artist', artist);
  }

  editArtist(id: string, data: object) {
  	return this.http.patch(this.baseUrl + 'artist/' + id, data);
  }

  deleteArtist(id: string) {
  	return this.http.delete(this.baseUrl + 'artist/' + id);
  }
}
