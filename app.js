var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const mongoose = require('mongoose')
const Grid = require('gridfs-stream')

var routers = require('./routes/index');

var app = express(); // 生成一个express实例 app

var gfs;
const mongoURI = 'mongodb://develop:developpwd@116.62.104.196:27017/blog'

// view engine setup
app.set('views', path.join(__dirname, 'views')); // 设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,dirname 为全局变量,存储当前正在执行的脚本所在的目录。
// app.set('view engine', 'ejs'); // 设置视图模板引擎为 ejs

app.use(logger('dev')); // 加载日志中间件
app.use(express.json()); // 加载解析json的中间件。
app.use(express.urlencoded({ extended: false })); // 加载解析urlencoded请求体的中间件
app.use(cookieParser()); // 加载解析cookie的中间件。
app.use(express.static(path.join(__dirname, 'public'))); // 设置public文件夹为存放静态文件的目录。



// 使用 session 中间件
app.use(session({
  secret: 'blog', // 对session id 相关的cookie 进行签名
  resave: true,
  saveUninitialized: false, // 是否保存未初始化的会话
  cookie: {
    maxAge: 1000 * 60 * 10, // 设置 session 的有效时间，单位毫秒
  },
  store: new FileStore() // 指明使用文件存储
}));



// Init gfs

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {//修改文件名字 生成加密安全的随机数据
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);// toString('hex')对应 16进制
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'//后端数据库collect名字为：[bucketName].chunks(文件分块区)/[bucketName].files(文件数索引区)
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


/* 连接数据库 */
mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true })
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error;'))
db.once('open', () => {
  console.log('mongodb连接成功!!!!!!!!!!!!!!!!!!!!!!!!')
  gfs = Grid(db.db, mongoose.mongo)
  gfs.collection('uploads')
})

/* 连接数据库后并设置好model */
// let { initSchema } = require('./setdbModel') // 引入配置好的model
let { insertdbData, finddbData, findOneAndUpdate, findByIdAndUpdate, remove, findSameCollArrData } = require('./routes/dbFuc') // 引入配置好的model
// insertdbData(arrData)// 传入搭配有数据库collection名称和相应数据的数组

// 将操作数据库的方法导入路由页面
routers(app, gfs, upload, { insertdbData, finddbData, findOneAndUpdate, findByIdAndUpdate, remove, findSameCollArrData });

// catch 404 and forward to error handler
app.use(function(req, res, next) { // 捕获404错误，并转发到错误处理器。
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) { // 开发环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');  如果您不使用视图引擎，则res.render内容将引发错误。
  res.json({ 
    message: err.message,
    error: err
  })
});

module.exports = app;
