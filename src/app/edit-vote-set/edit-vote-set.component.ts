import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder,
  	private voteSetService: VoteSetService,
  	private route: ActivatedRoute,
  	private router: Router) { }

  ngOnInit() {
  	this.editVoteSetForm = this.formBuilder.group({
  		album: '',
  		user: '',
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
  		this.editVoteSetForm.setValue({
  			album: this.vote_set.album,
  			user: this.vote_set.user,
  			vote_one: this.vote_set.vote_one,
  			vote_two: this.vote_set.vote_two,
  			vote_three: this.vote_set.vote_three,
  			unfave: this.vote_set.unfave,
  		});
  	});
  	
  }

  onSubmit() {
  	this.voteSetService.editVoteSet(this.id, this.editVoteSetForm.value).subscribe( data => {
  	  this.router.navigate(['view-vote-set', this.id]);
  	});
  }

}
