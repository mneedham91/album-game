import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../album';
import { RoundService } from '../round.service';
import { Round } from '../round';

@Component({
  selector: 'app-view-albums',
  templateUrl: './view-albums.component.html',
  styleUrls: ['./view-albums.component.css']
})
export class ViewAlbumsComponent implements OnInit {
  albums: Album[];
  rounds: Round[];
  rows: Object[];

  constructor(
    private albumService: AlbumService,
    private roundService: RoundService,
    private router: Router,
    private titleService: Title) { }

  ngOnInit() {
    this.rows = [];
    this.titleService.setTitle('Album Game | View Albums');
    this.roundService.getRounds().subscribe(data => {
      this.rounds = data;
      this.rounds.forEach(round => {
        this.albumService.getAlbums({round: round._id}).subscribe(query => {
          let row = new Object();
          row['albums'] = query;
          row['round'] = round;
          this.rows.push(row);
        });
      });
    });
  }

  viewAlbum(id: string): void {
    this.router.navigate(['view-album', id])
  }

}
