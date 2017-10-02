import Rx from 'rxjs'

function subjectFactory() {
  return new Rx.Subject();
}

/*
var result = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('Source ' + x))
  .map(x => Math.random())

var resultDelayed = result.delay(500)
var merged = result.merge(resultDelayed)
merged.subscribe(x => console.log(x))

This code will cause two executions. We'll have:
Source 0; random, Source 0, random, Source 1, random, Source 1, random...

*/

// If we pass second argument to multicast, it will not return connectable
// observable anymore - it will just return a normal observable, it doesn't
// have refCount anymore. There won't be a shared observable, it will just be a
// result observable.
var result = Rx.Observable.interval(1000).take(6)
  .do(x => console.log('source ' + x))
  .map(x => Math.random())
  .multicast(subjectFactory, function selector(shared) {
    // the body of our selector function is our sandbox, this is the only place
    // where observable is shared - we should move execution here
    var sharedDelayed = shared.delay(500);
    var merged = shared.merge(sharedDelayed);
    return merged;
  });

var sub = result.subscribe(x => console.log(x));


