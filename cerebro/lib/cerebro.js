Meteor.methods({
  filterUsers: function(filter) {
    var users = Meteor.users.find(queryTransform(filter)).fetch();
    return users;
  }
});

var queryTransform = function(obj) {
  var output = {};
  output.$or = convertQueryObjects(obj.$any);
  output.$and = convertQueryObjects(obj.$all);
  return output;
};

var convertQueryObjects = function(obj) {
  var lst = [];
  var attributes = Object.keys(obj);
  for (var i = 0; i < attributes.length; i++) {
    var add = {};
    var name = "profile." + attributes[i];
    add[name] = insertIn(obj[attributes[i]]);
    lst.push(add);
  }
  return lst;
}

var insertIn = function(item) {
  if (item.constructor === Array) {
    return {$in: item};
  }
  else {
    return item;
  }
}