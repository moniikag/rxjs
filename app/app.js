import Rx from 'rxjs'
import { Observable } from 'rxjs/Rx'

const startButton = document.querySelector('#start')
const stopButton = document.querySelector('#stop')

const start$ = Observable.fromEvent(startButton, 'click')
const interval$ = Observable.interval(1000)
const stop$ = Observable.fromEvent(stopButton, 'click')
const intervalThatStops$ = interval$.takeUntil(stop$)

// .scan works like JavaScript reduce
// takes function & initializer

start$
  .switchMapTo(intervalThatStops$)
  .scan((acc) => {
    return { count: acc.count + 1 }
  }, { count: 0 })
  .subscribe(x => console.log(x))
