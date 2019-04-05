import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { SpotifyAlbum } from '../spotify-album';
import { SpotifyService } from '../spotify.service';
import { SpotifySearchResult } from '../spotify-search-result';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {
  token: string;
  spotifySearchAlbumForm: FormGroup;
  spotifyResults: SpotifySearchResult;
  albums: SpotifyAlbum[];

  constructor(
  	private formBuilder: FormBuilder,
  	private spotifyService: SpotifyService,
  	private titleService: Title) { }

  ngOnInit() {
  	this.titleService.setTitle('Album Game | Add Album');
  	this.spotifySearchAlbumForm = this.formBuilder.group({
  		name: '',
  	});
  	this.spotifyService.getToken().subscribe(data => {
  		this.token = data['access_token'];
  	});
  }

  search() {
  	this.spotifyService.lookForAlbum(this.token, this.spotifySearchAlbumForm.value['name']).subscribe( data => {
  	  this.spotifyResults = data;
  	  this.albums = this.spotifyResults.albums.items;
  	});
  }

  reset() {
    this.spotifySearchAlbumForm.setValue({
      name: '',
    });
  }

}
