if (Meteor.isServer) {
  Meteor.methods({
    setActiveExperience: function(id, experience) {
      Meteor.users.update({_id: id}, {$set: {'profile.activeExperience': experience}});
    },
    serverNotification: function(text,title) {
      var badge = 1
      Push.send({
        from: 'push',
        title: title,
        text: text,
        badge: badge,
        sound: 'airhorn.caf',
        payload: {
          title: title,
          text:text,
          historyId: "result"
        },
        query: {
                // this will send to all users
              }
            });
    },
    userNotification: function(text,title,userId) {
      var badge = 1
      Push.send({
        from: 'push',
        title: title,
        text: text,
        badge: badge,
        sound: 'airhorn.caf',
        payload: {
          title: title,
          text: text,
          historyId: "result"
        },
        query: {
                userId: userId //this will send to a specific Meteor.user()._id
              }
            });
    },
    setNotificationMethod: function(method) {
      Cerebro.NOTIFY_METHOD = method;
    },
    notify: function(experienceId, subject, text) {
      // TODO: refactor these together
      // TODO: fix the source of experience locations
      let experience = Experiences.findOne(experienceId),
      query;
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
        delete query.profile;
      }

      let users = Meteor.users.find(query, { fields: { _id: 1, emails: 1 }}).fetch();
      Cerebro.notify(users, this, subject, text, experienceId);
    },
    scheduleNotifications: function(experienceId, subject, schedule) {
      let n = 0,
      server = this,
      usersReached = [],
          experience = Experiences.findOne(experienceId), // this line is not safe for the package
          name = `Notifying users for experience ${experienceId}`;

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
          Cerebro.notify(newUsers, server, subject, experience.startText);
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
