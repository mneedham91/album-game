import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { ArtistService } from '../artist.service';
import { TrackService } from '../track.service';
import { VoteSetService } from '../vote-set.service';
import { VoteSet } from '../vote-set';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-vote-set',
  templateUrl: './view-vote-set.component.html',
  styleUrls: ['./view-vote-set.component.css']
})
export class ViewVoteSetComponent implements OnInit {
  id: string;
  voteSet: VoteSet;

  constructor(
  	private albumService: AlbumService,
    private artistService: ArtistService,
    private router: Router, 
  	private voteSetService: VoteSetService, 
  	private route: ActivatedRoute,
    private titleService: Title,
    private trackService: TrackService,
    private userService: UserService) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | View Vote Set');
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.voteSetService.getVoteSet(this.id).subscribe(data => {
  		this.voteSet = data;
      this.albumService.getAlbum(this.voteSet.album).subscribe(data => {
        this.voteSet.album = data.name;
        this.artistService.getArtist(data.artist).subscribe(data => {
          this.voteSet.artist = data.name;
        });
      });
      this.userService.getUser(this.voteSet.user).subscribe(data => {
        this.voteSet.user = data.name;
      });
      this.trackService.getTrack(this.voteSet.vote_one).subscribe(data => {
        this.voteSet.vote_one = data.name;
      });
      this.trackService.getTrack(this.voteSet.vote_two).subscribe(data => {
        this.voteSet.vote_two = data.name;
      });
      this.trackService.getTrack(this.voteSet.vote_three).subscribe(data => {
        this.voteSet.vote_three = data.name;
      });
      this.trackService.getTrack(this.voteSet.unfave).subscribe(data => {
        this.voteSet.unfave = data.name;
      });
  	});
  }

}
