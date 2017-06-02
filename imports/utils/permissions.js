export default {

  boolean(value) { return value },

  object(value, doc) {
    return _.size(_.difference(_.keys(doc), _.get(value, 'allow', []))) ? false : true
  }

}
