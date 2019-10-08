const { initSchema } = require('./setdbModel')
let indexMsg = {}

const getdbData = async () => {
  const indexData = await initSchema().then(async res => {
    await res.Activities.find((err, docs) => {
      if (!err) {
        indexMsg.activites = docs
      }
    })
    await res.Items.find((err, docs) => {
      if (!err) {
        indexMsg.items = docs
      }
    })
    await res.Banner.find((err, docs) => {
      if (!err) {
        indexMsg.banner = docs
      }
    })
    await res.Inspire.find((err, docs) => {
      if (!err) {
        indexMsg.inspire = docs
      }
    })
    await res.Video.find((err, docs) => {
      if (!err) {
        indexMsg.video = docs
      }
    })
    // console.log(indexMsg, 'indexMsg')
    return indexMsg
  })
  return indexData
}

module.exports.getdbData = getdbData
