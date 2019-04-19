import { Component, OnInit } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  deviceInfo = null;
  isMobile: boolean;
  title = 'album-game';

  constructor(private deviceService: DeviceDetectorService) { }

  ngOnInit() {
  	this.deviceInfo = this.deviceService.getDeviceInfo();
  	this.isMobile = this.deviceService.isMobile();
  }
}
