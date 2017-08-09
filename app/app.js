import Rx from 'rxjs'

const click = Rx.Observable.create(
  function subscribe(observer) {
    const listener = (ev) => {
      observer.next(ev)
    }
    document.addEventListener('click', listener)

    return function unsubscribe() {
      document.removeEventListener('click', listener)
    }
  }
)

const subscription = click.subscribe((ev) => {
  console.log(ev.clientX)
})

setTimeout(() => subscription.unsubscribe(), 4000)
