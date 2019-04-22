import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../album';
import { AnalysisService } from '../analysis.service';
import { User } from '../user';

@Component({
  selector: 'app-analysis-comparison',
  templateUrl: './analysis-comparison.component.html',
  styleUrls: ['./analysis-comparison.component.css']
})
export class AnalysisComparisonComponent implements OnInit {
  albums: Album[];
  show: boolean;
  @Input() option: string;
  @Input() user_one: User;
  @Input() user_two: User;

  constructor(private analysisService: AnalysisService) { }

  ngOnInit() {
  	this.show = false;
  	if (this.option == 'Faves') {
  	  this.analysisService.findSameFaves(this.user_one._id, this.user_two._id).subscribe(albums => {
  	    this.albums = albums;
  	  });
  	} else if (this.option == 'Unfaves') {
  	  this.analysisService.findSameUnfaves(this.user_one._id, this.user_two._id).subscribe(albums => {
  	    this.albums = albums;
  	  });
  	} else if (this.option == 'Mismatches') {
  	  this.analysisService.findMismatchVotes(this.user_one._id, this.user_two._id, false).subscribe(albums => {
  		this.albums = albums;
  	  });
  	}
  	
  }

  showHide() {
  	this.show = !this.show;
  }

}
