# Cerebro

Cerebro is a sophisticated user management system and suite of tools to query on and notify users depending on many potential sets of criteria. Currently, Cerebro contains functions to query on __types__ of user locations (e.g. find everyone near a restaurant) and send push notifications or return sets of users appropriately. Cerebro is under active development, as part of DTR's collective experience project.

## Introduction
Cerebro makes available the `Cerebro` object on both the client and server. Like Meteor's `accounts` package, client and server share several components, but differ in terms of levels of permission and so on.

## API

### Sending notifications (client)
Cerebro has two distinct options for sending notifications: you can choose to either send notifications at any particular instant, or schedule continuous checks for any qualifying users of the next hour. By default, Cerebro automatically pulls in collective experience information, only sending these notifications to users who fulfill the experience's live querying condition and are subscribed to that experience.

```js
// sending out notification right now
let experience = Experiences.findOne();
Cerebro.notify(experience._id, 'notification title', 'notification content');

// scheduling checks for next hour
Cerebro.scheduleNotifications(experience._id, 'notification title', 'notification content');
```

If no title or content is provided, Cerebro defaults to the experience's name and some standard start text.

### Live Querying (server)
Cerebro's user selection management pivots around its _live querying_, which is basically a constraint satisfaction solver on user attributes. Currently, the only implemented parameter is location. Live querying is already built into `Cerebro.notify` to select appropriate user groups.

```js
// optional, here are defaults
let options = {
  location : 'Evanston+IL',
  radius: 200,
  limit: 20
};

// must be a yelp category
// see
Cerebro.liveQuery('restaurants', options);
```

### Full Reference

#### Core

#### Client
`Cerebro.notify`

`Cerebro.scheduleNotifications`

#### Server
