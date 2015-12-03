Package.describe({
  name: 'aspin:location-engine',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use(['ecmascript', 'mongo', 'accounts-base']);
  api.use('aldeed:collection2');
  api.use('mdg:geolocation', 'client'); // TODO: consider decoupling this dependency hahah

  api.export('Locations');
  api.export('LocationManager');
  api.export('LocationManagerClient');

  api.addFiles('lib/locations.js');
  api.addFiles('lib/location-manager-client.js', 'client');

  api.addFiles('lib/global-location-manager-client.js', 'client');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('aspin:location-engine');
  api.addFiles('tests/location-engine-tests.js');
});
