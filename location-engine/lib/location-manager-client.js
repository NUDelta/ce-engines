LocationManagerClient = class LocationManagerClient {
  constructor() {
    this._current = {};
    this._others = {};
    this._locationId = null;
  }

  trackUpdates(tracker, addTransform, changeCallback) {
    tracker.autorun(() => {
      let uid = Meteor.userId(),
        latLng = Geolocation.latLng();
      if (uid && latLng) {
        if (this._locationId) {
          Locations.update(this._locationId, { $set: latLng });
        } else {
          let prevLocation = Locations.findOne({ uid: uid });
          if (prevLocation) {
            this._locationId = prevLocation._id;
            Locations.update(this._locationId, { $set: latLng });
          } else {
            latLng.uid = uid;
            this._locationId = Locations.insert(latLng);
          }
        }
      }
      if (Object.keys(this._current).length === 0) {
        this._current.struct = addTransform(latLng);
      }
      changeCallback(this._current.struct, latLng);
    });
  }

  trackOthersUpdates(query, addTransform, changeCallback, removeCallback) {
    this.othersLocations(query).forEach((location) => {
      this._others[location._id] = addTransform(location);
      changeCallback(this._others[location._id], location);
    });
    Locations.find(query).observeChanges({
      changed: (id, fields) => {
        if (id in this._others) {
          removeCallback(this._others[id]);
          changeCallback(this._others[id], fields);
        }
      },
      removed: (id) => {
        if (id in this._others) {
          removeCallback(this._others[id]);
          delete this._others[id];
        }
      },
    });
  }

  currentLocation() {
    return Geolocation.latLng();
  }

  othersLocations(query = {}) {
    if (Meteor.userId()) {
      query.uid = { $ne: Meteor.userId() };
    }
    return Locations.find(query, { fields: { uid: 0 } }).fetch();
  }

  updateUserLocation(location) {
    if (Meteor.userId()) {
      let location = Locations.findOne({uid: Meteor.userId()});
      if (location) {
        Locations.update(location._id, {$set: {lat: location.latitude, lng: location.longitude}});
      } else {
        Locations.insert({lat: location.latitude, lng: location.longitude});
      }
    }
  }
};
