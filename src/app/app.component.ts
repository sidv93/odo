import { Component, ViewChild } from '@angular/core';
import { fromEvent, Subject,timer } from 'rxjs';
import { switchMap, mapTo, startWith, scan, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'odo';
  @ViewChild('button') load;
  public startWith = 0;
  public interval = 100;
  public currentNumber = 0;
  public counterSub$ = new Subject();

  public constructor() {
    this.counterSub$.pipe(
      switchMap(end => {
        return timer(0, this.interval).pipe(
          mapTo(this.posOrNeg(+end)),
          startWith(this.currentNumber),
          scan((acc: number , curr: number) => acc + curr),
          takeWhile(this.detectRange(+end))
        )
      })
    ).subscribe(val => this.currentNumber = val);
  }

  public startCounter(value: number) {
    console.log('number-' + value);
    this.counterSub$.next(value);
  }

  public posOrNeg(value: number) {
    return value > this.currentNumber? 1 : -1;
  }

  public detectRange(end: number) {
    if(end > this.currentNumber) {
      return val => val <= end
    } else {
      return val => val >= end;
    }
  }
}
