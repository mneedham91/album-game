import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { VoteSetService } from '../vote-set.service';
import { VoteSet } from '../vote-set';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-vote-sets',
  templateUrl: './view-vote-sets.component.html',
  styleUrls: ['./view-vote-sets.component.css']
})
export class ViewVoteSetsComponent implements OnInit {
  voteSets: VoteSet[];

  constructor(
    private albumService: AlbumService,
    private router: Router,
    private voteSetService: VoteSetService, 
    private userService: UserService) { }

  ngOnInit() {
  	this.voteSetService.getVoteSets().subscribe(data => {
  		this.voteSets = data;
      for (let voteSet of this.voteSets) {
        this.albumService.getAlbum(voteSet.album).subscribe(data => {
          voteSet.album = data.name;
        });
        this.userService.getUser(voteSet.user).subscribe(data => {
          voteSet.user = data.name;
        });
      }
  	});
  }

  viewVoteSet(id: string): void {
    this.router.navigate(['view-vote-set', id])
  }

}
