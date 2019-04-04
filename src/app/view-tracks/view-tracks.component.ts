import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TrackService } from '../track.service';
import { Track } from '../track';

@Component({
  selector: 'app-view-tracks',
  templateUrl: './view-tracks.component.html',
  styleUrls: ['./view-tracks.component.css']
})
export class ViewTracksComponent implements OnInit {
  tracks: Track[];

  constructor(
    private titleService: Title,
    private trackService: TrackService, 
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | View Tracks');
  	this.trackService.getTracks().subscribe(data => {
  		this.tracks = data;
  	});
  }

  viewTrack(id: string): void {
    this.router.navigate(['view-track', id])
  }

}
