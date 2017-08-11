import Rx from 'rxjs'

const click = Rx.Observable.fromEvent(document, 'click')

const sixClicks = click.take(6)

/*
  click             ----c--c--c----c-c-c--c---c-c-c-c---
  sixClicks         ----c--c--c----c-c-c|
*/

sixClicks.subscribe((ev) => {
  console.log(ev.clientX)
})

