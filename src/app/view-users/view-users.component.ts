import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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

  constructor(
    private titleService: Title,
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | View Users');
  	this.userService.getUsers().subscribe(data => {
  		this.users = data;
  	});
  }

  viewUser(id: string): void {
    this.router.navigate(['view-user', id])
  }

}
