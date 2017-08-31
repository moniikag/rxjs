import Rx from 'rxjs'

const dotElement = document.getElementById('dot')

const updateDot = (x, y) => {
  dotElement.style.left = `${x}px`
  dotElement.style.top = `${y}px`
}

// Rx.Observable.fromEvent(document, 'click')
//   // .do returns the same as it received,
//   // but it allows to add side effects.
//   // so it's like a map that does sth before returning unmodified ev
//   .do(ev => updateDot(ev.clientX, ev.clientY))
//   .switchMap(ev => Rx.Observable.ajax({
//     url: 'https://jsonplaceholder.typicode.com/users/1',
//     method: 'GET',
//   }))
//   .subscribe(data => console.log(data.response))

const click$ = Rx.Observable.fromEvent(document, 'click')

click$.subscribe(ev => updateDot(ev.clientX, ev.clientY))

const res$ = click$
  .switchMap(ev => Rx.Observable.ajax({
    url: 'https://jsonplaceholder.typicode.com/users/1',
    method: 'GET',
  }))

res$.subscribe(data => console.log(data.response))

// use 'do' for debugging
