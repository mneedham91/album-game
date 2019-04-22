import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Album } from '../album';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  albums: Album[];
  choice: string;
  count: number;
  full_pairs: User[][];
  options: string[];
  simple_pairs: User[][];
  users: User[];

  constructor(
  	private titleService: Title,
  	private userService: UserService) { }

  ngOnInit() {
  	this.simple_pairs = new Array();
  	this.full_pairs = new Array();
  	this.titleService.setTitle('Album Game | Analysis');
  	this.userService.getUsers().subscribe(users => {
  		this.users = users;
  		for (let a=0; a<users.length; a++) {
  			for (let b=0; b<users.length; b++) {
  				if (users[a] != users[b]) {
  					this.full_pairs.push([users[a], users[b]]);
  					if (a < b) {
  						this.simple_pairs.push([users[a], users[b]]);
  					}
  				}
  			}
  		}
  	});
  }

}
