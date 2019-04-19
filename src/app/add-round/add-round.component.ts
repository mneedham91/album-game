import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { RoundService } from '../round.service';
import { Round } from '../round';
import { UserService } from '../user.service';
import { User } from '../user'

@Component({
  selector: 'app-add-round',
  templateUrl: './add-round.component.html',
  styleUrls: ['./add-round.component.css']
})
export class AddRoundComponent implements OnInit {
  addRoundForm: FormGroup;
  errorMsg: string;
  roundNumber: number;
  token: string;
  userID: string;
  users: User[];
  
  constructor(
  	private formBuilder: FormBuilder,
    private globalService: GlobalService,
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
    this.globalService.watchStorage().subscribe(data => {
      this.userID = this.globalService.getItem('userID');
      this.token = this.globalService.getItem('token');
    });
    this.token = this.globalService.getItem('token');
  }

  submit() {
    this.errorMsg = null;
    Object.keys(this.addRoundForm.controls).forEach(key => {
      let controlErrors: ValidationErrors = this.addRoundForm.get(key).errors;
      if (controlErrors != null) {
        this.errorMsg = 'Missing fields';
      }
    });
    if (!this.errorMsg) {
    	this.addRoundForm.value['number'] = this.roundNumber;
    	this.roundService.createRound(this.addRoundForm.value, this.token).subscribe( data => {
    	  this.router.navigate(['view-albums']);
    	});
    }
  }

  reset() {
    this.addRoundForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      nominator: ['', Validators.required],
      number: ''
    });
  }

}
