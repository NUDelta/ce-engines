let auth = {
  oauth_consumer_key: "-_zoLpC8DASmu7ql13IQIw",
  oauth_consumer_secret: "2t9PyZDkOvykIWYvwWCy0uWoTug",
  oauth_token: "kkU3B_Abdf30sx5tVB2fkFVbr3gzxMZO",
  accessTokenSecret: "GGs0J7wWWshnazwoOHB01j3A2sM",
  oauth_signature_method: "HMAC-SHA1"
}, yelpEndpoint = 'http://api.yelp.com/v2/search';

CerebroServer = class CerebroServer {
  constructor() {
    this.NOTIFY_ALL = false;
    this.NOTIFY_METHOD = this.PUSH;
  }

  static get EMAIL() {
    return 'EMAIL';
  }

  static get PUSH() {
    return 'PUSH';
  }

  notify(users, server, subject, text) {
    // this needs refactoring into cerebro base
    switch(this.NOTIFY_METHOD) {
      case CerebroServer.EMAIL:
        console.log('SENDING EMAIL');
        this._sendEmails(users, server, subject, text);
        break;
      case CerebroServer.PUSH:
        console.log('SENIDNG PUSH');
        this._sendPush(users, server, subject, text);
        break;
      default:
        console.log('[CEREBRO-SERVER] Invalid notification method was set.');
        break;
    }
  }

  _sendEmails(users, server, subject, text) {
    server.unblock();
    users.forEach((user) => {
      Email.send({
        to: user.emails[0].address,
        from: 'shannonnachreiner2012@u.northwestern.edu',
        subject: subject,
        text: text
      });
    });
  }

  _sendPush(users, server, subject, text) {
    Meteor.call('serverNotification', text, subject, users);
  }

  liveQuery(locationType, options = {}) {
    options.location = options.location || 'Evanston+IL';
    options.radius = options.radius || 200;
    options.limit = options.limit || 20;

    let locations = _.map(this._yelpQuery(locationType, options.location, options.radius, options.limit),
                          business => business.location.coordinate);
    locations = _.map(locations, (location) => {
      return { lat: location.latitude, lng: location.longitude }
    });
    return LocationManager.findUsersNearLocations(locations);
  }

  pointsQuery(locations, options = {}) {
    options.radius = options.radius || 200;
    return LocationManager.findUsersNearLocations(locations);
  }

  _yelpQuery(locationType, location='Evanston+IL', radius=200, limit=5) {
    // TODO: refactor this
    // TODO: add support for *any* location
    // TODO: might want to unblock this
    let params = _.clone(auth);
    params.category_filter = locationType;

    if (location.lat && location.lng) {
      params.ll = `${location.lat},${location.lng}`;
    } else {
      params.location = location;
    }

    params.limit = limit;
    params.radius = radius;

    let config = {
      consumerKey: auth.oauth_consumer_key,
      secret: auth.oauth_consumer_secret
    }, urls = {
      requestToken: yelpEndpoint,
      accessToken: auth.oauth_token
    }, oauthBinding = new OAuth1Binding(config, urls);
    oauthBinding.accessTokenSecret = auth.accessTokenSecret;
    let headers = oauthBinding._buildHeader();

    // TODO: check if this is blocking -- fix up if it is
    return oauthBinding._call('GET', yelpEndpoint, headers, params).data.businesses;
  }

  query(userQuery) {
    let result = {};
    result.$or = this._queryTransform(userQuery.$any);
    result.$and = this._queryTransform(userQuery.$and);
    return Meteor.users.find(_.pick(result, arr => arr.length > 0));
  }

  _queryTransform(query) {
    let output = [];
    for(let attribute in query) {
      let pair = {},
          attributeVal = query[attribute],
          key = `profile.qualifications.${attribute}`,
          value = (attributeVal.constructor === Array) ? { $in: attributeVal } : attributeVal;
      pair[key] = value;
      output.push(pair);
    }
    return output;
  }

}
