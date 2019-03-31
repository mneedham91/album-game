import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  id: string;
  user: User;

  constructor(
  	private router: Router, 
  	private userService: UserService, 
  	private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.userService.getUser(this.id).subscribe(data => {
  		this.user = data;
  	});
  }

}
