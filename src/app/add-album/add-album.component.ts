import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { ArtistService } from '../artist.service';
import { Artist } from '../artist';
import { GlobalService } from '../global.service';
import { RoundService } from '../round.service';
import { Router } from '@angular/router';
import { SpotifyService } from '../spotify.service';
import { SpotifyAlbumSearchResult, ItemsEntity } from '../spotify-album-search-result';
import { SpotifyTracksSearchResult } from '../spotify-tracks-search-result';
import { TrackService } from '../track.service';
import { Track } from '../track';

@Component({
  selector: 'app-add-album',
  templateUrl: './add-album.component.html',
  styleUrls: ['./add-album.component.css']
})
export class AddAlbumComponent implements OnInit {
  albums: ItemsEntity[];
  currentRound: string;
  errorMsg: string;
  spotify_token: string;
  spotifyResults: SpotifyAlbumSearchResult;
  spotifySearchAlbumForm: FormGroup;
  spotifyTracksResult: SpotifyTracksSearchResult;
  token: string;
  userID: any;

  constructor(
  	private albumService: AlbumService,
  	private artistService: ArtistService,
  	private formBuilder: FormBuilder,
    private globalService: GlobalService,
  	private roundService: RoundService,
  	private router: Router,
  	private spotifyService: SpotifyService,
  	private titleService: Title,
    private trackService: TrackService) { }

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
  		this.spotify_token = data['access_token'];
  	});
    this.userID = this.globalService.getItem('userID');
    this.globalService.watchStorage().subscribe(data => {
      this.userID = this.globalService.getItem('userID');
      this.token = this.globalService.getItem('token');
    });
    this.token = this.globalService.getItem('token');
  }

  search() {
  	this.spotifyService.lookForAlbum(this.spotify_token, this.spotifySearchAlbumForm.value['name']).subscribe( data => {
  	  this.spotifyResults = data;
  	  this.albums = this.spotifyResults.albums.items;
  	});
  }

  reset() {
    this.spotifySearchAlbumForm.setValue({
      name: '',
    });
    this.errorMsg = null;
    this.albums = null;
  }

  sort_name(name: string): string {
    if (name.startsWith('The ')) {
      return name.substring(4);
    } else {
      return name;
    }
  }

  select(album: ItemsEntity) {
    this.errorMsg = null;
  	let newAlbum: Album = new Album();
  	this.artistService.getArtists( { spotify_id: album.artists[0].id } ).subscribe(
      data => {
    		let result: Artist[] = data;
    		if (!Array.isArray(result) || !result.length) {
          // Branch One: Need to create new Artist
    			let newArtist: Artist = new Artist();
    			newArtist.spotify_id = album.artists[0].id;
    			newArtist.name = album.artists[0].name;
    			this.artistService.createArtist(newArtist, this.token).subscribe(
            artist_data => {
      				newAlbum.artist = artist_data['_id'];
              newAlbum.name = album.name;
              newAlbum.sort_name = this.sort_name(album.name);
              newAlbum.round = this.currentRound;
              newAlbum.nominator = this.userID;
              this.albumService.createAlbum(newAlbum, this.token).subscribe(
                create_data => {
                  this.spotifyService.getAlbumTracks(this.spotify_token, album.id).subscribe(
                    track_data => {
                      track_data.items.forEach(item => {
                        let newTrack: Track = new Track();
                        newTrack.name = item.name;
                        newAlbum.sort_name = this.sort_name(album.name);
                        newTrack.number = item.track_number;
                        newTrack.album = create_data['_id'];
                        newTrack.spotify_id = item.id
                        this.trackService.createTrack(newTrack, this.token).subscribe();
                       });
                    },
                    error => {
                      this.errorMsg = error.message;
                    });
                    album.images.sort((a,b) => {
                    	if (a.height < b.height) {
                    		return 1;
                    	} else {
                    		return -1;
                    	}
                    });
                    this.spotifyService.downloadImage(album.images[0].url, create_data['_id']).subscribe();
                  this.router.navigate(['view-album', create_data['_id'] ]);
              },
              error => {
                this.errorMsg = error.message;
              });
    			},
          error => {
            this.errorMsg = error.message;
          });
    		} else {
          // Branch Two: Artist already exists
    			newAlbum.artist = data[0]._id;
  	        newAlbum.name = album.name;
  	        newAlbum.round = this.currentRound;
  	        newAlbum.nominator = this.userID;
  	        this.albumService.createAlbum(newAlbum, this.token).subscribe(
              create_data => {
    	          this.spotifyService.getAlbumTracks(this.spotify_token, album.id).subscribe(
                  track_data => {
      	            track_data.items.forEach(item => {
      	              let newTrack: Track = new Track();
      	              newTrack.name = item.name;
      	              newTrack.number = item.track_number;
      	              newTrack.album = create_data['_id'];
      	              newTrack.spotify_id = item.id
      	              this.trackService.createTrack(newTrack, this.token).subscribe();
      	            });
    	          },
                error => {
                  this.errorMsg = error.message;
                });
                  album.images.sort((a,b) => {
                  	if (a.height < b.height) {
                  		return 1;
                  	} else {
                  		return -1;
                  	}
                  });
                  this.spotifyService.downloadImage(album.images[0].url, create_data['_id']).subscribe();
    	          this.router.navigate(['view-album', create_data['_id'] ]);
  	        },
            error => {
              this.errorMsg = error.message;
            });
    		}
  	},
    error => {
      this.errorMsg = error.message;
    });
  }
}
