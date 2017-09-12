import Rx from 'rxjs'

var connectableObservable = Rx.Observable.interval(1000)
  .take(5)
  .multicast(new Rx.ReplaySubject(100));

// multicast returns connectable observable.
// let's us avoid creating Subject the observes Observable in order to add more Observers

var observerA = {
  next: function (x) { console.log('A next ' + x); },
  error: function (err) { console.log('A error ' + err); },
  complete: function () { console.log('A done'); },
};

connectableObservable.connect();
// connect does subscription of original observable and the internal subject passed in mutlicast
// === observable.subscribe(subject)
// we use connect() to say when to start running the execution

// now we can normally subscribe to the observer
connectableObservable.subscribe(observerA);

var observerB = {
  next: function (x) { console.log('B next ' + x); },
  error: function (err) { console.log('B error ' + err); },
  complete: function () { console.log('B done'); },
};

setTimeout(function () {
  connectableObservable.subscribe(observerB);
}, 2000);
