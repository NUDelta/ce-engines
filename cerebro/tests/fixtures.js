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
