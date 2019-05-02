import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { GlobalService } from '../global.service';
import { RatingService } from '../rating.service';
import { Rating } from '../rating';

@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  albums: Album[];
  userID: string;

  constructor(
  	private albumService: AlbumService,
  	private globalService: GlobalService,
  	private ratingService: RatingService,
  	private titleService: Title) { }

  ngOnInit() {
  	this.titleService.setTitle('Album Game | Rate Albums');
  	this.userID = this.globalService.getItem('userID');
  	this.ratingService.getRatings({user: this.userID, count: 0}).subscribe(data => {
  		this.albumService.getAlbum(data[0]._id).subscribe(album => {
  			this.albums.push(album);
  		});
  		this.albumService.getAlbum(data[1]._id).subscribe(album => {
  			this.albums.push(album);
  		});
  	});
  }

}
