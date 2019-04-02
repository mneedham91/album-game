import { Component, OnInit } from '@angular/core';
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

  constructor(private artistService: ArtistService, private router: Router) { }

  ngOnInit() {
  	this.artistService.getArtists().subscribe(data => {
  	  this.artists = data;
  	});
  }

  viewArtist(id: string): void {
    this.router.navigate(['view-artist', id]);
  }

}
