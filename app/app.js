import Rx from 'rx'

Array.prototype.concatAll = function() {
  let newArr = []
  this.forEach((subArr) => {
    subArr.forEach((el) => {
      newArr.push(el)
    })
  })
  return newArr
}

const parrent = document.getElementById("parrent")
const child = document.getElementById("child")

let grabs = Rx.Observable.fromEvent(child, "mousedown")
let moves = Rx.Observable.fromEvent(parrent, "mousemove")
let drops = Rx.Observable.fromEvent(parrent, "mouseup")

let drags = grabs.map((e) => {
  return moves.takeUntil(drops)
}).concatAll()

drags.forEach((e) => {
  child.style.left = e.clientX + "px"
  child.style.top = e.clientY + "px"
})

