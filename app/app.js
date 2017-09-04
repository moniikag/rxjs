import Rx from 'rxjs'

// Each operates on all elements of Observable

// const clock$ = Rx.Observable.interval(1000).take(6)

// clock$.subscribe(x => console.log('A: ' + x))

// setTimeout(() => { clock$.subscribe(x => console.log('  B: ' + x))
// }, 2500)

// Observable is shared by subscribers.
// It does not invoke new execution of Observable, uses the shared one.

const clock$ = Rx.Observable.interval(1000).take(6).share()

clock$.subscribe(x => console.log('A: ' + x))

setTimeout(() => { clock$.subscribe(x => console.log('  B: ' + x))
}, 2500)
