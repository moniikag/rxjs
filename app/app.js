import Rx from 'rxjs'

// const bufferSize = 2
const bufferSize = Number.POSITIVE_INFINITY // => all that happened in the past

const windowSize = 250
/*
windowSize - determins how long in time will the ReplaySubject keep events
stored in its internal buffer
*/

const subject = new Rx.ReplaySubject(bufferSize, windowSize);
// Replays everything once a new subscriber arrives.
// Even if first observer has already completed.

/*
BehaviorSubject !== ReplaySubject(1)
- ReplaySubject does not have an initial value nor current value,
it just replays events from the past.
ReplaySubject can replay even when first observer has completed.
For BehaviorSubject, after first observer has completed - there is no value.

=> to represent value over time: BehaviorSubject
=> to replay events: ReplaySubject
*/

const observerA = {
  next: function (x) { console.log('A next ' + x); },
  error: function (err) { console.log('A error ' + err); },
  complete: function () { console.log('A done'); },
};

subject.subscribe(observerA);
console.log('observerA subscribed');

const observerB = {
  next: function (x) { console.log('B next ' + x); },
  error: function (err) { console.log('B error ' + err); },
  complete: function () { console.log('B done'); },
};

setTimeout(() => subject.next(1), 100);
setTimeout(() => subject.next(2), 200);
setTimeout(() => subject.next(3), 300);
setTimeout(() => subject.complete(), 350);

/*
----1---2---3--|
  ..1...2...3...
                 1,2,3|
*/

setTimeout(function () {
  subject.subscribe(observerB);
  console.log('observerB subscribed');
}, 400);
