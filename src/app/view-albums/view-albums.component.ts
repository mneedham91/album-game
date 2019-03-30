import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { Album } from '../album';

@Component({
  selector: 'app-view-albums',
  templateUrl: './view-albums.component.html',
  styleUrls: ['./view-albums.component.css']
})
export class ViewAlbumsComponent implements OnInit {
  albums: Album[];

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
  	this.albumService.getAlbums().subscribe( data => {
  		this.albums = data;
  	});
  }

}