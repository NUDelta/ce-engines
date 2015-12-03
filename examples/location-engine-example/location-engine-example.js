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
    GoogleMaps.ready('map', (map) => {

      function renderMarker(location) {
        return new google.maps.Marker({
          position: new google.maps.LatLng(location.lat, location.lng),
          map: map.instance
        });
      }

      function changeMarker(marker, location) {
        marker.setPosition(new google.maps.LatLng(location.lat, location.lng));
      }

      function removeMarker(marker) {
        marker.setMap(null);
      }

      LocationManager.trackUpdates(this, renderMarker, changeMarker);
      LocationManager.trackOthersUpdates({}, renderMarker, changeMarker, removeMarker);
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
