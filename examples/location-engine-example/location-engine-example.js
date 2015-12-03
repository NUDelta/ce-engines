if (Meteor.isClient) {
  Meteor.startup(() => {
    GoogleMaps.load();
  });

  Template.map.helpers({
    mapOptions: () => {
      let latLng = LocationManager.currentLocation();
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: 17
        };
      }
    }
  });

  Template.map.onCreated(function() {
    LocationManager.trackUpdates(this);
    GoogleMaps.ready('map', (map) => {

    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
