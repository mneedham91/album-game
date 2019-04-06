import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GlobalService } from '../global.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ArtistService } from '../artist.service';
import { Artist } from '../artist';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent implements OnInit {
  artist: Artist;
  editArtistForm: FormGroup;
  id: string;
  token: string;

  constructor(
  	private formBuilder: FormBuilder,
    private globalService: GlobalService,
  	private artistService: ArtistService,
  	private route: ActivatedRoute,
  	private router: Router,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | Edit Artist');
  	this.editArtistForm = this.formBuilder.group({
  		name: '',
  	});
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.artistService.getArtist(this.id).subscribe(data => {
  		this.artist = data;
  		this.reset();
  	});
    this.globalService.watchStorage().subscribe(data => {
      this.token = this.globalService.getItem('token');
    });
    this.token = this.globalService.getItem('token');
  }

  onSubmit() {
  	this.artistService.editArtist(this.id, this.editArtistForm.value, this.token).subscribe( data => {
  	  this.router.navigate(['view-artist', this.id]);
  	});
  }

  reset() {
    this.editArtistForm.setValue({
      name: this.artist.name,
    });
  }

}
