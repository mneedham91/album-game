import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { TrackService } from '../track.service';
import { Track } from '../track';
import { UserService } from '../user.service';
import { VoteSetService } from '../vote-set.service';
import { VoteSet } from '../vote-set';

@Component({
  selector: 'app-edit-vote-set',
  templateUrl: './edit-vote-set.component.html',
  styleUrls: ['./edit-vote-set.component.css']
})
export class EditVoteSetComponent implements OnInit {
  editVoteSetForm: FormGroup;
  id: string;
  vote_set: VoteSet;
  tracks: Track[];

  constructor(
    private albumService: AlbumService,
    private formBuilder: FormBuilder,
  	private route: ActivatedRoute,
  	private router: Router, 
    private titleService: Title,
    private trackService: TrackService,
    private userService: UserService,
    private voteSetService: VoteSetService) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | Edit Vote Set');
  	this.editVoteSetForm = this.formBuilder.group({
  		vote_one: '',
  		vote_two: '',
  		vote_three: '',
  		unfave: '',
  	});
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.voteSetService.getVoteSet(this.id).subscribe(data => {
  		this.vote_set = data;
      this.trackService.getTracks({album: this.vote_set.album}).subscribe(data => {
        this.tracks = data.sort((a, b) => {
          if (a.number < b.number) return -1;
          else if (a.number > b.number) return 1;
          else return 0;
        });
      });
      this.albumService.getAlbum(this.vote_set.album).subscribe(data => {
        this.vote_set.album = data.name;
      });
      this.userService.getUser(this.vote_set.user).subscribe(data => {
        this.vote_set.user = data.name;
      });
  		this.reset();
  	});
    
  }

  onSubmit() {
  	this.voteSetService.editVoteSet(this.id, this.editVoteSetForm.value).subscribe( data => {
  	  this.router.navigate(['view-vote-set', this.id]);
  	});
  }

  reset() {
    this.editVoteSetForm.setValue({
      vote_one: this.vote_set.vote_one,
      vote_two: this.vote_set.vote_two,
      vote_three: this.vote_set.vote_three,
      unfave: this.vote_set.unfave,
    });

  }

}
