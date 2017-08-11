import Rx from 'rxjs'

const click = Rx.Observable.fromEvent(document, 'click')

const subscription = click.subscribe((ev) => {
  console.log(ev.clientX)
})

setTimeout(() => subscription.unsubscribe(), 4000)
