import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-vote-set',
  templateUrl: './add-vote-set.component.html',
  styleUrls: ['./add-vote-set.component.css']
})
export class AddVoteSetComponent implements OnInit {

  constructor(
  	private titleService: Title) { }

  ngOnInit() {
  	this.titleService.setTitle('Album Game | Add Vote Set');
  }

}
