const TECH = { lat: 42.0578102, lng: -87.6780661 };
const FOSTER_WALKER = { lat: 42.0537641, lng: -87.6786452 };

let data = [{
  uid: 'kevin', lat: 42.058376, lng: -87.6800187 // very close to TECH
}, {
  uid: 'ryan', lat: 42.056616, lng: -87.6791817 // in FORD
}, {
  uid: 'shannon', lat: FOSTER_WALKER.lat, lng: FOSTER_WALKER.lng
}, {
  uid: 'haoqi', lat: 40.6088461, lng: -83.2655375 // in CANADA
}];

Locations.find = function() { return data; };

