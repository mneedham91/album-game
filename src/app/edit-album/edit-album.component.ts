import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { ArtistService } from '../artist.service';
import { Artist } from '../artist';
import { RoundService } from '../round.service';
import { Round } from '../round';
import { UserService } from '../user.service';
import { User } from '../user';
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
  artists: Artist[];
  rounds: Round[];
  users: User[];

  constructor(
  	private formBuilder: FormBuilder,
  	private albumService: AlbumService,
    private artistService: ArtistService,
  	private route: ActivatedRoute,
  	private router: Router,
    private titleService: Title,
    private roundService: RoundService,
    private userService: UserService) { }

  ngOnInit() {
    this.titleService.setTitle('Album Game | Edit Album');
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
  		this.reset();
  	});
  	this.artistService.getArtists().subscribe(data => {
      this.artists = data.sort((a, b) => {
        if (a.name < b.name) return -1;
        else if (a.name > b.name) return 1;
        else return 0;
      });
    });
    this.roundService.getRounds().subscribe(data => {
      this.rounds = data;
    });
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  onSubmit() {
  	let date = new DatePipe(navigator.language).transform(this.editAlbumForm.value['date'], 'MM-dd-y');
  	this.editAlbumForm.controls['date'].setValue(date);
  	this.albumService.editAlbum(this.id, this.editAlbumForm.value).subscribe( data => {
  	  this.router.navigate(['view-album', this.id]);
  	});
  }

  reset() {
    let date = new DatePipe(navigator.language).transform(this.album.date, 'y-MM-dd');
    this.editAlbumForm.setValue({
      artist: this.album.artist,
      date: date,
      name: this.album.name,
      nominator: this.album.nominator,
      round: this.album.round
    });
  }

}
