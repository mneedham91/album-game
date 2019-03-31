import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoundService } from '../round.service';
import { Round } from '../round';

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
  	private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.roundService.getRound(this.id).subscribe(data => {
  		this.round = data;
  	});
  }

}
