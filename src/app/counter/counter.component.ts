import { Component, OnInit, Input } from '@angular/core';
import { fromEvent, Subject, timer, Observable, of } from 'rxjs';
import { switchMap, mapTo, startWith, scan, takeWhile, tap, concat, take, map } from 'rxjs/operators';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.css']
})
export class CounterComponent implements OnInit {

  public endsWith: number;
  public endsFirst: number;
  public intervalSlow = 500;
  public intervalFast = 100;
  public currentNumber: number = 0;
  public stream;

  @Input()
  set end(end: any) {
    if (end) {
      this.endsWith = end.end;
      this.endsFirst = this.currentNumber < this.endsWith ? this.endsWith - (0.1 * this.endsWith): (+this.endsWith + (0.1 * +this.endsWith));
      let timer1 = timer(0, this.intervalFast).pipe(
        mapTo(this.posOrNeg(this.endsFirst)),
        startWith(this.currentNumber),
        scan((acc: number, curr: number) => acc + curr),
        takeWhile(this.detectRange(this.endsFirst))
      );
      let timer2 = timer(0, this.intervalSlow).pipe(
        mapTo(this.posOrNeg(this.endsWith)),
        startWith(this.endsFirst),
        scan((acc: number, curr: number) => acc + curr),
        takeWhile(this.detectRange(this.endsWith))
      );
      this.stream = timer1.pipe(concat(timer2));
      this.stream.subscribe(
        val => this.currentNumber = val
      );
    }
  }

  constructor() {
  }

  ngOnInit() {
  }

  public posOrNeg(value: number) {
    return value > this.currentNumber ? 1 : -1;
  }

  public detectRange(end: number) {
    if (end > this.currentNumber) {
      return val => val <= end
    } else {
      return val => val >= end;
    }
  }
}
