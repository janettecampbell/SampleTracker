import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SampleService {
  private styleNumberSource = new BehaviorSubject<string>("");
  currentStyleNumber = this.styleNumberSource.asObservable();

  constructor() { }

  setStyleNumber(styleNumber: string) {
    this.styleNumberSource.next(styleNumber);
  }
}
