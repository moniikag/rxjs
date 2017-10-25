import Rx from 'rxjs'
import { Observable } from 'rxjs/Rx'

const startButton = document.querySelector('#start')

// switchMap here switches us over to another Observable
// you can still access click event, e.g.:
// .switchMap((event) => Obeservable.interval(event.x))

// Observable.fromEvent(startButton, 'click')
//   .switchMap(() => Observable.interval(1000))
//   .subscribe((x) => console.log(x))

const start$ = Observable.fromEvent(startButton, 'click')
const interval$ = Observable.interval(1000)
// You can use switchMapTo instead of switchMap with arrow function
// const startInterval$ = start$.switchMap(() => interval$)
const startInterval$ = start$.switchMapTo(interval$)

startInterval$
  .subscribe((x) => console.log(x))
