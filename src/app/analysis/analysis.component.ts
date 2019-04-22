import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css']
})
export class AnalysisComponent implements OnInit {
  analysisForm: FormGroup;
  choice: string;
  options: string[];
  users: User[];
  x: string;

  constructor(
  	private formBuilder: FormBuilder,
  	private titleService: Title,
  	private userService: UserService) { }

  ngOnInit() {
  	this.titleService.setTitle('Album Game | Analysis');
  	this.options = ['Faves', 'Unfaves', 'Disagreements'];
  	this.userService.getUsers().subscribe(users => {
  		this.users = users;
  	});
  	this.analysisForm = this.formBuilder.group({
  		option: '',
  		user_one: '',
  		user_two: ''
  	});
  }

  submit() {
  	this.choice = this.analysisForm.value['option'];
  	switch (this.choice) {
  		case 'Faves':
  			this.x = 'F';
  			break;
  		case 'Unfaves':
  			this.x = 'U';
  			break;
  		case 'Disagreements':
  			this.x = 'D';
  			break;
  	}
  }

}
