import Rx from 'rxjs'

const click = Rx.Observable.fromEvent(document, 'click')

const four = Rx.Observable.interval(4000).take(1)

const clickUntilFour = click.takeUntil(four)

/*
  click             ----c--c--c----c-c-c--c---c-c-c-c---
  four              --------------------0|
  clickUntilFour    ----c--c--c----c-c-c|
*/

const subscription = clickUntilFour.subscribe((ev) => {
  console.log(ev.clientX)
})

