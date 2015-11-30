## Basic Usage

### Client-side

Setup location tracking on a template:
```js

Template.example.onCreated(() => {
    LocationManager.trackLocationUpdates(this, (lat, lng) => {
        console.log(lat, lng);
    });
});

```
You can pass through `null` instead of `this` to track location updates globally.

This would be mostly useful only on a mobile web client.

Other usages:

```js
// gets current user location
LocationManager.getUserLocation();
// gets all other anonymized locations with with latitudes between -40 and 0
LocationManager.getOtherUserLocations({ lat: { $gt: -40, $lt: 0 }});
```
`LocationManager.getOtherUserLocations` is disabled by default. You will have to configure the `Locations` collection permissions to enable it.
