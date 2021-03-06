Package.describe({
  name: 'collectiveexperiences:location-engine',
  version: '0.0.1',
  summary: 'Simple multi-user location synchronization and querying.',
  git: 'https://github.com/NUDelta/ce-engines',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use(['ecmascript', 'mongo', 'erasaur:meteor-lodash@0.1.0']);
  api.use('aldeed:collection2@2.5.0');
  api.use('mdg:geolocation@1.1.0', 'client'); // TODO: consider decoupling this dependency hahah

  api.export('Locations');
  api.export('LocationManager');
  api.export('LocationManagerClient');
  api.export('LocationManagerServer');

  api.addFiles('lib/locations.js');
  api.addFiles('lib/location-manager-client.js', 'client');
  api.addFiles('lib/location-manager-server.js', 'server');

  api.addFiles('lib/global-location-manager-client.js', 'client');
  api.addFiles('lib/global-location-manager-server.js', 'server');
});

Package.onTest(function(api) {
  api.use(['ecmascript', 'tinytest', 'erasaur:meteor-lodash', 'random']);
  api.use('collectiveexperiences:location-engine');

  api.addFiles('tests/location-manager-client-tests.js', 'client');
  api.addFiles(['tests/location-manager-server-fixtures.js',
                'tests/location-manager-server-tests.js'],
    'server');
  api.addFiles('tests/location-engine-tests.js');
});
