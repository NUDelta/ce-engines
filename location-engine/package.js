Package.describe({
  name: 'aspin:location-engine',
  version: '0.0.4',
  summary: 'Simple multi-user location synchronization and querying.',
  git: 'https://github.com/NUDelta/ce-engines',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use(['ecmascript', 'mongo', 'accounts-base']);
  api.use('aldeed:collection2@2.5.0');
  api.use('mdg:geolocation@1.1.0', 'client'); // TODO: consider decoupling this dependency hahah

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

  api.addFiles('tests/location-manager-client-tests.js', 'client');
  api.addFiles('tests/location-engine-tests.js');
});
