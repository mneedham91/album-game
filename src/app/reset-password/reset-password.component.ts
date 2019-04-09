import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  errorMsg: string;
  resetPasswordForm: FormGroup;
  successMsg: string;
  token: string;

  constructor(
  	private authService: AuthService,
  	private formBuilder: FormBuilder,
  	private route: ActivatedRoute,
  	private titleService: Title) { }

  ngOnInit() {
  	this.titleService.setTitle('Album Game | Forgot Password');
  	this.route.queryParams.subscribe(params => {
  		this.token = params['token'];
  		if (!this.token) {
  			this.errorMsg = 'Invalid token!';
  		}
  	});
  	this.resetPasswordForm = this.formBuilder.group({
      password: '',
      verifypassword: ''
    });
  }

  submit() {
  	let pword = this.resetPasswordForm.value['password'];
  	let vpword = this.resetPasswordForm.value['verifypassword'];
  	this.authService.resetPassword(this.token, pword, vpword).subscribe(
  		data => {
  			this.errorMsg = null;
  			this.successMsg = 'Password successfully reset. You can now login.';
  		}, error => {
  			this.successMsg = null;
  			this.errorMsg = 'An error occured: ' + error.error.message;
  		}
  	);
  }

}
