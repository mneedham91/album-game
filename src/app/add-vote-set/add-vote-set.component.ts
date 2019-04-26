import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { ArtistService } from '../artist.service';
import { GlobalService } from '../global.service';
import { RoundService } from '../round.service';
import { TrackService } from '../track.service';
import { Track } from '../track';
import { UserService } from '../user.service';
import { User } from '../user';
import { VoteSetService } from '../vote-set.service';
import { VoteSet } from '../vote-set';

@Component({
  selector: 'app-add-vote-set',
  templateUrl: './add-vote-set.component.html',
  styleUrls: ['./add-vote-set.component.css']
})
export class AddVoteSetComponent implements OnInit {
  album: Album;
  errorMsg: string;
  id: string;
  token: string;
  tracks: Track[];
  userID: any;
  users: User[];
  voteForm: FormGroup;

  constructor(
  	private formBuilder: FormBuilder,
  	private albumService: AlbumService,
  	private artistService: ArtistService,
    private globalService: GlobalService,
    private roundService: RoundService,
  	private route: ActivatedRoute,
  	private router: Router,
    private titleService: Title,
    private trackService: TrackService,
    private userService: UserService,
    private voteSetService: VoteSetService) { }

  ngOnInit() {
  	this.titleService.setTitle('Album Game | Vote');
    this.reset();
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.albumService.getAlbum(this.id).subscribe(data => {
  		this.album = data;
    	this.trackService.getTracks({album: this.album._id}).subscribe(data => {
        	this.tracks = data.sort((a, b) => {
          		if (a.number < b.number) return -1;
          		else if (a.number > b.number) return 1;
          		else return 0;
        	});
      	});
      	this.artistService.getArtist(this.album.artist).subscribe(data =>{
      		this.album.artist = data.name;
      	});
      	this.userService.getUser(this.album.nominator).subscribe(data => {
      		this.album.nominator = data.name;
      	});
      	this.roundService.getRound(this.album.round).subscribe(data => {
      		this.album.round = data.name + ' (' + data.number + ')';
      	});
  		this.reset();
  	});
    this.globalService.watchStorage().subscribe(data => {
      this.userID = this.globalService.getItem('userID');
      this.token = this.globalService.getItem('token');
    });
    this.token = this.globalService.getItem('token');
    this.userID = this.globalService.getItem('userID');
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  submit() {
    this.errorMsg = null;
    Object.keys(this.voteForm.controls).forEach(key => {
      let controlErrors: ValidationErrors = this.voteForm.get(key).errors;
      if (controlErrors != null) {
        this.errorMsg = 'Incomplete entry';
      }
    });
    if (this.errorMsg == null) {
      let vote_set: VoteSet = new VoteSet();
      vote_set = this.voteForm.value;
      if ( (vote_set.vote_one == vote_set.vote_two) || (vote_set.vote_one == vote_set.vote_three) || (vote_set.vote_one == vote_set.unfave) || (vote_set.vote_two == vote_set.vote_three) || (vote_set.vote_two == vote_set.unfave) || (vote_set.vote_three == vote_set.unfave) ) {
        this.errorMsg = 'Duplicate votes';
      } else {
        vote_set.album = this.id;
    	  this.voteSetService.createVoteSet(vote_set, this.token).subscribe(data => {
    	    this.router.navigate(['view-album', this.id]);
    	  });
      }
    }
  }

  reset() {
    this.voteForm = this.formBuilder.group({
      user: [undefined, Validators.required],
      vote_one: [undefined, Validators.required],
      vote_two: [undefined, Validators.required],
      vote_three: [undefined, Validators.required],
      unfave: [undefined, Validators.required]
    });
  }

}
