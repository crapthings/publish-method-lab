!Meteor.users.findOne({ username: 'user' }) && Accounts.setPassword(Meteor.users.insert({ username: 'user', roles: ['user'], }), '123')
