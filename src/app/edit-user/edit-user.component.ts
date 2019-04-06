import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GlobalService } from '../global.service';
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
  token: string;
  user: User;

  constructor(
  	private formBuilder: FormBuilder,
    private globalService: GlobalService,
  	private userService: UserService,
  	private route: ActivatedRoute,
  	private router: Router,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | Edit User');
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
    this.globalService.watchStorage().subscribe(data => {
      this.token = this.globalService.getItem('token');
    });
    this.token = this.globalService.getItem('token');
  }

  onSubmit() {
  	this.userService.editUser(this.id, this.editUserForm.value, this.token).subscribe( data => {
  	  this.router.navigate(['view-user', this.id]);
  	});
  }

  reset() {
    this.editUserForm.setValue({
        name: this.user.name
    });
  }

}
