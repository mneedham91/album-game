import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { User } from '../user';
import { arc, pie } from 'd3-shape';
import { entries, select, scaleOrdinal } from 'd3';

@Component({
  selector: 'app-analysis-decades',
  templateUrl: './analysis-decades.component.html',
  styleUrls: ['./analysis-decades.component.css']
})
export class AnalysisDecadesComponent implements OnInit {
  albums: Album[];
  decades: Object[];
  @Input() user: User;
  errorMsg: string;

  arc: any;
  pie: any;

  constructor(
  	private albumService: AlbumService) { }

  ngOnInit() {
  	this.decades = [];
  	for (let i=0; i<6; i++) {
  		let decade = new Object();
  		decade['start'] = new Date((1960 + 10*i).toString() + '-01-01T00:00:00.000Z');
  		decade['end'] = new Date((1969 + 10*i).toString() + '-12-31T00:00:00.000Z');
  		decade['count'] = 0;
      decade['label'] = (1960 + 10*i).toString() + 's';
  		this.decades.push(decade);
  	}
  	this.albumService.getAlbums({nominator: this.user._id}).subscribe(
  	  albums => { 
  	  	for (let decade of this.decades) {
  		    for (let album of albums) {
            if (album.date) {
              let date = new Date(album.date);
  			      if (date > decade['start'] && date < decade['end']) {
                decade['count'] += 1;
              }
            }
  		    }
  		  }
  	  },
  	  error => { this.errorMsg = error }
  	);
  }

}
