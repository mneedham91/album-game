import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  	this.userService.getUsers().subscribe(data => {
  		this.users = data;
  	});
  }

  viewUser(id: string): void {
    this.router.navigate(['view-user', id])
  }

}
