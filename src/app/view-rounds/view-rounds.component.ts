import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RoundService } from '../round.service';
import { Round } from '../round';

@Component({
  selector: 'app-view-rounds',
  templateUrl: './view-rounds.component.html',
  styleUrls: ['./view-rounds.component.css']
})
export class ViewRoundsComponent implements OnInit {
  rounds: Round[];

  constructor(
    private roundService: RoundService,
    private router: Router,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | View Rounds');
  	this.roundService.getRounds().subscribe(data => {
  		this.rounds = data;
  	});
  }

  viewRound(id: string): void {
    this.router.navigate(['view-round', id])
  }

}
