export default {

  boolean(value) { return value },

  object(value, doc) {

    console.log(value)
    const linkFields = _.keys(_.get(value, 'link', {}))
    const allowFields = _.concat(_.get(value, 'allow', []), linkFields)
    console.log(allowFields)
    const denyFields = _.difference(_.keys(doc), allowFields)

    return {
      a: _.chain(doc)
        .keys()
        .difference(allowFields)
        .size()
        .value() ? false : true,

      b: denyFields
      }
  },

  undefined() { return false },

}
