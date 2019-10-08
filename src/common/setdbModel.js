const { connectMongodb } = require('./connectMongodb')
const mongoose = require('mongoose')

connectMongodb() // 连接数据库

const initSchema = async () => {
  var Schema = mongoose.Schema
  var Activities
  var Video
  var Items
  var Inspire
  var Banner
  var activitiesSchema = new Schema({
    id: { type: String, required: true, unique: true },
    author: String,
    keyword: String,
    title: String,
    event_end_time: String,
    thumb: String,
    category_name: String
  }, { collection: 'activites' })

  var videoSchema = new Schema({
    id: { type: String, required: true, unique: true },
    title: String,
    desc: String,
    keyword: String,
    video_id: String,
    transform_id: String,
    thumb: String,
    video_time: String,
    add_time: String,
    video_play_url: String
  }, { collection: 'videos' })

  var itemsSchema = new Schema({
    image_src: { type: String, required: true, unique: true },
    big_desc: String,
    small_desc: String,
    author: String,
    cool: String,
    type: String
  }, { collection: 'items' })

  var inspireSchema = new Schema({
    id: { type: String, required: true, unique: true },
    user_guid: String,
    user_id: String,
    title: String,
    background_thumb: String,
    username: String,
    favourite: String
  }, { collection: 'inspires' })

  var bannerSchema = new Schema({
    bgUrl: { type: String, required: true, unique: true },
    text: String,
    aHref: String
  }, { collection: 'banners' })

  try { // 防止刷新重复加载服务器导致数据库一直被改写而报的错
    Activities = await mongoose.model('Activities')
    Video = await mongoose.model('Video')
    Items = await mongoose.model('Items')
    Inspire = await mongoose.model('Inspire')
    Banner = await mongoose.model('Banner')
  } catch (err) {
    Activities = await mongoose.model('Activities', activitiesSchema)
    Video = await mongoose.model('Video', videoSchema)
    Items = await mongoose.model('Items', itemsSchema)
    Inspire = await mongoose.model('Inspire', inspireSchema)
    Banner = await mongoose.model('Banner', bannerSchema)
  }
  return {
    Activities,
    Video,
    Items,
    Inspire,
    Banner
  }

  /*
  数据库层面达到，批量插入数据，去重问题。
  1.设置key为unique index
  2.insertMany插入多条文档，使用{ordered:false}跳过插入错误的文档，避免插入中断
  3.最后对插入重复值抛出的异常做处理。
  */
}

// export { initSchema }
module.exports.initSchema = initSchema
