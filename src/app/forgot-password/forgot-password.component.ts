import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  errorMsg: string;
  successMsg: string;

  constructor(
  	private authService: AuthService,
  	private formBuilder: FormBuilder,
  	private titleService: Title) { }

  ngOnInit() {
  	this.titleService.setTitle('Album Game | Forgot Password');
  	this.forgotPasswordForm = this.formBuilder.group({
      name: ''
    });
  }

  submit() {
  	this.authService.forgotPassword(this.forgotPasswordForm.value['name']).subscribe(
  		data => {
  			this.errorMsg = null;
  			this.successMsg = 'You should receive an email with instructions';
  		}, error => {
  			this.successMsg = null;
  			this.errorMsg = 'An error occured: ' + error.error.message;
  		}
  	);
  }

}
