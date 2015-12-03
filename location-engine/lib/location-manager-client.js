LocationManagerClient = class LocationManagerClient {
    constructor() {
        this._current = {};
        this._others = {};
    }

    trackUpdates(tracker = Tracker, addTransform, changeCallback, removeCallback) {
        tracker.autorun(() => {
            let uid = Meteor.userId(),
                latLng = Geolocation.latLng();
            if (uid) {
                Locations.update({ uid: uid }, { $set: latLng });
            }
            if (Object.keys(this._current).length === 0) {
                this._current.struct = addTransform(latLng);
            }
            changeCallback(this._current.struct, latLng);
        });
    }

    // FIXME: These default arguments don't make any sense
    trackOthersUpdates(query = {}, addTransform, changeCallback, removeCallback) {
        this.othersLocations(query).forEach((location) => {
            this._others[location._id] = addTransform(location);
            changeCallback(this._others[location._id], location);
        });
        Locations.find(query).observeChanges({
            added: function(id, fields) {
                // TODO: figure out we can apply a Mongo-style query to a
                // javascript dictionary
                // http://stackoverflow.com/questions/34060239/check-mongo-style-query-with-javascript-hashmap
            },
            changed: function(id, fields) {
                if (id in this._others) {
                    removeCallback(this._others[id]);
                    changeCallback(this._others[id], fields);
                }
            },
            removed: function(id) {
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
}
