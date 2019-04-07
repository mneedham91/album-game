import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ArtistService } from '../artist.service';
import { Artist } from '../artist';

@Component({
  selector: 'app-view-artists',
  templateUrl: './view-artists.component.html',
  styleUrls: ['./view-artists.component.css']
})
export class ViewArtistsComponent implements OnInit {
  artists: Artist[];

  constructor(
    private artistService: ArtistService, 
    private router: Router,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | View Artists');
  	this.artistService.getArtists().subscribe(data => {
  	  this.artists = data;
      this.artists.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        } else if (a.name > b.name) {
          return 1;
        } else {
          return 0;
        }
      });
  	});
  }

  viewArtist(id: string): void {
    this.router.navigate(['view-artist', id]);
  }

}
