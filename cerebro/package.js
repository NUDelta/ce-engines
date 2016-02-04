Package.describe({
  name: 'ryanmadden:cerebro',
  version: '0.0.2',
  summary: 'Facilitates querying of users based on user.profile fields',
  git: 'https://github.com/NUDelta/ce-engines',
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript', 'accounts-base', 'accounts-password', 'accounts-oauth', 'oauth1',
    'erasaur:meteor-lodash@0.1.0', 'aspin:location-engine@0.0.6']);
  api.export('CerebroServer');
  api.export('Cerebro');
  api.addFiles(['lib/cerebro.js', 'lib/cerebro-server.js', 'lib/cerebro-server-exports.js'], 'server');
});

Package.onTest(function(api) {
  api.use(['ecmascript', 'accounts-password', 'tinytest', 'erasaur:meteor-lodash']);
  api.use('ryanmadden:cerebro');
  api.addFiles(['tests/fixtures.js', 'tests/cerebro-server-tests.js'], 'server');
});
