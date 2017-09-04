import Rx from 'rxjs'

// This gives us three executions of clock$ (for radnomNum, smallNum & for largeNum)
// const clock$ = Rx.Observable.interval(500).take(6)

// const randomNum$ = clock$
//   .map(i => Math.random() * 100)

const clock$ = Rx.Observable.interval(500).share().take(6)

const randomNum$ = clock$
  .map(i => Math.random() * 100).share()

const smallNum$ = randomNum$
  .filter(x => x <= 50)
  .toArray()

const largeNum$ = randomNum$
  .filter(x => x > 50)
  .toArray()

randomNum$.subscribe(x => console.log('random: ' + x))
smallNum$.subscribe(x=> console.log('small: ' + x))
largeNum$.subscribe(x=> console.log('large: ' + x))

// Use share() only where necessary. Here: for execution of clock & for mapping
// it to random.
// subscribe = invoke execution of a collection
