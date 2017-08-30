import Rx from 'rxjs'

const click$ = Rx.Observable.fromEvent(document, 'click')

const tickWhenClick$ = click$
  // .flatMap(ev => Rx.Observable.interval(500)) // DEALS WITH ALL THE PREVIOUS STREAMS SIMULTANOUSLY
  .switchMap(ev => Rx.Observable.interval(500))  // UNSUBSCRIBES PREVIOUS ONE

tickWhenClick$.subscribe(x => console.log(x))
