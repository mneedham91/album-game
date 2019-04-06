import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { GlobalService } from '../global.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg: string;

  constructor(
  	private authService: AuthService,
  	private formBuilder: FormBuilder,
    private globalService: GlobalService,
    private router: Router,
  	private titleService: Title,
    private userService: UserService) { }

  ngOnInit() {
  	this.titleService.setTitle('Album Game | Login');
  	this.reset();
  }

  onSubmit() {
  	this.authService.login(this.loginForm.value['name'], this.loginForm.value['password']).subscribe(
  	  data => {
        this.globalService.setItem('token', data.token);
        this.userService.getUser(data.id).subscribe(data => {
          this.globalService.setItem('userID', data._id);
        });
        this.router.navigate(['view-rounds']);
  	  }, 
  	  err => {
  	  	this.errorMsg = 'Login error. Please try again';
  	  }
  	);
  }

  reset() {
  	this.loginForm = this.formBuilder.group({
      name: '',
      password: ''
    });
  }

}
