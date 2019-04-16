import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { RoundService } from '../round.service';
import { Round } from '../round';
import { UserService } from '../user.service';
import { User } from '../user'

@Component({
  selector: 'app-edit-round',
  templateUrl: './edit-round.component.html',
  styleUrls: ['./edit-round.component.css']
})
export class EditRoundComponent implements OnInit {
  editRoundForm: FormGroup;
  editRoundImageForm: FormGroup;
  errorMsg: string;
  id: string;
  image_file: File;
  round: Round;
  token: string;
  users: User[];

  constructor(
  	private formBuilder: FormBuilder,
    private globalService: GlobalService,
  	private roundService: RoundService,
  	private route: ActivatedRoute,
  	private router: Router,
    private titleService: Title,
    private userService: UserService) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | Edit Round');
  	this.editRoundForm = this.formBuilder.group({
  		name: '',
  		description: '',
  		nominator: '',
  		number: ''
  	});
    this.editRoundImageForm = this.formBuilder.group({
      image: null
    });
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.roundService.getRound(this.id).subscribe(data => {
  		this.round = data;
  		this.reset();
  	});
  	this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
    this.globalService.watchStorage().subscribe(data => {
      this.token = this.globalService.getItem('token');
    });
    this.token = this.globalService.getItem('token');
  }

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.image_file = fileList[0];
    }
  }

  submit() {
    this.roundService.editRound(this.id, this.editRoundForm.value, this.token).subscribe(data => {
      this.router.navigate(['view-round', this.id]);
    });
  }

  imageSubmit() {
    if (this.image_file) {
      this.roundService.editRoundImage(this.id, this.image_file, this.token).subscribe(output => {
        this.router.navigate(['view-round', this.id]);
      });
    } else {
      this.errorMsg = 'No image file';
    }
  }

  reset() {
    this.editRoundForm.setValue({
      name: this.round.name,
      description: this.round.description,
      nominator: this.round.nominator,
      number: this.round.number
    });
  }

}
