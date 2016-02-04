let auth = {
  oauth_consumer_key: "-_zoLpC8DASmu7ql13IQIw",
  oauth_consumer_secret: "2t9PyZDkOvykIWYvwWCy0uWoTug",
  oauth_token: "kkU3B_Abdf30sx5tVB2fkFVbr3gzxMZO",
  accessTokenSecret: "GGs0J7wWWshnazwoOHB01j3A2sM",
  oauth_signature_method: "HMAC-SHA1"
}, yelpEndpoint = 'http://api.yelp.com/v2/search';

CerebroServer = class CerebroServer {
  constructor() {

  }

  liveQuery(locationType) {
    let locations = _.map(this._yelpQuery(locationType), business => business.location.coordinate);
    locations = _.map(locations, (location) => {
      return {lat: location.latitude, lng: location.longitude}
    });
    return LocationManager.findUsersNearLocations(locations);
  }

  _yelpQuery(locationType, location='Evanston+IL', radius=20, limit=5) {
    // TODO: refactor this
    // TODO: add support for *any* location
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

  notify(userSet) {

  }

}
