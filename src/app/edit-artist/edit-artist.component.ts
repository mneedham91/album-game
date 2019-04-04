import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ArtistService } from '../artist.service';
import { Artist } from '../artist';

@Component({
  selector: 'app-edit-artist',
  templateUrl: './edit-artist.component.html',
  styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent implements OnInit {
  editArtistForm: FormGroup;
  id: string;
  artist: Artist;

  constructor(
  	private formBuilder: FormBuilder,
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
  	
  }

  onSubmit() {
  	this.artistService.editArtist(this.id, this.editArtistForm.value).subscribe( data => {
  	  this.router.navigate(['view-artist', this.id]);
  	});
  }

  reset() {
    this.editArtistForm.setValue({
      name: this.artist.name,
    });
  }

}
