import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Album } from './album';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(private http: HttpClient) { }
  baseUrl: string = environment.baseUrl;

  getAlbums(query: object) {
  	return this.http.get<Album[]>(this.baseUrl + 'album')
  }

  getAlbum(id: string) {
  	return this.http.get<Album>(this.baseUrl + 'album/' + id);
  }

  createAlbum(album: Album) {
  	return this.http.post(this.baseUrl + 'album', album);
  }

  editAlbum(id: string, data: object) {
  	return this.http.patch(this.baseUrl + 'album/' + id, data);
  }

  deleteAlbum(id: string) {
  	return this.http.delete(this.baseUrl + 'album/' + id);
  }
}
