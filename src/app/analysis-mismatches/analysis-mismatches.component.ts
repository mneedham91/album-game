import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../album';
import { AnalysisService } from '../analysis.service';
import { User } from '../user';

@Component({
  selector: 'app-analysis-mismatches',
  templateUrl: './analysis-mismatches.component.html',
  styleUrls: ['./analysis-mismatches.component.css']
})
export class AnalysisMismatchesComponent implements OnInit {
  albums: Album[];
  show: boolean;
  @Input() user_one: User;
  @Input() user_two: User;

  constructor(private analysisService: AnalysisService) { }

  ngOnInit() {
  	this.show = false;
  	this.analysisService.findSameFaves(this.user_one._id, this.user_two._id).subscribe(albums => {
  		this.albums = albums;
  	});
  }

  showHide() {
  	this.show = !this.show;
  }

}
