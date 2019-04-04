import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-edit-album',
  templateUrl: './edit-album.component.html',
  styleUrls: ['./edit-album.component.css']
})
export class EditAlbumComponent implements OnInit {
  editAlbumForm: FormGroup;
  id: string;
  album: Album;

  constructor(
  	private formBuilder: FormBuilder,
  	private albumService: AlbumService,
  	private route: ActivatedRoute,
  	private router: Router) { }

  ngOnInit() {
  	this.editAlbumForm = this.formBuilder.group({
  		artist: '',
  		date: '',
  		name: '',
  		nominator: '',
  		round: ''
  	});
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.albumService.getAlbum(this.id).subscribe(data => {
  		this.album = data;
  		let date = new DatePipe(navigator.language).transform(this.album.date, 'y-MM-dd');
  		this.editAlbumForm.setValue({
  			artist: this.album.artist,
  			date: date,
  			name: this.album.name,
  			nominator: this.album.nominator,
  			round: this.album.round
  		});
  	});
  	
  }

  onSubmit() {
  	let date = new DatePipe(navigator.language).transform(this.editAlbumForm.value['date'], 'MM-dd-y');
  	this.editAlbumForm.controls['date'].setValue(date);
  	this.albumService.editAlbum(this.id, this.editAlbumForm.value).subscribe( data => {
  	  this.router.navigate(['view-album', this.id]);
  	});
  }

}
