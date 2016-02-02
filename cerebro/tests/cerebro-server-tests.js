/*

  Cerebro Server Tests

*/

Tinytest.add('Cerebro server query transform', (test) => {
  let query = {
    work: ['Google', 'Facebook'],
    isAwesome: true
  }, expected = [
    { 'profile.qualifications.work': { $in: ['Google', 'Facebook'] } },
    { 'profile.qualifications.isAwesome': true }
  ], result = Cerebro._queryTransform(query);

  test.equal(_.isMatch(result, expected), true);
});

Tinytest.add('Cerebro user characteristic $any query', (test) => {
  let query = {
    $any: {
      work: ['Fitbit', 'Coursehero'],
      isAwesome: false
    }
  }, result = Cerebro.query(query).fetch();

  test.equal(result.length, 3, 'wrong length result');
  test.isNotUndefined(_.find(result, { username: 'kevin'}), 'could not find user kevin who works at Fitbit');
  test.isNotUndefined(_.find(result, { username: 'shannon'}), 'could not find user shannon who works at Coursehero');
  test.isNotUndefined(_.find(result, { username: 'haoqi'}), 'could not find user haoqi who is not awesome');
});

Tinytest.add('Cerebro user characteristic $all query', (test) => {
  let query = {
    $and: {
      work: ['Fitbit', 'Google'],
      age: 21
    }
  }, result = Cerebro.query(query).fetch();

  test.equal(result.length, 1, 'wrong length result');
  test.isNotUndefined(_.find(result, { username: 'kevin'}), 'could not find user kevin who works at Fitbit');
});

Tinytest.add('Cerebro user characteristic complex query', (test) => {
  let query = {
    $and: {
      work: ['Fitbit', 'Google'],
    },
    $any: {
      age: 21,
      hasDog: false
    }
  }, result = Cerebro.query(query).fetch();

  test.equal(result.length, 2, 'wrong length result');
  test.isNotUndefined(_.find(result, { username: 'kevin'}), 'could not find user kevin who works at Fitbit');
  test.isNotUndefined(_.find(result, { username: 'ryan'}), 'could not find user ryan who works at google and does not have a dog');
});

Tinytest.add('Cerebro yelp query works', (test) => {
  let result = Cerebro._yelpQuery('restaurants');
  test.equal(result.length, 5, 'wrong default result length');
});

Tinytest.add('Cerebro live query gets longitudes for now', (test) => {
  let result = Cerebro.liveQuery('restaurants');
  test.equal(result.length, 5, 'wrong default result length');
  test.isNotUndefined(result[0].lat, 'first result has a latitude');
});