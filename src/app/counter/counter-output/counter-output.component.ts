import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription, Observable } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { getCounter } from 'src/app/counter/state/counter.selectors';
import { CounterState } from 'src/app/counter/state/counter.state';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css']
})
export class CounterOutputComponent implements OnInit, OnDestroy {
  counter!: number
  counterSubscription: Subscription | undefined
  counter$: Observable<CounterState> | undefined
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.counterSubscription = this.store.select(getCounter).subscribe((counter: any) => {
      console.log('Counter Observable is called ')
      this.counter = counter;
    })
    // Another approch
    // this.counter$ = this.store.select('counter');
  }
  ngOnDestroy(): void {
    if (this.counterSubscription) {
      this.counterSubscription.unsubscribe();
    }
  }
}
