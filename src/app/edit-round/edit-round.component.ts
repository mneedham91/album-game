import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RoundService } from '../round.service';
import { Round } from '../round';

@Component({
  selector: 'app-edit-round',
  templateUrl: './edit-round.component.html',
  styleUrls: ['./edit-round.component.css']
})
export class EditRoundComponent implements OnInit {
  editRoundForm: FormGroup;
  id: string;
  round: Round;

  constructor(
  	private formBuilder: FormBuilder,
  	private roundService: RoundService,
  	private route: ActivatedRoute,
  	private router: Router) { }

  ngOnInit() {
  	this.editRoundForm = this.formBuilder.group({
  		name: '',
  		description: '',
  		nominator: '',
  		number: ''
  	});
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.roundService.getRound(this.id).subscribe(data => {
  		this.round = data;
  		this.editRoundForm.setValue({
  			name: this.round.name,
  			description: this.round.description,
  			nominator: this.round.nominator,
  			number: this.round.number
  		});
  	});
  	
  }

  onSubmit() {
  	this.roundService.editRound(this.id, this.editRoundForm.value).subscribe( data => {
  	  this.router.navigate(['view-round', this.id]);
  	});
  }

}
