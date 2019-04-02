import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoundService } from '../round.service';
import { Round } from '../round';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-round',
  templateUrl: './view-round.component.html',
  styleUrls: ['./view-round.component.css']
})
export class ViewRoundComponent implements OnInit {
  id: string;
  round: Round;

  constructor(
  	private router: Router,
  	private roundService: RoundService,
  	private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.roundService.getRound(this.id).subscribe(data => {
  		this.round = data;
      this.userService.getUser(this.round.nominator).subscribe(data => {
        this.round.nominator = data.name
      });
  	});
  }

}
