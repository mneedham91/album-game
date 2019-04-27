import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Album } from '../album';
import { AnalysisService } from '../analysis.service';
import { Track } from '../track';
import { User } from '../user';

@Component({
  selector: 'app-analysis-comparison',
  templateUrl: './analysis-comparison.component.html',
  styleUrls: ['./analysis-comparison.component.css']
})
export class AnalysisComparisonComponent implements OnInit {
  albums: Album[];
  count: number[];
  data: [number, Album][];
  errorMsg: string;
  show: boolean;
  total: number;
  @Input() option: string;
  @Input() user_one: User;
  @Input() user_two: User;
  @Input() strict: boolean;

  constructor(private analysisService: AnalysisService) { }

  ngOnInit() {
  	this.show = false;
  	this.getData();
  }

  ngOnChanges() {
    this.count = undefined;
    this.total = undefined;
    this.data = undefined;  
    this.getData();
  }

  getData() {
    if (this.option == 'Faves') {
      if (this.strict) {
        this.analysisService.findSameFavesStrict(this.user_one._id, this.user_two._id).subscribe(
          data => this.albums = data,
          error => this.errorMsg = error
        );
      } else {
        this.analysisService.findSameFaves(this.user_one._id, this.user_two._id).subscribe(
          data => {
            this.count = data.map(entry => { return entry[0] });
            this.data = data;
            this.total = this.count.reduce((partial_sum, a) => partial_sum + a);
          },
          error => {
            this.errorMsg = error;
          }
        );
      }
    } else if (this.option == 'Unfaves') {
      this.analysisService.findSameUnfaves(this.user_one._id, this.user_two._id).subscribe(
        data => this.albums = data,
        error => this.errorMsg = error
      );
    } else if (this.option == 'Mismatches') {
      this.analysisService.findMismatchVotes(this.user_one._id, this.user_two._id, this.strict).subscribe(
        data => this.albums = data,
        error => this.errorMsg = error
      );
    }  
  }

  showHide() {
  	this.show = !this.show;
  }

}
