// const { connectMongodb } = require('./connectMongodb')
const mongoose = require('mongoose')
// const { gfs } = connectMongodb() // 连接数据库


const initSchema = async () => {
  var Schema = mongoose.Schema
  // 课程信息
  var lessonInfos // model实例承载者！！！！！！！这个对应collectName，
  var lessonInfoSchema = new Schema({ // 制定lessonInfo的数据规则
    name: String,
    price: String,
    duration: String,
    degree: String,
    content: String,
    info: String,
    category: String,
    uploadTime:String,
    file: {
      filename: String,
      id: String
    },
    teacherId: String,
    lessonId: String,
  }, { collection: 'lessoninfos' })// 设定collection的名字，否则数据库会自动帮你的名字复

    // 目录信息
    var menus // model实例承载者！！！！！！！这个对应collectName，
    var menuSchema = new Schema({ // 制定lessonInfo的数据规则
      lessonId: String,
      memuList: [
        {
          chapterTitle: String,
          disabled: Boolean,
          sections: []
        }
      ]
    }, { collection: 'menus' })// 设定collection的名字，否则数据库会自动帮你的名字复

  // 用户信息
  var userDatas // model实例承载者！！！！！！！这个对应collectName，
  var userDataSchema = new Schema({ // 制定lessonInfo的数据规则
    account: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // price: { type: String, required: true, unique: true },
    name: String,
    avatar: String,
    learned: [{ id: String, progress: Number }],//学习进度，{id:'',progress:2}每学一个课时就加一
    star: Array, //收藏
    buyed: Array, // 已购课程
    right: Number,
    desc:String // 个性签名
  }, { collection: 'userdatas' })/* 设定collection的名字，否则数据库会自动帮你的名字复数 */


    // 管理者信息
    var administrators // model实例承载者！！！！！！！这个对应collectName，
    var administratorsSchema = new Schema({ // 制定lessonInfo的数据规则
      account: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      name: String,
      avatar: String,
      right: Number,
      desc: String // 个性签名
    }, { collection: 'administrators' })/* 设定collection的名字，否则数据库会自动帮你的名字复数 */


  try { // 防止刷新重复加载服务器导致数据库一直被改写而报的错
    lessonInfos = await mongoose.model('lessoninfos')
    userDatas = await mongoose.model('userdatas')
    menus = await mongoose.model('menus')
    administrators = await mongoose.model('administrators')
  } catch (err) {
    lessonInfos = await mongoose.model('lessoninfos', lessonInfoSchema) // 第一次渲染模型需要初始化规则
    userDatas = await mongoose.model('userdatas', userDataSchema) // 第一次渲染模型需要初始化规则
    menus = await mongoose.model('menus', menuSchema) // 第一次渲染模型需要初始化规则
    administrators = await mongoose.model('administrators', administratorsSchema) // 第一次渲染模型需要初始化规则
  }
  return {
    lessonInfos,
    userDatas,
    menus,
    administrators
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
// module.exports.gfs = gfs
