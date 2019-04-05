import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';

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
  	private titleService: Title) { }

  ngOnInit() {
  	this.titleService.setTitle('Album Game | Login');
  	this.reset();
  }

  onSubmit() {
  	this.authService.login(this.loginForm.value['name'], this.loginForm.value['password']).subscribe(
  	  data => {
  	  	console.log(data);
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
