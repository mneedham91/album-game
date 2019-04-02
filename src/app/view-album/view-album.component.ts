import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { ArtistService } from '../artist.service';
import { RoundService } from '../round.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-view-album',
  templateUrl: './view-album.component.html',
  styleUrls: ['./view-album.component.css']
})
export class ViewAlbumComponent implements OnInit {
  id: string;
  album: Album;

  constructor(
  	private router: Router, 
  	private albumService: AlbumService,
    private artistService: ArtistService, 
  	private route: ActivatedRoute,
    private roundService: RoundService,
    private userService: UserService) { }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.id = params['id'];
  	});
  	this.albumService.getAlbum(this.id).subscribe(data => {
  		this.album = data;
      this.artistService.getArtist(this.album.artist).subscribe(data => {
        this.album.artist = data.name;
      });
      this.userService.getUser(this.album.nominator).subscribe(data => {
        this.album.nominator = data.name;
      });
      this.roundService.getRound(this.album.round).subscribe(data => {
        this.album.round = String(data.number + ' ' + data.name);
      })
  	});
  }

  viewArtist(name: string): void {
    this.artistService.getArtists({'name': name}).subscribe(data => {
      this.router.navigate(['view-artist', data[0]._id]);
    });
  }

}
