import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { TrackService } from '../track.service';
import { Track } from '../track';

@Component({
  selector: 'app-edit-track',
  templateUrl: './edit-track.component.html',
  styleUrls: ['./edit-track.component.css']
})
export class EditTrackComponent implements OnInit {
  editTrackForm: FormGroup;
  id: string;
  track: Track;

  constructor(
  	private formBuilder: FormBuilder,
  	private trackService: TrackService,
  	private route: ActivatedRoute,
  	private router: Router) { }

  ngOnInit() {
  	this.editTrackForm = this.formBuilder.group({
  		album: '',
  		name: '',
  		number: '',
  	});
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.trackService.getTrack(this.id).subscribe(data => {
  		this.track = data;
  		this.reset();
  	});
  	
  }

  onSubmit() {
  	this.trackService.editTrack(this.id, this.editTrackForm.value).subscribe( data => {
  	  this.router.navigate(['view-track', this.id]);
  	});
  }

  reset() {
    this.editTrackForm.setValue({
      album: this.track.album,
      name: this.track.name,
      number: this.track.number,
    });
  }

}
