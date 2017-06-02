import typeOf from 'precise-typeof'

import permissions from '/imports/config/permissions'
import decide from '/imports/utils/permissions'

Meteor.methods({

  insert(collection, doc) {
    const currentUser = Meteor.users.findOne(this.userId)
    const currentRole = _.get(currentUser, 'role')
    const roleVal = _.get(permissions, `insert.${collection}.${currentRole}`)

    console.log(typeOf(roleVal))

    const step1 = decide[typeOf(roleVal)]
    const isAllow = step1(roleVal, doc)

    if (! isAllow)
      throw new Meteor.Error('insert', 'failed')

    return Mongo.Collection.get(collection).insert(doc)
  },

  update(collection, id, document) {
    return Mongo.Collection.get(collection).update(id, document)
  },

  remove(collection, id) {
    return Mongo.Collection.get(collection).remove(id)
  },

})
