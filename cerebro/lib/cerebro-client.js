CerebroClient = class CerebroClient {
  constructor() {
    this.NOTIFY_METHOD = this.EMAIL;
  }

  // TODO: move this to CerebroCore and extend classes
  static get EMAIL() {
    return 'EMAIL';
  }

  static get PUSH() {
    return 'PUSH';
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

  setNotificationMethod(method) {
    this.NOTIFY_METHOD = method;
    Meteor.call('setNotificaitonMethod', method, (error, result) => {
      if (error) {
        console.log('error', error);
      } else {

      }
    });
  }
};
