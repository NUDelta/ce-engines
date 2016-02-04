const earthRadius = 6371000;

LocationManagerServer = class LocationManagerServer {
  constructor() {

  }

  findUsersNearLocation(location) {

  }

  findUsersNearLocations(locations) {

  }

  computeDistance(location1, location2) {
    // https://en.wikipedia.org/wiki/Haversine_formula
    // TODO: check this for accuracy + understand this
    // maximum error should be 0.5%
    let dLat = this._degreeToRadian(location1.lat - location2.lat),
        dLng = this._degreeToRadian(location1.lng - location2.lng);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this._degreeToRadian(location1.lat)) * Math.cos(this._degreeToRadian(location2.lat)) *
            Math.sin(dLng / 2) * Math.sin(dLng / 2),
        b = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    return earthRadius * b;
  }

  _degreeToRadian(degree) {
    return degree * Math.PI / 180;
  }

  computeBoundsAround(location, radius) {
    let bounds = {};
    bounds.lat = this._computeLatBounds(location.lat, radius);
    bounds.lng = this._computeLngBounds(location, radius);
    return bounds;
  }

  _computeLatBounds(latitude, distance) {
    // TODO: deal with poles
    /*
     using:
       circumference = 2 * pi * earthR
       circ * x / 360 = distance, solve for x
    */
    let degreeDiff = 360 / (2 * Math.PI * earthRadius / distance),
        bounds = [];
    bounds.push(this._incLatitude(latitude, -degreeDiff));
    bounds.push(this._incLatitude(latitude, degreeDiff));
    return bounds;
  }

  _incLatitude(latitude, difference) {
    return Math.max(Math.min(latitude + difference, 90), -90);
  }

  _computeLngBounds(location, distance) {
    /*
      similar algorithm as _complteLatBounds, but adjusts the radius
      to account for various size circles on differents lines of latitude
    */
    let latCircleRadius = earthRadius * Math.cos(location.lat);

    let degreeDiff = 360 / (2 * Math.PI * latCircleRadius / distance),
        bounds = [];
    bounds.push(this._incLatitude(location.lng, -degreeDiff));
    bounds.push(this._incLatitude(location.lng, degreeDiff));
    return bounds;
  }

  _incLongitude(longitude, difference) {
    let partial = (longitude + 180 + difference) % 360 - 180;
    if (partial < -180) {
      partial = 180 - Math.abs(180 + partial);
    }
    return partial;
  }
};
