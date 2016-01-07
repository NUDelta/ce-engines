class StubTracker {
  constructor() {
    this.runner = () => { return 0; };
  }

  autorun(newRunner) {
    this.runner = newRunner;
    newRunner();
  }

  rerun() {
    this.runner();
  }
}

let stubTracker = new StubTracker(),
    timesCalled = 0;

Tinytest.addAsync('trackUpdates sets current according to the first argument', (test, next) => {
  test.equal(LocationManager._current, {});
  LocationManager.trackUpdates(stubTracker,
   function(location) {
     return 1;
   },
   function(transform, location) {
     test.equal(transform, 1);
     test.equal(LocationManager._current.struct, 1);
     timesCalled += 1;

     if (timesCalled == 1) {
       next();
     }
   }
  )
});

Tinytest.add('trackUpdates should recall the second argument on reruns', (test) => {
  let currentTimesCalled = timesCalled;
  stubTracker.rerun();
  console.log(timesCalled);
  test.equal(currentTimesCalled + 1, timesCalled);
});
