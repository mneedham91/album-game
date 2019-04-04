import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { ArtistService } from '../artist.service';
import { Artist } from '../artist';
import { AlbumService } from '../album.service';
import { Album } from '../album';

@Component({
  selector: 'app-view-artist',
  templateUrl: './view-artist.component.html',
  styleUrls: ['./view-artist.component.css']
})
export class ViewArtistComponent implements OnInit {
  id: string;
  artist: Artist;
  albums: Album[];

  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | View Artist');
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.artistService.getArtist(this.id).subscribe(data => {
  		this.artist = data;
      this.albumService.getAlbums({artist: this.artist._id}).subscribe(data => {
        this.albums = data;
      })
  	});
  }

  viewAlbum(id: string): void {
    this.router.navigate(['view-album', id]);
  }

}
