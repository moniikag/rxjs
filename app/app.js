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

// .startWith will pass the initial data as scan's acc
// will fire one time with 0 instead of waiting for start
// might be useful e.g. for timers which we want to initialize with 0

const data = { count: 0 }

start$
  .switchMapTo(intervalThatStops$)
  .startWith(data)
  .scan((acc) => {
    return { count: acc.count + 1 }
  })
  .subscribe(x => console.log(x))
