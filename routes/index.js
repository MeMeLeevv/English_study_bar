/* 
req.query

// GET /search?q=tobi+ferret  
req.query.q  
// => "tobi ferret"  

// GET /shoes?order=desc&shoe[color]=blue&shoe[type]=converse  
req.query.order  
// => "desc"  

req.query.shoe.color  
// => "blue"  

req.query.shoe.type  
// => "converse"  
req.body

// POST user[name]=tobi&user[email]=tobi@learnboost.com  
req.body.user.name  
// => "tobi"  

req.body.user.email  
// => "tobi@learnboost.com"  

// POST { "name": "tobi" }  
req.body.name  
// => "tobi"  
req.params

// GET /user/tj  
req.params.name  
// => "tj"  

// GET /file/javascripts/jquery.js  
req.params[0]  
// => "javascripts/jquery.js" 
req.param(name)

// ?name=tobi  
req.param('name')  
// => "tobi"  

// POST name=tobi  
req.param('name')  
// => "tobi"  

// /user/tobi for /user/:name   
req.param('name')  
// => "tobi"  
不难看出：

req.query： 处理 get 请求，获取 get 请求参数
req.params： 处理 /:xxx 形式的 get 或 post 请求，获取请求参数
req.body： 处理 post 请求，获取 post 请求体
req.param()： 处理 get 和 post 请求，但查找优先级由高到低为 req.params→req.body→req.query
*/
module.exports = function (app, gfs, upload, dbFun) {
  // @route GET /
// @desc Loads form
app.get('/', (req, res) => {
  /*   gfs.files.find().toArray((err, files) => {//往gfs里找文件，获取每个file的filename
      // Check if files
      if (!files || files.length === 0) {//如果没找到
        // res.render('index', { files: false });
      } else {
        console.log('获取根目录成功！')
        files.map(file => { //检索每个文件
          if (
            file.contentType === 'image/jpeg' || // 判断是否是图片
            file.contentType === 'image/png'
          ) {
            file.isImage = true;
          } else {
            file.isImage = false;
          }
        });
        res.json({ files: files })
        //res.render('index', { files: files });// 将所有文件传递到index里
      }
    }); */
  var sess = req.session;
  // console.log(sess, 'session')

  if (!!sess.auth) { // 以req.session.auth为标记，标记是否已经通过登录验证
    res.status('200').send({
      code: '1',
      data: {
        data: sess.data,// 通过验证，取出session保存的数据返回给前端
        msg: '验证登录态成功！'
      }
    })
  }
});

app.get('/getTheMemus',(req, res) => {
  //首先先查找是否存在重复注册状况
  //第一次注册则在表 req.body = { collectName：xxx, data:xxx } not Array
  let findData = {
    collectName: req.query.collectName,
    condition: { _id: req.query._id }
  }
  // console.log(findData, 'findData!!!!!!!!!!!!')

  dbFun.finddbData(findData).then(ress => { //{ collectName：xxx, condition:xxx } //先查询数据
    //res.status('200').send(ress[0]._id)
    // console.log(ress, 'getTheLessons.js get data!!!!!!!!!!!!!!')
      res.status('200').send(ress)// 返回array
  })
})

app.get('/getStarArr',(req, res) => {
  //首先先查找是否存在重复注册状况
  //第一次注册则在表 req.body = { collectName：xxx, data:xxx } not Array
  let findData = {
    collectName: req.query.collectName,
    condition: { _idArr: req.query._idArr }
  }
  console.log(findData, 'findData!!!!!!!!!!!!')

  dbFun.findSameCollArrData(findData).then(ress => { //{ collectName：xxx, condition:xxx } //先查询数据
    //res.status('200').send(ress[0]._id)
    // console.log(ress, 'getTheLessons.js get data!!!!!!!!!!!!!!')
      res.status('200').send(ress)// 返回array
  })
})

app.get('/getTheLessons',(req, res) => {
  //首先先查找是否存在重复注册状况
  //第一次注册则在表 req.body = { collectName：xxx, data:xxx } not Array
  let findData = {
    collectName: req.query.collectName,
  }
  if (!!req.query.category) {
    findData.condition = { category: req.query.category } // 按分类去查询
  } else if ( !!req.query._id ) {
    findData.condition = { _id: req.query._id} // 按id去查询
  }
  // console.log(req.query, 'findData!!!!!!!!!!!!')

  dbFun.finddbData(findData).then(ress => { //{ collectName：xxx, condition:xxx } //先查询数据
    //res.status('200').send(ress[0]._id)
    // console.log(ress, 'getTheLessons.js get data!!!!!!!!!!!!!!')
    res.status('200').send(ress)
  })
})

/* 往数据库的对应表添加一条数据 */
app.post('/updateTheLesson', (req, res) => {
  let findData = {
    collectName: req.body.collectName,
    condition: { _id: req.body.condition._id },
    updata: req.body.updata
  }
  // console.log(findData, 'updateTheLesson!!!!!!!!!!!!')

  dbFun.findByIdAndUpdate(findData).then(ress => { //{ collectName：xxx, condition:xxx } //先查询数据
    //res.status('200').send(ress[0]._id)
    // console.log(ress, 'updateTheLesson.js get data!!!!!!!!!!!!!!')
    res.status('200').send(ress)
  })
});

/* 往数据库的对应表添加一条数据 */
app.post('/updateTheSection', (req, res) => {
  let findData = {
    collectName: req.body.collectName,
    condition: { _id: req.body.condition._id },
    updata: req.body.updata
  }
  // console.log(findData, 'updateTheLesson!!!!!!!!!!!!')

  dbFun.findOneAndUpdate(findData).then(ress => { //{ collectName：xxx, condition:xxx } //先查询数据
    //res.status('200').send(ress[0]._id)
    // console.log(ress, 'updateTheLesson.js get data!!!!!!!!!!!!!!')
    res.status('200').send(ress)
  })
});

/* 往数据库的对应表添加一条数据 */
app.post('/updateUserData', (req, res) => {
  let findData = {
    collectName: req.body.collectName,
    condition: { _id: req.body.condition._id },
    updata: req.body.updata
  }
  // console.log(findData, 'updateTheLesson!!!!!!!!!!!!')

  dbFun.findOneAndUpdate(findData).then(ress => { //{ collectName：xxx, condition:xxx } //先查询数据
    //res.status('200').send(ress[0]._id)
    // console.log(ress, 'updateTheLesson.js get data!!!!!!!!!!!!!!')
    res.status('200').send(ress)
  })
});



/* 往数据库的对应表添加一条数据 */
app.post('/saveColletion', (req, res) => {
  // console.log(req.body, 'req.body') // req.body = [{ collectName：xxx, data:xxx }]
  dbFun.insertdbData(req.body).then(ress => { //ress范回对象数组这里还需要状态区分，如果是空对象status就需要返回其他error状态
    res.status('200').send(ress[0])
    // console.log(ress, 'saveColletion.js get data!!!!!!!!!!!!!!')
  })
});

// 删除
app.get('/remove', (req, res) => {
  let findData = {
    collectName: req.query.collectName,
    condition: {_id: req.query._id}
  }
  // console.log(req.query, 'findData!!!!!!!!!!!!')

  dbFun.remove(findData).then(ress => { //{ collectName：xxx, condition:xxx } //先查询数据
    //res.status('200').send(ress[0]._id)
    // console.log(ress, 'getTheLessons.js get data!!!!!!!!!!!!!!')
    res.status('200').send(ress)
  })
});

// 注册
app.post('/register', (req, res) => {
  //首先先查找是否存在重复注册状况
  //第一次注册则在表 req.body = { collectName：xxx, data:xxx } not Array
  let findData = {
    collectName: req.body.collectName,
    condition: { account: req.body.data.account } // 按账号去查询
  }

  dbFun.finddbData(findData).then(ress => { //{ collectName：xxx, condition:xxx } //先查询数据
    //res.status('200').send(ress[0]._id)
    //  console.log(ress, 'app.js get data!!!!!!!!!!!!!!')
    if (ress.length === 0) { // 新用户，插入新数据
      dbFun.insertdbData([req.body]).then(ress => { //ress范回对象数组这里还需要状态区分，如果是空对象status就需要返回其他error状态
        res.status('200').send({
          code: '1',
          data: {
            id: ress[0]._id,
            msg: '注册成功！'
          }
        })
        // console.log(ress, 'register get data!!!!!!!!!!!!!!')
      })
    } else { // 重复注册！
      res.status('200').send({
        code: '2',
        data: {
          id: ress[0]._id,
          msg: '重复注册!请返回登陆！'
        }
      })
      // console.log(ress, '重复注册!请返回登陆！')
    }
  })
})

// 登录
app.post('/login', (req, res) => { // 在这里的请求的session每次都不一样
  //首先先查找是否有此账户，有则直接登陆
  //没有则跳转到注册页面
  var body = req.body
  let findData = {
    collectName: body.collectName,
    condition: { account: body.data.account } // 按账号去查询
  }
  console.log('login!!!!')
  dbFun.finddbData(findData).then(ress => { //{ collectName：xxx, condition:xxx } //先查询数据
    // 存在此用户，检测密码
    if(ress.length === 0) {
      return res.status('200').send({
        code: '0',
        data: {
          msg: '账号不存在，请注册！'
        }
      })
    }
    if (ress[0].password === body.data.password) {
      req.session.regenerate(function (err) {// 重新生成新的session
        if (err) {
          return res.status('200').send({
            code: '2',
            data: {
              msg: '登陆失败！请重试！'
            }
          })
        }
        req.session.data = ress[0];
        req.session.auth = true // 登录成功设置标记为true
        res.status('200').send({
          code: '1',
          data: {
            data: ress[0],
            msg: '登陆成功！'
          }
        })
      });
    } else {
      res.status('200').send({
        code: '2',
        data: {
          msg: '账号或者密码错误！请重试！'
        }
      })
    }
  })
})


/* GET logout page. */
app.get("/logout",function(req,res){    // 到达 /logout 路径则登出， session中user,error对象置空，并重定向到根路径
  req.session.data = null;
  req.session.auth = false 
  res.status('200').send({
    code: '2',
    data: {
      msg: '登出成功！'
    }
  })
});

// @route POST /upload
// @desc  Uploads file to DB
app.post('/uploadFile', upload.single('file'), (req, res) => { // 每次只能上传一个文件
  //res.send({ file: req.file }); // 对应着name = file 来取得具体file的信息
  // console.log(res.req.file, 'res.req.file')
  res.status('200').send({
    filename: res.req.file.filename,
    id: res.req.file.id
  })
  //res.redirect('/');//继续回到根目录
});

// @route GET /files
// @desc  Display all files in JSON
app.get('/videos', (req, res) => { // 访问所有文件，输入到前端界面
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }

    // Files exist
    return res.json(files);
  });
});

// @route GET /files/:filename
// @desc  Display single file object
app.get('/videos/:filename', (req, res) => { // 利用filename取得具体的文件
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    if (file.contentType === 'video/mp4') {
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
      // return res.json(file);
    } else {
      res.status(404).json({
        err: 'Not an video'
      });
    }
  });
});

// @route GET /image/:filename
// @desc Display Image
app.get('/images/:filename', (req, res) => {
  // console.log(gfs, 'gfs!!!!!!!!!!!!!!!!')
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
      });
    }
  });
});

// @route DELETE /files/:id
// @desc  Delete file
app.delete('/videos/:id', (req, res) => {
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }

    //res.redirect('/');
  });
});
}
