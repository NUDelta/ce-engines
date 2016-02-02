
Tinytest.add('calculates distance between two geocoordinates properly', (test) => {
  // Based on http://www.nhc.noaa.gov/gccalc.shtml
  let location1 = {
    lat: 47.556,
    lng: 58.122,
  }, location2 = {
    lat: 48.031,
    lng: 58.203
  };
  let actualDistance = 53000,
      computedDistance = LocationManager.computeDistance(location1, location2);

  test.isTrue(Math.abs(computedDistance - actualDistance) < 200, 'distance computed is inaccurate/incorrect');
});
