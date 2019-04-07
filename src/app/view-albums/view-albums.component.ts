import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { RoundService } from '../round.service';
import { Round } from '../round';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-view-albums',
  templateUrl: './view-albums.component.html',
  styleUrls: ['./view-albums.component.css']
})
export class ViewAlbumsComponent implements OnInit {
  albums: Album[];
  rounds: Round[];
  rows: Object[];
  folder: string;

  constructor(
    private albumService: AlbumService,
    private roundService: RoundService,
    private router: Router,
    private titleService: Title) { }

  ngOnInit() {
    this.folder = '/assets/' + environment.images;
    this.rows = [];
    this.titleService.setTitle('Album Game | View Albums');
    this.roundService.getRounds().subscribe(data => {
      this.rounds = data;
      this.rounds.forEach(round => {
        this.albumService.getAlbums({round: round._id}).subscribe(query => {
          let row = new Object();
          row['albums'] = query;
          row['albums'].forEach(album => {
            album['img'] = this.folder + album['_id'] + '.jpg';
          });
          row['round'] = round;
          row['round'].img = this.folder + row['round']._id + '.png';
          this.rows.push(row);
        });
      });
    });
  }

  viewAlbum(id: string): void {
    this.router.navigate(['view-album', id])
  }

}
