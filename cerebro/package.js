Package.describe({
  name: 'ryanmadden:cerebro',
  version: '0.0.2',
  // Brief, one-line summary of the package.
  summary: 'Facilitates querying of users based on user.profile fields',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/NUDelta/ce-engines',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: null
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');
  api.use(['ecmascript', 'accounts-base']);
  api.export('CerebroServer');
  api.export('Cerebro');
  api.addFiles(['lib/cerebro.js', 'lib/cerebro-server.js', 'lib/cerebro-server-exports.js'], 'server');
});

Package.onTest(function(api) {
  api.use(['ecmascript', 'tinytest', 'underscore']);
  api.use('ryanmadden:cerebro');
  api.addFiles('tests/cerebro-server-tests.js', 'server');
});
