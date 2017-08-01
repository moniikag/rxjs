import Rx from 'rxjs'

let requestStream = Rx.Observable.of('https://api.github.com/users')

let responseStream = requestStream
  .flatMap(requestUrl =>
    Rx.Observable.fromPromise(
      fetch(requestUrl).then(response => response.json())
    )
  )

responseStream.subscribe(response => {
  console.log(response)
})
