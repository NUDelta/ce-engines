let LocationManagerClient = {
    trackLocationUpdates: (template, callback) => {
        let tracker = template || Tracker;
        tracker.autorun(() => {
            let uid = Meteor.userId(),
                latLng = Geolocation.latLng();
            if (uid) {
                Locations.update({ uid: uid }, { $set: latLng });
            }
        });
        callback(latLng.lat, latLng.lng);
    },
    getUserLocation: () => {
        return Geolocation.latLng();
    },
    getOtherUserLocations: (query) => {
        if (Meteor.userId()) {
            query.uid = { $ne: Meteor.userId() };
            return Locations.find(query, { fields: { uid: 0 } });
        }
    }
}

// not sure if this works in separating out client from server
// examine Meteor accounts-base package
Object.assign(LocationManager, LocationManagerClient);
