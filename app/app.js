import Rx from 'rxjs'
import { Observable } from 'rxjs/Rx'

const startButton = document.querySelector('#start')
const stopButton = document.querySelector('#stop')

const start$ = Observable.fromEvent(startButton, 'click')
const interval$ = Observable.interval(1000)
const stop$ = Observable.fromEvent(stopButton, 'click')
const intervalThatStops$ = interval$.takeUntil(stop$)

// intervalThatStops$.subscribe(x => console.log(x))

start$
  .switchMapTo(intervalThatStops$)
  .subscribe(x => console.log(x))
