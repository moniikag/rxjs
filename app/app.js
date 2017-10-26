import Rx from 'rxjs'
import { Observable } from 'rxjs/Rx'

const startButton = document.querySelector('#start')
const stopButton = document.querySelector('#stop')

const start$ = Observable.fromEvent(startButton, 'click')
const interval$ = Observable.interval(1000)
const stop$ = Observable.fromEvent(stopButton, 'click')
const intervalThatStops$ = interval$.takeUntil(stop$)


const data = { count: 0 }
const inc = (acc) => ({ count: acc.count + 1 })
const reset = (acc) => data

// .scan receives:
// 1) accumulator,
// 2) current value - which we can set to a function i.e. by using .mapTo

start$
  .switchMapTo(intervalThatStops$)
  .mapTo(inc)
  .startWith(data)
  .scan((acc, curr) => curr(acc))
  .subscribe(x => console.log(x))
