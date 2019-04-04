import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(
  	private titleService: Title) { }

  ngOnInit() {
  	this.titleService.setTitle('Album Game | Add User');
  }

}
