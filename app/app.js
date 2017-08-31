import Rx from 'rxjs'

const length$ = Rx.Observable.of(5)
const width$ = Rx.Observable.of(7)
const height$ = Rx.Observable.of(2.8, 2.5)

const volume$ = Rx.Observable
  // .zip(length$, width$, height$,
  .combineLatest(length$, width$, height$,
    (length, width, height) => length * width * height
  )
// .zip works in a synchronised manner.
// It waits for the second value for each element. If we receive
// a second value e.g. for only one observable, then it won't update

volume$.subscribe(volume => console.log(volume))
