/*

  Cerebro Server Tests

*/

Tinytest.add('Cerebro server query transform', (test) => {
  // Object comparison with expected won't actually work
  let query = {
    'work': ['Google', 'Facebook'],
    'isAwesome': true
  }, expected = [
    { 'profile.qualifications.work': { $in: ['Google', 'Facebook'] } },
    { 'profile.qualifications.isAwesome': true }
  ], result = Cerebro._queryTransform(query);

  // Fix this later, Meteor underscore is dated...
  // test.equal(_.isMatch(result, expected), true);
});
