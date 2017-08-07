import Rx from 'rxjs'

let refreshButton = document.querySelector('.refresh')
let refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click')

let startupRequestStream = Rx.Observable.of('https://api.github.com/users')

let requestOnRefreshStream = refreshClickStream
  .map(ev => {
    let randomOffset = Math.floor(Math.random()*500)
    return 'https://api.github.com/users?since=' + randomOffset
  })

let responseStream = requestOnRefreshStream.merge(startupRequestStream)
  .flatMap(requestUrl =>
    Rx.Observable.fromPromise(
      fetch(requestUrl).then(response => response.json())
    )
  )

function createSuggestionStream(responseStream) {
  return responseStream.map(listUser =>
    listUser[Math.floor(Math.random()*listUser.length)]
  )
  .startWith(null)
  .merge(refreshClickStream.map(ev => null))
}

let suggestion1Stream = createSuggestionStream(responseStream)
let suggestion2Stream = createSuggestionStream(responseStream)
let suggestion3Stream = createSuggestionStream(responseStream)

function renderSuggestion(userData, selector) {
  const element = document.querySelector(selector)
  if(userData === null) {
    element.style.visibility = 'hidden'
  } else {
    element.style.visibility = 'visible'
    let usernameEl = element.querySelector('.username')
    usernameEl.href = userData.html_url
    usernameEl.textContent = userData.login
    let imgEl = element.querySelector('img')
    imgEl.src = userData.avatar_url
  }
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
