import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RoundService } from '../round.service';
import { Round } from '../round';
import { UserService } from '../user.service';
import { User } from '../user'

@Component({
  selector: 'app-edit-round',
  templateUrl: './edit-round.component.html',
  styleUrls: ['./edit-round.component.css']
})
export class EditRoundComponent implements OnInit {
  editRoundForm: FormGroup;
  id: string;
  round: Round;
  token: string;
  users: User[];

  constructor(
  	private formBuilder: FormBuilder,
    private globalService: GlobalService,
  	private roundService: RoundService,
  	private route: ActivatedRoute,
  	private router: Router,
    private titleService: Title,
    private userService: UserService) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | Edit Round');
  	this.editRoundForm = this.formBuilder.group({
  		name: '',
  		description: '',
  		nominator: [''],
  		number: ''
  	});
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.roundService.getRound(this.id).subscribe(data => {
  		this.round = data;
  		this.reset();
  	});
  	this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
    this.globalService.watchStorage().subscribe(data => {
      this.token = this.globalService.getItem('token');
    });
    this.token = this.globalService.getItem('token');
  }

  onSubmit() {
  	this.roundService.editRound(this.id, this.editRoundForm.value, this.token).subscribe( data => {
  	  this.router.navigate(['view-round', this.id]);
  	});
  }

  reset() {
    this.editRoundForm.setValue({
      name: this.round.name,
      description: this.round.description,
      nominator: this.round.nominator,
      number: this.round.number
    });
  }

}
