import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';   

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  private storageSub = new Subject<string>();
  constructor() {}
  
  watchStorage(): Observable<any> {
  	return this.storageSub.asObservable();
  }

  setItem (key: string, data: any): void {
  	localStorage.setItem(key, data);
  	this.storageSub.next('changed');
  }

  getItem (key: string) {
  	return localStorage.getItem(key);
  }

  removeItem (key: string) {
  	localStorage.removeItem(key);
  	this.storageSub.next('changed');
  }

  removeAll () {
  	localStorage.clear();
  	this.storageSub.next('changed');
  }
}