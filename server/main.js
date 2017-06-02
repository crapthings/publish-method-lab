! Meteor.users.findOne({ username: 'user' }) && Accounts.setPassword(Meteor.users.insert({ username: 'user', role: 'user', }), '123')

! Groups.findOne({ name: 'github' }) && Groups.insert({ name: 'github' })

! GroupMembers.findOne() && GroupMembers.insert({ userId: Meteor.users.findOne()._id, groupId: Groups.findOne()._id })
