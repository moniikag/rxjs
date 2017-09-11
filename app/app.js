import Rx from 'rxjs'

// var subject = new Rx.Subject();

/*
----1---2---3---------------
 A..1...2...3...
                      B.....
B, that subscribed after 2 seconds, only sees values in the future.
*/


var subject = new Rx.BehaviorSubject(0);

// Age vs Birthdays

/*
0---1---2---3---------------
 0..1...2...3...
                      3.....
BehaviorSubject always has a current value (that's also why we need to
initialize it with a starting value).
*/

var observerA = {
  next: function (x) { console.log('A next ' + x); },
  error: function (err) { console.log('A error ' + err); },
  complete: function () { console.log('A done'); },
};

subject.subscribe(observerA)
console.log('observerA subscribed')

var observerB = {
  next: function (x) { console.log('B next ' + x); },
  error: function (err) { console.log('B error ' + err); },
  complete: function () { console.log('B done'); },
};

setTimeout(function () {
  subject.subscribe(observerB);
}, 2000);

subject.next(1);
subject.next(2);
subject.next(3);

setTimeout(function () {
  subject.subscribe(observerB);
  console.log('observerB subscribed');
}, 2000);
