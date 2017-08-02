import Rx from 'rxjs'

let requestStream = Rx.Observable.of('https://api.github.com/users')

let responseStream = requestStream
  .flatMap(requestUrl =>
    Rx.Observable.fromPromise(
      fetch(requestUrl).then(response => response.json())
    )
  )

function createSuggestionStream(responseStream) {
  return responseStream.map(listUser =>
    listUser[Math.floor(Math.random()*listUser.length)]
  )
}

let suggestion1Stream = createSuggestionStream(responseStream)
let suggestion2Stream = createSuggestionStream(responseStream)
let suggestion3Stream = createSuggestionStream(responseStream)

function renderSuggestion(userData, selector) {
  const element = document.querySelector(selector)
  let usernameEl = element.querySelector('.username')
  usernameEl.href = userData.html_url
  usernameEl.textContent = userData.login
  let imgEl = element.querySelector('img')
  imgEl.src = userData.avatar_url
}

suggestion1Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion1')
})

suggestion2Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion2')
})

suggestion3Stream.subscribe(user => {
  renderSuggestion(user, '.suggestion3')
})
