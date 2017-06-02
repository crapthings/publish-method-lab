import typeOf from 'precise-typeof'

import permissions from '/imports/config/permissions'
import decide from '/imports/utils/permissions'

Meteor.methods({

  insert(collection, doc) {
    const currentUser = Meteor.users.findOne(this.userId)
    const currentRole = _.get(currentUser, 'role')
    const roleVal = _.get(permissions, `insert.${collection}.${currentRole}`)

    console.log(typeOf(roleVal), roleVal)

    if (roleVal && roleVal.link) {
      const linkKeys = _.keys(roleVal.link)
      _.each(linkKeys, function (key) {
        const linkId = _.get(doc, key)
        const [ targetCollection, linkCollection ] = _.first(_.toPairs(roleVal.link[key]))
        const targetDoc = Mongo.Collection.get(targetCollection).findOne(linkId)

        console.log(targetDoc, linkDoc)

        if (! targetDoc)
          throw new Meteor.Error('insert', '相关文档不存在。')

        const linkDoc = Mongo.Collection.get(linkCollection).findOne({ [key]: targetDoc._id, userId: currentUser._id })

        if (! linkDoc)
          throw new Meteor.Error('insert', '用户不在条件集合。')

      })
    }


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
