import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'odo';
  public params;
  public constructor() {
  }

  public startCounter(value: number) {
    this.params = {
      end: value
    }
  }
}