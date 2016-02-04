## Basic Usage

### Client-side

Setup location tracking on a template:
```js

Template.example.onCreated(() => {
    LocationManager.trackUpdates(this, addTransform, changeCallback);
});

```
Arguments:
 * `TemplateInstance` (in `onCreated` or `onRendered`, `this`) or `Tracker`: determines scope of autorun
 * `({ lat: 40, lng: 40 }) => {}`: set a data representation of location that you update in `changeCallback`
 * `(Object, { lat: 40, lng: 40 }) => {}`: indicate actions on location updates (e.g. first object is your data representation from the `addTransform`, and the second locations changes some of its rendering properties based on the new location)

See the example for how details on how to implement. This would be mostly useful only on a mobile web client.

Location updates from all other users:
```js
LocationManager.trackOthersUpdates({ lat: { $gt: -40, $lt: 0 }}, addTransform, changeCallback, removeCallback);
```

Other usages:

```js
// gets current user location
LocationManager.currentLocation();
// gets all other anonymized locations with with latitudes between -40 and 0, query is optional
LocationManager.othersLocations({ lat: { $gt: -40, $lt: 0 }});
```
`LocationManager.othersLocations` is disabled by default. You will have to configure the `Locations` collection permissions to enable it.

### Server-side
TODO: update me!

```js
LocationManager.findUsersNearLocation({ lat: 42, lng: 42 });
```
