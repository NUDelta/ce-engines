Package.describe({
  name: 'ryanmadden:cerebro',
  version: '0.0.1',
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
  api.use('ecmascript');
  api.use('accounts-base');
  api.addFiles('lib/cerebro.js', 'server');
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('ryanmadden:cerebro');
  api.addFiles('cerebro-tests.js');
});
