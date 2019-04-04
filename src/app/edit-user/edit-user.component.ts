import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  id: string;
  user: User;

  constructor(
  	private formBuilder: FormBuilder,
  	private userService: UserService,
  	private route: ActivatedRoute,
  	private router: Router) { }

  ngOnInit() {
  	this.editUserForm = this.formBuilder.group({
  		name: ''
  	});
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.userService.getUser(this.id).subscribe(data => {
  		this.user = data;
      this.reset();
  	});
  	
  }

  onSubmit() {
  	this.userService.editUser(this.id, this.editUserForm.value).subscribe( data => {
  	  this.router.navigate(['view-user', this.id]);
  	});
  }

  reset() {
    this.editUserForm.setValue({
        name: this.user.name
    });
  }

}
