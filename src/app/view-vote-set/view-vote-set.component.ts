import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VoteSetService } from '../vote-set.service';
import { VoteSet } from '../vote-set';

@Component({
  selector: 'app-view-vote-set',
  templateUrl: './view-vote-set.component.html',
  styleUrls: ['./view-vote-set.component.css']
})
export class ViewVoteSetComponent implements OnInit {
  id: string;
  voteSet: VoteSet;

  constructor(
  	private router: Router, 
  	private voteSetService: VoteSetService, 
  	private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.voteSetService.getVoteSet(this.id).subscribe(data => {
  		this.voteSet = data;
  	});
  }

}
