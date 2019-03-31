import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VoteSetService } from '../vote-set.service';
import { VoteSet } from '../vote-set';

@Component({
  selector: 'app-view-vote-sets',
  templateUrl: './view-vote-sets.component.html',
  styleUrls: ['./view-vote-sets.component.css']
})
export class ViewVoteSetsComponent implements OnInit {
  voteSets: VoteSet[];

  constructor(private voteSetService: VoteSetService, private router: Router) { }

  ngOnInit() {
  	this.voteSetService.getVoteSets().subscribe(data => {
  		this.voteSets = data;
  	});
  }

  viewVoteSet(id: string): void {
    this.router.navigate(['view-vote-set', id])
  }

}
