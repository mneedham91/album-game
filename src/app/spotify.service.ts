import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { SpotifySearchResult } from './spotify-search-result';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  getToken() {
  	return this.http.get(this.baseUrl + 'spotify/token');
  }

  lookForAlbum(token: string, name: string) {
  	return this.http.post<SpotifySearchResult>(this.baseUrl + 'spotify/lookForAlbum', { token: token, name: name } );
  }

}
