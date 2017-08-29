import Rx from 'rxjs'

// const x$ = new Rx.Subject()

// const click$ = Rx.Observable
//   .fromEvent(document, 'click')

// click$.subscribe({
//   next: (ev) => x$.next(ev.clientX)
// })

// x$.subscribe({
//   next: function next(x) { console.log(x) }
// })

const click$ = Rx.Observable
  .fromEvent(document, 'click')

const x$ = click$.map(ev => ev.clientX)

x$.subscribe({
  next: function next(x) { console.log(x) }
})
