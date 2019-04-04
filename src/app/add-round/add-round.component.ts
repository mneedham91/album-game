import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-round',
  templateUrl: './add-round.component.html',
  styleUrls: ['./add-round.component.css']
})
export class AddRoundComponent implements OnInit {

  constructor(
  	private titleService: Title) { }

  ngOnInit() {
  	this.titleService.setTitle('Album Game | Add Round');
  }

}
