import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { GlobalService } from '../global.service';
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
  token: string;
  track: Track;
  albums: Album[];

  constructor(
    private albumService: AlbumService,
  	private formBuilder: FormBuilder,
    private globalService: GlobalService,
  	private trackService: TrackService,
  	private route: ActivatedRoute,
  	private router: Router,
    private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | Edit Track');
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
  	this.albumService.getAlbums().subscribe(data => {
      this.albums = data.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
      });
    });
    this.globalService.watchStorage().subscribe(data => {
      this.token = this.globalService.getItem('token');
    });
    this.token = this.globalService.getItem('token');
  }

  onSubmit() {
  	this.trackService.editTrack(this.id, this.editTrackForm.value, this.token).subscribe( data => {
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
