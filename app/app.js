import Rx from 'rxjs'

// const res$ = Rx.Observable.interval(2000)
//   .switchMap(ev => Rx.Observable.ajax({
//     url: 'https://jsonplaceholder.typicode.com/users/1',
//     method: 'GET',
//   }))

// res$.subscribe(data => console.log(data))

const resume$ = new Rx.Subject()

const res$ = resume$
  .switchMap(resume => resume ?
                          Rx.Observable.interval(2000) : // after pause, the new one will always start from 0
                          Rx.Observable.empty() // empty stream, nothing to map through
            )
  .do(x => console.log('request it! ' + x))
  .switchMap(ev => Rx.Observable.ajax({
    url: 'https://jsonplaceholder.typicode.com/users/1',
    method: 'GET',
  }))

res$.subscribe(data => console.log(data))

resume$.next(false)
setTimeout(() => resume$.next(true), 500)
setTimeout(() => resume$.next(false), 5000)
