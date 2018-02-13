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

// combineLatest waits until it gets at least one element for each of
// combined streams (so one can go forever if nothing happens in the other ones)
// before moving further

timer$
  .do(x => console.log(x))
  .takeWhile((data) => data.count <= 3)
  .withLatestFrom( //now timer is going to take the latest value from input$ and not gonna wait for it to complete
    input$,
    (timer, input) => ({ count: timer.count, text: input })
  )
  .filter(data => data.count === parseInt(data.text))
  // Reduce is accumulating stream. It's waiting till completion.
  // So is now subscribe.
  // => It'll only console log x once, with final value of reduce.
  .reduce((acc, curr) => acc + 1, 0)
  .repeat() // you cannot restart a stream, but you can repeat
            // => now the stream is never completing. it gets to subscribe block, gives us x and resubscribes to our initial stream
  .subscribe(
    x => document.querySelector('#score').innerHTML = `${x}`,
    err => console.log(err),
    () => console.log('complete')
  )
