import Rx from 'rxjs'

const subject = new Rx.Subject()

document.addEventListener('click', (ev) => subject.next(1))

fetch('https://jsonplaceholder.typicode.com/users/0')
  .then(res => res.json())
  .then(data => subject.next(1))

const count = subject.scan((acc, x) => acc + x, 0)

count.subscribe(x => console.log(x))
