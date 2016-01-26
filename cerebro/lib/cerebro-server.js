CerebroServer = class CerebroServer {
  constructor() {

  }

  query(userSet) {

  }

  _queryTransform(query) {
    let output = [];
    for(let attribute in query) {
      let pair = {},
          attributeVal = query[attribute],
          key = `profile.qualifications.${attribute};`,
          value = (attributeVal.constructor === Array) ? { $in: attributeVal } : attributeVal;
      pair[key] = value;
      output.push(pair);
    }
    return output;
  }

  notify(userSet) {

  }

}

// var queryTransform = function(obj) {
//   var output = {};
//   if (obj.$any) {
//     output.$or = convertQueryObjects(obj.$any);
//   }
//   if (obj.$all) {
//     output.$and = convertQueryObjects(obj.$all);
//   }
//   return output;
// };
//
// var convertQueryObjects = function(obj) {
//   var lst = [];
//   var attributes = Object.keys(obj);
//   for (var i = 0; i < attributes.length; i++) {
//     var add = {};
//     var name = "profile.qualifications" + attributes[i];
//     add[name] = insertIn(obj[attributes[i]]);
//     lst.push(add);
//   }
//   return lst;
// }
//
// var insertIn = function(item) {
//   if (item.constructor === Array) {
//     return {$in: item};
//   }
//   else {
//     return item;
//   }
// }
