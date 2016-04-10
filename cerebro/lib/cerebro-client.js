CerebroClient = class CerebroClient extends CerebroCore {
  constructor() {
    super();
  }

  notify(experienceId, subject, text, appendIncident) {
    console.log("Append incident: " + appendIncident);
    Meteor.call('notify', experienceId, subject, text, appendIncident, (error, result) => {
      if (error) {
        console.log('error', error);
      } else {

      }
    });
  }

  scheduleNotifications(experienceId, subject, text) {
    let schedule = 'every 1 mins';
    // TODO: abstract this out to notification manager
    Meteor.call('scheduleNotifications', experienceId, subject, text, schedule, (error, result) => {
      if (error) {
        console.log('error', error);
      } else {

      }
    });
  }
};
