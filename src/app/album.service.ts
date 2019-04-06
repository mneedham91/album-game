import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Album } from './album';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  getAlbums(query = {}) {
    let params = new HttpParams();
    Object.keys(query).forEach(function (key) {
      params = params.append(key, query[key]);
    });
    return this.http.get<Album[]>(this.baseUrl + 'album', { params });
  }

  getAlbum(id: string) {
  	return this.http.get<Album>(this.baseUrl + 'album/' + id);
  }

  createAlbum(album: Album, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.post(this.baseUrl + 'album', album, httpOptions);
  }

  editAlbum(id: string, data: object, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.patch(this.baseUrl + 'album/' + id, data, httpOptions);
  }

  deleteAlbum(id: string, token: string) {
    let httpOptions = {
      headers: new HttpHeaders( { 'Authorization': 'Bearer ' + token } )
    };
  	return this.http.delete(this.baseUrl + 'album/' + id, httpOptions);
  }
}
