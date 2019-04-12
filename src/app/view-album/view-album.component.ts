import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { Artist } from '../artist';
import { ArtistService } from '../artist.service';
import { GlobalService } from '../global.service';
import { RoundService } from '../round.service';
import { Round } from '../round';
import { TrackService } from '../track.service';
import { Track } from '../track';
import { UserService } from '../user.service';
import { User } from '../user';
import { VoteSetService } from '../vote-set.service';
import { VoteSet } from '../vote-set';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-view-album',
  templateUrl: './view-album.component.html',
  styleUrls: ['./view-album.component.css']
})
export class ViewAlbumComponent implements OnInit {
  album: Album;
  artist: Artist;
  canEdit: boolean;
  id: string;
  img: string;
  nominator: User;
  round: Round;
  tracks: Track[];
  users: User[];
  userID: string;
  votes: VoteSet[];

  constructor(
  	private albumService: AlbumService,
    private artistService: ArtistService,
    private globalService: GlobalService, 
  	private route: ActivatedRoute,
    private router: Router, 
    private roundService: RoundService,
    private titleService: Title,
    private trackService: TrackService,
    private userService: UserService,
    private voteSetService: VoteSetService) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | View Album');
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
      this.img = '/assets/' + environment.images + this.id + '.jpg';
  	});
    this.userID = this.globalService.getItem('userID');
  	this.albumService.getAlbum(this.id).subscribe(data => {
  		this.album = data;
      if (this.album.nominator == this.userID) {
        this.canEdit = true;
      } else {
        this.canEdit = false;
      }
      this.artistService.getArtist(this.album.artist).subscribe(data => {
        this.artist = data;
      });
      this.userService.getUser(this.album.nominator).subscribe(data => {
        this.nominator = data;
      });
      this.userService.getUsers().subscribe(data => {
        this.users = data;
      })
      this.roundService.getRound(this.album.round).subscribe(data => {
        this.round = data;
      });
      this.trackService.getTracks({album: this.album._id}).subscribe(data => {
        this.tracks = data.sort((a, b) => {
          if (a.number < b.number) return -1;
          else if (a.number > b.number) return 1;
          else return 0;
        });
        this.voteSetService.getVoteSets({album: this.id}).subscribe(data => {
          this.votes = data;
          this.tracks.forEach( (track) => {
            track.votes = new Object();
            track.faves = 0;
            track.points = 0;
            track.unfave = 0;
            this.votes.forEach( (vote) => {
              if (vote.vote_one == track._id) {
                track.votes[vote.user] = 3;
                track.faves += 1;
                track.points += 3;
              } else if (vote.vote_two == track._id) {
                track.votes[vote.user] = 2;
                track.faves += 1;
                track.points += 2;
              } else if (vote.vote_three == track._id) {
                track.votes[vote.user] = 1;
                track.faves += 1;
                track.points += 1;
              } else if (vote.unfave == track._id) {
                track.votes[vote.user] = -2;
                track.unfave += 1;
                track.points -= 2;
              }
            });
          });
        });
      });
  	});
  }

  viewArtist(name: string): void {
    this.artistService.getArtists({'name': name}).subscribe(data => {
      this.router.navigate(['view-artist', data[0]._id]);
    });
  }

  viewUser(name: string): void {
    this.userService.getUsers({'name': name}).subscribe(data => {
      this.router.navigate(['view-user', data[0]._id]);
    });
  }

}
