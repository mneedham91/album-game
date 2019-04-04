import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-artist',
  templateUrl: './add-artist.component.html',
  styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent implements OnInit {

  constructor(
  	private titleService: Title) { }

  ngOnInit() {
  	this.titleService.setTitle('Album Game | Add Artist');
  }

}
