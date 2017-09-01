import Rx from 'rxjs'

// wrong. we shouldn't be building own observables in such cases

// class MyAgeObservable extends Rx.Observable {
//   constructor(initialAge) {
//     super((observer) => {
//       observer.next(initialAge)
//       this.observer = observer  // but: observables don't carry state between different observers
//     })
//     this.age = initialAge
//   }

//   setAge(age) {
//     this.age = age
//     this.observer.next(age)
//   }
// }

// const a$ = new MyAgeObservable(20)

// a$.subscribe(x => console.log('My age is ' + x))
// a$.setAge(21)


// correct. we can create our own observable if we want to inject a special
// behaviour throughout the whole chain

class LogSubscriber extends Rx.Subscriber {
  next(value) {
    console.log('next ' + value)
    this._next(value)
  }

  error(e) {
    console.log('error ' + e)
    this._error(e)
  }

  complete() {
    console.log('complete')
    this._complete()
  }
}

class LogOperator {
  constructor(childOperator) {
    this.childOperator = childOperator
  }

  call(subscriber, source) {
    return this.childOperator.call(
      new LogSubscriber(subscriber), source
    )
  }
}

class LogObservable extends Rx.Observable {
  lift(operator) {
    const observable = new LogObservable()
    observable.source = this
    observable.operator = new LogOperator(operator)
    return observable
  }
}

const observable = new LogObservable((observer) => {
  setTimeout(() => {observer.next(1)}, 100)
  setTimeout(() => {observer.next(2)}, 200)
  setTimeout(() => {observer.next(3)}, 300)
  setTimeout(() => {observer.complete()}, 400)
})

observable
  .map(x => 10 * x) // result: LogObservable
  .filter(x => x > 15) // result: LogObservable
  .count() // result: LogObservable
  .subscribe(x => { alert(x) })
