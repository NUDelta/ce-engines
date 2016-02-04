let users = [{
  username: 'kevin',
  password: 'password',
  profile: {
    qualifications: {
      work: 'Fitbit',
      isAwesome: true,
      hasDog: false,
      age: 21,
      status: 'student'
    }
  }
}, {
  username: 'ryan',
  password: 'password',
  profile: {
    qualifications: {
      work: 'Google',
      isAwesome: true,
      hasDog: false,
      age: 20,
      status: 'student'
    }
  }
}, {
  username: 'haoqi',
  password: 'password',
  profile: {
    qualifications: {
      work: 'Delta',
      isAwesome: false,
      hasDog: true,
      age: 29,
      status: 'professor'
    }
  }
}, {
  username: 'shannon',
  password: 'password',
  profile: {
    qualifications: {
      work: 'Coursehero',
      isAwesome: true,
      hasDog: false,
      age: 21,
      status: 'student'
    }
  }
}];

Meteor.users.remove({});

if (Meteor.users.find().count() === 0) {
  for (let user of users) {
    Accounts.createUser(user);
  }
}

Locations.find = function() {
  return [{
    uid: 'kevin',
    lat: 42.047493, // near Park Evanston
    lng: -87.6818237
  }, {
    uid: 'ryan',
    lat: 42.055795, // north of tech
    lng: -87.679485
  }, {
    uid: 'shannon',
    lat: 42.0491099, // near Bat 17
    lng: -87.6839757
  }];
};
