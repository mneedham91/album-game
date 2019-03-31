import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ArtistService } from '../artist.service';
import { Artist } from '../artist';

@Component({
  selector: 'app-view-artist',
  templateUrl: './view-artist.component.html',
  styleUrls: ['./view-artist.component.css']
})
export class ViewArtistComponent implements OnInit {
  id: string;
  artist: Artist;

  constructor(
    private router: Router,
    private artistService: ArtistService,
    private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.artistService.getArtist(this.id).subscribe(data => {
  		this.artist = data;
  	});
  }

}
