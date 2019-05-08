import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';
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
  errorMsg: string;
  folder: string;
  ratings: Rating[];
  theseRatings: number[];
  token: string;
  userID: string;

  constructor(
  	private albumService: AlbumService,
  	private globalService: GlobalService,
  	private ratingService: RatingService,
  	private titleService: Title) { }

  ngOnInit() {
  	this.folder = environment.images;
  	this.titleService.setTitle('Album Game | Rate Albums');
  	this.userID = this.globalService.getItem('userID');
  	this.albums = [];
    this.globalService.watchStorage().subscribe(data => {
      this.token = this.globalService.getItem('token');
    });
    this.token = this.globalService.getItem('token');
  	this.ratingService.getRatings({user: this.userID}).subscribe(
  	  data => {
  	  	this.ratings = data;
        this.theseRatings = [this.getRandomInt(data.length), this.getRandomInt(data.length)];
  	    this.albumService.getAlbum(this.ratings[this.theseRatings[0]].album).subscribe(output => {
  	      let album = output;
  	      album.art = this.folder + album._id + '.jpg';
  		  this.albums.push(album);
  		});
  		this.albumService.getAlbum(this.ratings[this.theseRatings[1]].album).subscribe(output => {
  		  let album = output;
  		  album.art = this.folder + album._id + '.jpg';
  		  this.albums.push(album);
  		});
  	  },
  	  error => {
  	  	this.errorMsg = error;
  	  }
  	);
  }

  getRandomInt(max) {
  	return Math.floor(Math.random() * Math.floor(max));
  }

  // Probability that album 1 wins
  probability(rating1, rating2) {
  	let result = 1 / (1 + Math.pow(10, (rating2 - rating1) / 400) )
  	return result;
  }

  updateRatings() {
  	let one = new Object();
  	one['rating'] = this.ratings[this.theseRatings[0]].rating;
  	one['count'] = this.ratings[this.theseRatings[0]].count += 1;
  	let two = new Object();
	  two['rating'] = this.ratings[this.theseRatings[1]].rating;
	  two['count'] = this.ratings[this.theseRatings[1]].count += 1;
	  let result = forkJoin(
	    this.ratingService.editRating(this.ratings[this.theseRatings[0]]._id, one, this.token),
	    this.ratingService.editRating(this.ratings[this.theseRatings[1]]._id, two, this.token)
	  ).subscribe(
	    output => { location.reload() },
	    error => { this.errorMsg = error }
	  );
  }

  click(id) {
    let probA = this.probability(this.ratings[this.theseRatings[0]].rating, this.ratings[this.theseRatings[1]].rating);
    let probB = this.probability(this.ratings[this.theseRatings[1]].rating, this.ratings[this.theseRatings[0]].rating);
  	if (this.albums[0]._id == id) {
  		this.ratings[this.theseRatings[0]].rating += 32 * (1 - probA);
  		this.ratings[this.theseRatings[1]].rating += 32 * (0 - probB);
  		this.updateRatings();
  		this.pass();
  	} else if (this.albums[1]._id == id) {
  		this.ratings[this.theseRatings[0]].rating += 32 * (0 - probA);
  		this.ratings[this.theseRatings[1]].rating += 32 * (1 - probB);
  		this.updateRatings();
  		this.pass();
  	} else {
  		this.errorMsg = 'Selection error';
  	}
  }

  tie() {
    let probA = this.probability(this.ratings[this.theseRatings[0]].rating, this.ratings[this.theseRatings[1]].rating);
    let probB = this.probability(this.ratings[this.theseRatings[1]].rating, this.ratings[this.theseRatings[0]].rating);
    this.ratings[this.theseRatings[0]].rating += 32 * (0.5 - probA);
    this.ratings[this.theseRatings[1]].rating += 32 * (0.5 - probB);
    this.updateRatings();
    this.pass();
  }

  pass() {
  	location.reload();
  }

}
