import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { ArtistService } from '../artist.service';
import { RoundService } from '../round.service';
import { Round } from '../round';
import { UserService } from '../user.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-view-round',
  templateUrl: './view-round.component.html',
  styleUrls: ['./view-round.component.css']
})
export class ViewRoundComponent implements OnInit {
  currentRound: boolean;
  id: string;
  img: string;
  round: Round;
  albums: Album[];

  constructor(
    private albumService: AlbumService,
    private artistService: ArtistService,
  	private router: Router,
  	private roundService: RoundService,
  	private route: ActivatedRoute,
    private titleService: Title,
    private userService: UserService) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | View Round');
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
      this.img = '/assets/' + environment.images + this.id + '.png';
  	});
  	this.roundService.getRound(this.id).subscribe(data => {
  		this.round = data;
      this.userService.getUser(this.round.nominator).subscribe(data => {
        this.round.nominator = data.name
      });
      this.roundService.getRounds().subscribe(data => {
        let sorted: any = data.sort((a, b) => {
          if (a.number < b.number) return 1;
          else if (a.number > b.number) return -1;
          else return 0
        });
        if (this.round._id == sorted[0]._id) {
          this.currentRound = true;
        } else {
          this.currentRound = false;
        }
      });
  	});

    this.albumService.getAlbums({'round': this.id}).subscribe(data => {
      this.albums = data;
      for (let album of this.albums) {
        this.artistService.getArtist(album.artist).subscribe(data => {
          album.artist = data.name;
        });
      }
    });
  }

  viewAlbum(id: string): void {
    this.router.navigate(['view-album', id]);
  }

}
