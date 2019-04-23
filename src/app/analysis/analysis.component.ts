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
  showHide: Object;
  strict: Object;
  users: User[];

  constructor(
  	private titleService: Title,
  	private userService: UserService) { }

  ngOnInit() {
    this.showHide = new Object({
      faves: false,
      unfaves: false,
      mismatches: false});
    this.strict = new Object({
      faves: true,
      mismatches: false
    });
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

  strictFaves(val) {
    if (val == 'Yes') {
      this.strict['faves'] = true;
    } else {
      this.strict['faves'] = false;
    }
  }

  strictMismatches(val) {
    if (val == 'Yes') {
      this.strict['mismatches'] = true;
    } else {
      this.strict['mismatches'] = false;
    }
  }

  flipShowHide(section: string) {
    this.showHide[section] = !this.showHide[section];
  }

}
