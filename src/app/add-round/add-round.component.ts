import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { RoundService } from '../round.service';
import { UserService } from '../user.service';
import { User } from '../user'

@Component({
  selector: 'app-add-round',
  templateUrl: './add-round.component.html',
  styleUrls: ['./add-round.component.css']
})
export class AddRoundComponent implements OnInit {
  addRoundForm: FormGroup;
  users: User[];
  roundNumber: number;

  constructor(
  	private formBuilder: FormBuilder,
  	private roundService: RoundService,
  	private router: Router,
  	private titleService: Title,
  	private userService: UserService) { }

  ngOnInit() {
  	this.titleService.setTitle('Album Game | Add Round');
  	this.roundService.getRounds().subscribe(data => {
  		let sorted: any = data.sort((a, b) => {
  			if (a.number < b.number) return 1;
  			else if (a.number > b.number) return -1;
  			else return 0
  		});
  		this.roundNumber = sorted[0].number + 1;
  	});
  	this.reset();
  	this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onSubmit() {
  	this.addRoundForm.value['number'] = this.roundNumber;
  	this.roundService.createRound(this.addRoundForm.value).subscribe( data => {
  	  this.router.navigate(['view-rounds']);
  	});
  }

  reset() {
    this.addRoundForm = this.formBuilder.group({
      name: '',
      description: '',
      nominator: '',
      number: ''
    });
  }

}
