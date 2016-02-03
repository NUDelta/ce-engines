function isWithinRange(diff, range) {
  return Math.abs(diff) < range;
}

Tinytest.add('converts degrees to radians', (test) => {
  let conversion = LocationManager._degreeToRadian(180);
  test.isTrue(isWithinRange(conversion - Math.PI, 0.05));
});

Tinytest.add('calculates distance between two geocoordinates properly', (test) => {
  // truth: http://www.csgnetwork.com/gpsdistcalc.html
  let location1 = {
    lat: 47.556,
    lng: 58.122,
  }, location2 = {
    lat: 48.031,
    lng: 58.203
  };
  let actualDistance = 53128,
      computedDistance = LocationManager.computeDistance(location1, location2);

  test.isTrue(isWithinRange(computedDistance - actualDistance, 50), `distance too great: expected ${actualDistance}, got ${computedDistance}`);
});

Tinytest.add('computes bounding box around a location', (test) => {
  let techInstitute = {
    lat: 42.0564563,
    lng: -87.7494751
  }, radius = 1000;
});

Tinytest.add('latitude bounds are computed properly', (test) => {
  let bounds = LocationManager._computeLatBounds(40, 50);
  test.isTrue(bounds[1] > bounds[0], 'bounds are out of order');
  let example = {
    lat: 40,
    lng: 60
  }, leftShifted = {
    lat: bounds[0],
    lng: 60
  }, rightShifted = {
    lat: bounds[1],
    lng: 60
  };
  let distanceLeft = LocationManager.computeDistance(example, leftShifted),
      distanceRight = LocationManager.computeDistance(example, rightShifted);

  test.isTrue(isWithinRange(distanceLeft - 50, 10), `bounds are wrong left-shifted distance: expected: 50, got ${distanceLeft}`);
  test.isTrue(isWithinRange(distanceRight - 50, 10), `bounds are wrong right-shifted distance: expected: 50, got ${distanceLeft}`);
});

Tinytest.add('latitude changes are wrapped properly', (test) => {
  test.equal(LocationManager._incLatitude(40, 10), 50, 'normal change fails');
  test.equal(LocationManager._incLatitude(80, 20), 90, 'crossing north pole change fails');
  test.equal(LocationManager._incLatitude(90, 20), 90, 'starting from north pole fails');
  test.equal(LocationManager._incLatitude(10, -20), -10, 'crossing equator fails');
  test.equal(LocationManager._incLatitude(-80, -20), -90, 'crossing south pole fails');
  test.equal(LocationManager._incLatitude(-90, 20), -70, 'starting from south pole fails');
});

Tinytest.add('longitude bounds are computed properly', (test) => {
  let example = {
    lat: 40,
    lng: 60
  }, bounds = LocationManager._computeLngBounds(example, 50);
  let leftShifted = {
    lat: 40,
    lng: bounds[0]
  }, rightShifted = {
    lat: 40,
    lng: bounds[1]
  };
  let distanceLeft = LocationManager.computeDistance(example, leftShifted),
      distanceRight = LocationManager.computeDistance(example, rightShifted);

  test.isTrue(isWithinRange(distanceLeft - 50, 10), `bounds are wrong left-shifted distance: expected: 50, got ${distanceLeft}`);
  test.isTrue(isWithinRange(distanceRight - 50, 10), `bounds are wrong right-shifted distance: expected: 50, got ${distanceLeft}`);
});

Tinytest.add('longitude changes are wrapped properly', (test) => {
  test.equal(LocationManager._incLongitude(40, 10), 50, 'normal change fails');
  test.equal(LocationManager._incLongitude(170, 20), -170, 'crossing date line east to west change fails');
  test.equal(LocationManager._incLongitude(180, 20), -160, 'starting from date line east fails');
  test.equal(LocationManager._incLongitude(10, -20), -10, 'crossing Greenwich fails');
  test.equal(LocationManager._incLongitude(-170, -20), 170, 'crossing date line west to east fails');
  test.equal(LocationManager._incLongitude(-180, -20), 160, 'starting from date line west fails');
});
