const connectMongodb = () => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://localhost/TOPYS', { useUnifiedTopology: true, useNewUrlParser: true })
  var db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error;'))
  db.once('open', console.log.bind(console, 'connection success;'))
}
// export { initSchema }
module.exports.connectMongodb = connectMongodb
