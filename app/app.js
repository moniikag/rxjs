import Rx from 'rxjs'
import { Observable } from 'rxjs/Rx'

const startButton = document.querySelector('#start')
const halfButton = document.querySelector('#half');
const quarterButton = document.querySelector('#quarter');
const stopButton = document.querySelector('#stop')
const resetButton = document.querySelector('#reset')

const start$ = Observable.fromEvent(startButton, 'click')
const half$ = Observable.fromEvent(halfButton, 'click')
const quarter$ = Observable.fromEvent(quarterButton, 'click')

const interval$ = Observable.interval(1000)
const stop$ = Observable.fromEvent(stopButton, 'click')
const reset$ = Observable.fromEvent(resetButton, 'click')

const intervalThatStops$ = interval$.takeUntil(stop$)

const data = { count: 0 }
const inc = (acc) => ({ count: acc.count + 1 })
const reset = (acc) => data

const incOrRest$ = Observable.merge(
  intervalThatStops$.mapTo(inc),
  reset$.mapTo(reset)
)

const starters$ = Observable.merge(
  start$.mapTo(1000),
  half$.mapTo(500),
  quarter$.mapTo(250),
)

const intervalActions = (time) => Observable.merge(
  Observable.interval(time).takeUntil(stop$).mapTo(inc),
  reset$.mapTo(reset),
)

const timer$ = starters$
  .switchMap(intervalActions)
  .startWith(data)
  .scan((acc, curr) => curr(acc))

const input = document.querySelector('#input')
const input$ = Observable.fromEvent(input, 'input')
  .map(event => event.target.value)

// Observable.combineLatest(timer$, input$)
//   .map((array) => ({ count: array[0].count, text: array[1] }))
//   .subscribe((x) => console.log(x))

Observable.combineLatest(
  timer$.do(x => console.log(x)),
  input$,
  (timer, input) => ({ count: timer.count, text: input })
)
  // Do allows you to do side effects
  // - something that's gonna happen outside of our stream.
  .do(x => console.log(x))
  .takeWhile((data) => data.count <= 3)
  .filter(data => data.count === parseInt(data.text))
  // Reduce is accumulating stream. It's waiting till completion.
  // So is now subscribe.
  // => It'll only console log x once, with final value of reduce.
  .reduce((acc, curr) => acc + 1, 0)
  .subscribe(
    x => console.log(x),
    err => console.log(err),
    () => console.log('complete')
  )
