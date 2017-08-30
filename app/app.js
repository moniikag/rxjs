import Rx from 'rxjs'

// const userData$ = Rx.Observable.ajax({
//   url: 'https://jsonplaceholder.typicode.com/users/1',
//   method: 'GET',
// })

// const click$ = Rx.Observable.fromEvent(document, 'click')

// click$.subscribe({
//   next: (ev) => {
//     userData$.subscribe({
//       next: (data) => console.log(data.response)
//     })
//   }
// })

// 1st click
// 2nd response

// ---------------------

// const userData$ = Rx.Observable.ajax({
//   url: 'https://jsonplaceholder.typicode.com/users/1',
//   method: 'GET',
// })

// const click$ = Rx.Observable.fromEvent(document, 'click')

// const responseWhenClick$$ = click$
//   .map(ev => userData$)

// responseWhenClick$$.subscribe({
//   next: (res$) => {
//     res$.subscribe({
//       next: (data) => console.log(data.response)
//     })
//   }
// })


/*
----c-------------------c------
    \                   \
    ------r----          -----r----
                mergeAll
----------r-------------------r----
*/

const userData$ = Rx.Observable.ajax({
  url: 'https://jsonplaceholder.typicode.com/users/1',
  method: 'GET',
})

const click$ = Rx.Observable.fromEvent(document, 'click')

const responseWhenClick$ = click$ // click$.mergeMap(ev => userData$)
  .map(ev => userData$)
  .mergeAll()

responseWhenClick$.subscribe({
  next: (data) => console.log(data.response)
})
