Cerebro.PUSH = CerebroCore.PUSH;
Cerebro.EMAIL = CerebroCore.EMAIL;

if (Meteor.isServer) {
  Meteor.methods({
    notify: function(experienceId, subject, text, appendIncident) {
      // TODO: refactor these together
      // TODO: fix the source of experience locations
      let experience = Cerebro.Experiences.findOne(experienceId),
          query;
      subject = subject || experience.name;
      text = text || experience.startText;
      if (experience.location) {
        console.log(`[CEREBRO-CORE] Notifying users for experience ${experience.name} in ${experience.location}`);
        let atLocation = Cerebro.liveQuery(experience.location);
        query = {
          'profile.subscriptions': experienceId,
          _id: { $in: atLocation }
        };
      } else {
        console.log(`[CEREBRO-CORE] Notifying users for experience ${experience.name}. No location detected, so notifying everyone.`);
        query = {
          'profile.subscriptions': experienceId
        };
      }

      if (Cerebro.NOTIFY_ALL) {
        console.log('[CEREBRO-CORE] Debug enabled. Ignoring user subscriptions.');
        delete query['profile.subscriptions'];
      }

      let users = Meteor.users.find(query, { fields: { _id: 1, emails: 1 }}).fetch();
      let userIds = _.map(users, user => user._id);
      if (appendIncident) {
        Meteor.users.update({_id: {$in: userIds}}, {$push: {'profile.pastIncidents': experience.activeIncident}}, {multi: true});
      }
      Cerebro.notify(users, this, subject, text, experienceId);
    },
    scheduleNotifications: function(experienceId, subject, text, schedule) {
      let n = 0,
          server = this,
          usersReached = [],
          experience = Cerebro.Experiences.findOne(experienceId), // this line is not safe for the package
          name = `Notifying users for experience ${experienceId}`;

      subject = subject || experience.name;
      text = text || experience.startText;

      console.log(`[CEREBRO-CORE] Notifying users for experience ${experience.name} in ${experience.location}`);
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

          let query = {};
          if (experience.location) {
            let atLocation = Cerebro.liveQuery(experience.location);
            let newlyAtLocation = _.difference(atLocation, usersReached);
            query = {
              'profile.subscriptions': experienceId,
              _id: { $in: newlyAtLocation }
            };
          } else {
            query = {
              'profile.subscriptions': experienceId
            };
          }

          if (Cerebro.NOTIFY_ALL) {
            delete query.profile;
          }

          let newUsers = Meteor.users.find(query, { fields: { _id: 1, emails: 1 }});
          Cerebro.notify(newUsers, server, subject, text);
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
