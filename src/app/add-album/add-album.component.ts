import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { ArtistService } from '../artist.service';
import { Artist } from '../artist';
import { RoundService } from '../round.service';
import { Router } from '@angular/router';
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
  currentRound: string;

  constructor(
  	private albumService: AlbumService,
  	private artistService: ArtistService,
  	private formBuilder: FormBuilder,
  	private roundService: RoundService,
  	private router: Router,
  	private spotifyService: SpotifyService,
  	private titleService: Title) { }

  ngOnInit() {
  	this.titleService.setTitle('Album Game | Add Album');
  	this.roundService.getRounds().subscribe(data => {
  		let sorted: any = data.sort((a, b) => {
  			if (a.number < b.number) return 1;
  			else if (a.number > b.number) return -1;
  			else return 0
  		});
  		this.currentRound = sorted[0]._id;
  	});
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

  select(album: SpotifyAlbum) {
  	let newAlbum: Album = new Album();
  	this.artistService.getArtists( { spotify_id: album.artists[0].id } ).subscribe(data => {
  		let result: Artist[] = data;
  		if (!Array.isArray(result) || !result.length) {
  			let newArtist: Artist = new Artist();
  			newArtist.spotify_id = album.artists[0].id;
  			newArtist.name = album.artists[0].name;
  			this.artistService.createArtist(newArtist).subscribe(artist_data => {
  				newAlbum.artist = artist_data['_id'];
  			});
  		} else {
  			newAlbum.artist = data[0]._id;
  		}
  		newAlbum.name = album.name;
  		newAlbum.round = this.currentRound;
  		this.albumService.createAlbum(newAlbum).subscribe(create_data => {
  			this.router.navigate(['view-album', create_data['_id'] ]);
  		});
  	});
  }

}
