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
    const earthRadius = 6371000;
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
};

/*
 public static float distFrom(float lat1, float lng1, float lat2, float lng2) {
 double earthRadius = 6371000; //meters
 double dLat = Math.toRadians(lat2-lat1);
 double dLng = Math.toRadians(lng2-lng1);
 double a = Math.sin(dLat/2) * Math.sin(dLat/2) +
 Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) *
 Math.sin(dLng/2) * Math.sin(dLng/2);
 double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
 float dist = (float) (earthRadius * c);

 return dist;
 }
 */
