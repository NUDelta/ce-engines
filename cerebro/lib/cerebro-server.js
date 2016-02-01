CerebroServer = class CerebroServer {
  constructor() {

  }

  liveQuery() {

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
