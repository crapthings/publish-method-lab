export default {

  boolean(value) { return value },

  object(value, doc) {

    console.log(value)
    const linkFields = _.keys(_.get(value, 'link', {}))
    const allowFields = _.concat(_.get(value, 'allow', []), linkFields)
    console.log(allowFields)

    return _.chain(doc)
      .keys()
      .difference(allowFields)
      .size()
      .value() ? false : true
  },

  undefined() { return false },

}
