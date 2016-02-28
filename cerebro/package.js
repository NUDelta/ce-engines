Package.describe({
  name: 'collectiveexperiences:cerebro',
  version: '0.0.1',
  summary: 'Facilitates querying of users based on user.profile fields',
  git: 'https://github.com/NUDelta/ce-engines',
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript', 'accounts-base', 'accounts-password', 'accounts-oauth', 'oauth1',
    'erasaur:meteor-lodash@0.1.0', 'aspin:location-engine@0.0.6', 'percolate:synced-cron@1.3.0']);
  api.export('CerebroServer');
  api.export('CerebroClient');
  api.export('Cerebro');
  api.addFiles(['lib/cerebro-client.js', 'lib/cerebro-client-exports.js'], 'client');
  api.addFiles(['lib/cerebro-server.js', 'lib/cerebro-server-exports.js'], 'server');
  api.addFiles(['lib/cerebro-core.js']);
});

Package.onTest(function(api) {
  api.use(['ecmascript', 'accounts-password', 'tinytest', 'erasaur:meteor-lodash', 'aspin:location-engine']);
  api.use('collectiveexperiences:cerebro');
  api.addFiles(['tests/fixtures.js', 'tests/cerebro-client-tests.js'], 'client');
  api.addFiles(['tests/fixtures.js', 'tests/cerebro-server-tests.js'], 'server');
});
