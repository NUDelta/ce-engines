CerebroClient = class CerebroClient extends CerebroCore {
  constructor() {
    super();
  }

  notify(experienceId, subject, text) {
    Meteor.call('notify', experienceId, subject, text, (error, result) => {
      if (error) {
        console.log('error', error);
      } else {

      }
    });
  }

  scheduleNotifications(experienceId, subject) {
    let schedule = 'every 1 mins';
    // TODO: abstract this out to notification manager
    Meteor.call('scheduleNotifications', experienceId, subject, schedule, (error, result) => {
      if (error) {
        console.log('error', error);
      } else {

      }
    });
  }
};
