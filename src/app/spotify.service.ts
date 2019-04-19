import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { SpotifyAlbumSearchResult } from './spotify-album-search-result';
import { SpotifyTracksSearchResult } from './spotify-tracks-search-result';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl + 'spotify/';

  getToken() {
  	return this.http.get(this.baseUrl + 'token');
  }

  lookForAlbum(token: string, name: string) {
  	return this.http.post<SpotifyAlbumSearchResult>(this.baseUrl + 'lookForAlbum', { token: token, name: name } );
  }

  getAlbumTracks(token: string, id: string) {
  	return this.http.post<SpotifyTracksSearchResult>(this.baseUrl + 'getAlbumTracks', { token : token, id: id } );
  }

  downloadImage(url: string, _id: string) {
    return this.http.post<any>(this.baseUrl + 'downloadImg', { url: url, _id: _id} );
  }

}
