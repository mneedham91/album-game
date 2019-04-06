import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../global.service';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userID: any;
  userName: string;

  constructor(
  	private globalService: GlobalService,
  	private userService: UserService,
  	private router: Router) { }

  ngOnInit() {
    this.userID = this.globalService.getItem('userID');
    this.userService.getUser(this.userID).subscribe(user => {
  	  	this.userName = user.name;
  	});
  	this.globalService.watchStorage().subscribe(data => {
  	  this.userID = this.globalService.getItem('userID');
  	  this.userService.getUser(this.userID).subscribe(user => {
  	  	this.userName = user.name;
  	  });
  	});
  }

  login() {
  	this.router.navigate(['login']);
  }

  logout() {
  	this.globalService.removeAll();
  	this.router.navigate(['view-rounds']);
  }

}
