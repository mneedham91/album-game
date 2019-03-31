import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TrackService } from '../track.service';
import { Track } from '../track';

@Component({
  selector: 'app-view-track',
  templateUrl: './view-track.component.html',
  styleUrls: ['./view-track.component.css']
})
export class ViewTrackComponent implements OnInit {
  id: string;
  track: Track;

  constructor(
  	private router: Router, 
  	private trackService: TrackService, 
  	private route: ActivatedRoute) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.trackService.getTrack(this.id).subscribe(data => {
  		this.track = data;
  	});
  }

}
