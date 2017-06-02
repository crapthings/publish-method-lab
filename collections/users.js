Meteor.isServer && Meteor.publish(null, function () {
  return Meteor.users.find({}, {
    fields: {
      services: false
    }
  })
})
