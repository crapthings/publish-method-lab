export default {

  boolean(value) { return value },

  object(value, doc) {
    return _.chain(doc)
      .keys()
      .difference(_.get(value, 'allow', []))
      .size()
      .value() ? false : true
  }

}
