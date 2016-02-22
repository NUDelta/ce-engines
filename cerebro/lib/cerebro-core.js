if (Meteor.isServer) {
  Meteor.methods({
    notify: function(experienceId, subject, text) {
      // TODO: refactor these together
      let experience = Experiences.findOne(experienceId);
      let atLocation = Cerebro.liveQuery(experience.location),
        query = {
          'profile.subscriptions': experienceId,
          _id: { $in: atLocation }
        },
        users = Meteor.users.find(query, { fields: { _id: 1, emails: 1 }});
      Cerebro.sendNotifications(users, this, subject, text);
    },
    scheduleNotifications: function(experienceId, subject, schedule) {
      let n = 0,
          server = this,
          usersReached = [],
          experience = Experiences.findOne(experienceId), // this line is not safe for the package
          name = `Notifying users for experience ${experienceId}`;

      // only allow one job per experienceId
      SyncedCron.remove(name);
      // TODO: Cron jobs aren't really the way to do this.
      // Try to send signal to devices to report back to us.
      SyncedCron.add({
        name: name,
        schedule: function(parser) {
          return parser.text(schedule);
        },
        job: function() {
          console.log(`Starting job ${n} for ${experienceId}`);
          n += 1;
          // ugly hack I think....
          if (n === 60) {
            SyncedCron.remove(name);
          }

          let atLocation = Cerebro.liveQuery(experience.location);
          let newlyAtLocation = _.difference(atLocation, usersReached),
              query = {
                'profile.subscriptions': experienceId,
                _id: { $in: newlyAtLocation }
              },
              newUsers = Meteor.users.find(query, { fields: { _id: 1, emails: 1 }});

          Cerebro.sendNotifications(newUsers, server, subject, experience.startEmailText);
          newUsers.forEach((user) => {
            usersReached.push(user._id);
          });
          console.log(`Completed job ${n} for ${experienceId}`);
          return n;
        }
      })
    }
  });
  SyncedCron.stop();
  SyncedCron.start();
}
