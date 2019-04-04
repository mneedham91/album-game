import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { ArtistService } from '../artist.service';
import { TrackService } from '../track.service';
import { Track } from '../track';

@Component({
  selector: 'app-view-track',
  templateUrl: './view-track.component.html',
  styleUrls: ['./view-track.component.css']
})
export class ViewTrackComponent implements OnInit {
  id: string;
  track: Track;

  constructor(
  	private router: Router,
    private albumService: AlbumService,
    private artistService: ArtistService,
  	private route: ActivatedRoute,
    private titleService: Title, 
    private trackService: TrackService) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | View Track');
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.trackService.getTrack(this.id).subscribe(data => {
  		this.track = data;
      this.albumService.getAlbum(this.track.album).subscribe(data => {
        this.track.album = data.name;
        this.artistService.getArtist(data.artist).subscribe(data => {
          this.track.artist = data.name;
        });
      });
  	});
  }

}
