import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { RatingService } from '../rating.service';
import { Rating } from '../rating';
import { RoundService } from '../round.service';
import { Round } from '../round';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  albums: Album[];
  errorMsg: string;
  id: string;
  ratings: Rating[];
  ready: boolean;
  rounds: Round[];
  user: User;

  constructor(
    private albumService: AlbumService,
    private ratingService: RatingService,
  	private route: ActivatedRoute,
    private router: Router,
    private roundService: RoundService,
    private titleService: Title,
    private userService: UserService) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | View User');
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.userService.getUser(this.id).subscribe(data => {
  		this.user = data;
      this.albumService.getAlbums({nominator: this.user._id}).subscribe(output => {
        this.albums = output;
      });
      this.roundService.getRounds({nominator: this.user._id}).subscribe(output => {
        this.rounds = output;
      });
      this.ratingService.getRankedAlbums(this.user._id).subscribe(data => {
        this.ratings = data;
        for (let rating of this.ratings) {
          this.albumService.getAlbum(rating.album).subscribe(album => {
            rating.album = album.name;
          });
        }
      });
  	});
  }

  viewAlbum(id: string): void {
    this.router.navigate(['view-album', id])
  }

  viewRound(id: string): void {
    this.router.navigate(['view-round', id])
  }

}
