import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Album } from '../album';
import { AnalysisService } from '../analysis.service';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  albums: Album[];
  analysisForm: FormGroup;
  choice: string;
  count: number;
  options: string[];
  pairs: User[][];
  users: User[];

  constructor(
  	private analysisService: AnalysisService,
  	private formBuilder: FormBuilder,
  	private titleService: Title,
  	private userService: UserService) { }

  ngOnInit() {
  	this.pairs = new Array();
  	this.titleService.setTitle('Album Game | Analysis');
  	this.options = ['Faves', 'Unfaves', 'Disagreements'];
  	this.userService.getUsers().subscribe(users => {
  		this.users = users;
  		for (let a=0; a<users.length; a++) {
  			for (let b=0; b<users.length; b++) {
  				if ( (users[a] != users[b]) && (a < b) ) {
  					this.pairs.push([users[a], users[b]]);
  				}
  			}
  		}
  	});
  	this.analysisForm = this.formBuilder.group({
  		option: this.options[0],
  		user_one: '',
  		user_two: ''
  	});
  }

  submit() {
  	if (this.analysisForm.value['user_one'] && this.analysisForm.value['user_two']) {
	  	this.choice = this.analysisForm.value['option'];
	  	console.log(this.analysisForm.value);
		if (this.choice == 'Faves') {
			this.analysisService.findSameFaves(this.analysisForm.value['user_one'], this.analysisForm.value['user_two'])
			.subscribe(albums => {
				this.albums = albums;
				this.count = albums.length;
			});
	  	} else if (this.choice == 'Unfaves') {
			this.analysisService.findSameUnfaves(this.analysisForm.value['user_one'], this.analysisForm.value['user_two'])
			.subscribe(albums => {
				this.albums = albums;
				this.count = albums.length;
			});
	  	} else if (this.choice == 'Disagreements') {
			this.analysisService.findMismatchVotes(this.analysisForm.value['user_one'], this.analysisForm.value['user_two'], true)
			.subscribe(albums => {
				this.albums = albums;
				this.count = albums.length;
			});
	  	}
    }
  }

}
