import Rx from 'rxjs'

let refreshButton = document.querySelector('.refresh')
const closeButton1 = document.querySelector('.close1')
const closeButton2 = document.querySelector('.close2')
const closeButton3 = document.querySelector('.close3')

let refreshClickStream = Rx.Observable.fromEvent(refreshButton, 'click')
let close1Clicks = Rx.Observable.fromEvent(closeButton1, 'click')
let close2Clicks = Rx.Observable.fromEvent(closeButton2, 'click')
let close3Clicks = Rx.Observable.fromEvent(closeButton3, 'click')

let startupRequestStream = Rx.Observable.of('https://api.github.com/users')

let requestOnRefreshStream = refreshClickStream
  .map(ev => {
    let randomOffset = Math.floor(Math.random()*500)
    return 'https://api.github.com/users?since=' + randomOffset
  })

let requestStream = requestOnRefreshStream.merge(startupRequestStream)

let responseStream = requestStream
  .flatMap(requestUrl => {
    console.log('request')
    return Rx.Observable.fromPromise(
      fetch(requestUrl).then(response => response.json())
    )
  })
  .shareReplay()

// refreshClickStream: -------f--------------->
// requestStream:      r------r--------------->
// responseStream:     ---R------R------------>
// closeClickStream:   ---------------x------->
// suggestion1Stream:  N--u---N--u----u------->

const getRandomUser = (users) => users[Math.floor(Math.random()*users.length)]

function createSuggestionStream(responseStream, closeClickStream) {
  return responseStream.map(listUser => getRandomUser(listUser))
    .startWith(null)
    .merge(refreshClickStream.map(ev => null))
    .merge(closeClickStream
            .withLatestFrom(responseStream, (ev, listUsers) => getRandomUser(listUsers))
          )
}

let suggestion1Stream = createSuggestionStream(responseStream, close1Clicks)
let suggestion2Stream = createSuggestionStream(responseStream, close2Clicks)
let suggestion3Stream = createSuggestionStream(responseStream, close3Clicks)

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
