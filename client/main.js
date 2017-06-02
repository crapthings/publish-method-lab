const ErrorMessage = new ReactiveVar()

Template.login.events({
  'click #btnLogout'() {
    ErrorMessage.set(null)
    Meteor.logout()
  },

  'click #btnLoginUser'() {
    Meteor.loginWithPassword('user', '123', function (err) {
      if (err)
        return ErrorMessage.set(JSON.stringify(err))

      ErrorMessage.set(null)
    })
  }

})

Template.insert.events({
  'click button#insert1'() {
    Meteor.call('insert', 'posts', {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      groupId: _.get(Groups.findOne(), '_id'),
    }, function (err, resp) {
      if (err)
        return ErrorMessage.set(JSON.stringify(err))
    })
  },

  'click button#insert2'() {
    Meteor.call('insert', 'posts', {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      groupId: _.get(Groups.findOne(), '_id'),
      blah: true,
      wrongfield: 'aaa',
    }, function (err, resp) {
      if (err)
        return ErrorMessage.set(JSON.stringify(err))

      ErrorMessage.set(null)
    })
  },
})

Template.inspector.helpers({
  error() {
    return ErrorMessage.get()
  },

  user() {
    return JSON.stringify(Meteor.user())
  },

  groups() {
    return Groups.find().map(d => JSON.stringify(d))
  },

  gms() {
    return GroupMembers.find().map(d => JSON.stringify(d))
  },

  posts() {
    return Posts.find().map(d => JSON.stringify(d))
  },
})
