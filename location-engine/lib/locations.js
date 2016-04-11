Locations = new Mongo.Collection('locations');

Locations.allow({
  insert: function() {
    return true;
  },
  update: function() {
    return true;
  },
  remove: function() {
    return true;
  }
});

Locations.attachSchema(new SimpleSchema({
  uid: {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
    label: 'user id'
  },
  lat: {
    type: Number,
    decimal: true,
    min: -90,
    max: 90
  },
  lng: {
    type: Number,
    decimal: true,
    min: -180,
    max: 180
  }
}));

if (Meteor.isServer) {
  Meteor.publish('locations', function() {
    return Locations.find();
  });
}
