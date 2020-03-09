const { initSchema } = require('./setdbModel') // 引入配置好的model

/* 存数据：在网站爬取的数据全部通过insertdbData的参数传到这里，然后插入到数据库中（有重复的数据数据库会跳过继续插入新的数据，
之后便在）setdbModel那里需要规范一下要插入的数据模式，最好在参数传进来的时候以下代码全部可以复用，参数格式类似
{ collectName：xxx, data:xxx }
*/

/* 按照条件查找
1、注册时候先查找是否有次账号
*/

const finddbData = async (Data) => { // 传入搭配有数据库collection名称和相应数据的数组
  /* 这里return范回的数据就是setModel里最后return的那些实例对象，所以res.xxx取到的就是那个存在着的具体的collection实例了，实例才会有那些增删改查方法！ */
  return initSchema().then(async res => { // 循环每个collection的数据插入数据库中
      let name = Data.collectName /* 取setModel的实例名 */
      let condition = Data.condition
      //模糊查询
      // console.log(condition, 'condition!!!!!!!!!!!!')
      return await res[name].find(condition, function (err, res) {
        if (err) {
          return 'you get a null res!please try again' + err
        }
        else {
          // console.log("Res:" + res);
          return res
        }
      })
    // await process.exit(0)
  })
}

const findSameCollArrData = async (Data) => { // 寻找相同表下符合条件的所有数据type = Array
  /* 这里return范回的数据就是setModel里最后return的那些实例对象，所以res.xxx取到的就是那个存在着的具体的collection实例了，实例才会有那些增删改查方法！ */
  return initSchema().then(async res => { // 循环每个collection的数据插入数据库中
      let name = Data.collectName /* 取setModel的实例名 */
      let _idArr = Data.condition._idArr
      let condition = []
      for (let i = 0; i < _idArr.length; i++) {
        condition.push({_id: _idArr[i]})
      }
      //模糊查询
      console.log(condition, 'condition!!!!!!!!!!!!')
      return await res[name].find({
        $or: condition
      }, function (err, res) {
        if (err) {
          return 'you get a null res!please try again' + err
        }
        else {
           console.log("Res:" + res);
          return res
        }
      })
    // await process.exit(0)
  })
}

const findOneAndUpdate = async (Data) => { // 传入搭配有数据库collection名称和相应数据的数组
  /* 这里return范回的数据就是setModel里最后return的那些实例对象，所以res.xxx取到的就是那个存在着的具体的collection实例了，实例才会有那些增删改查方法！ */
  return initSchema().then(async res => { // 循环每个collection的数据插入数据库中
      let name = Data.collectName /* 取setModel的实例名 */
      let condition = Data.condition // 查询条件
      let updata = Data.updata // 只需要列出要更新的数据
      let options = {upsert: true, new: true, setDefaultsOnInsert: true}; 
      //模糊查询
      return await res[name].findOneAndUpdate(condition, updata, options) // 返回被更新的整条数据
    // await process.exit(0)
  })
}

const findByIdAndUpdate = async (Data) => { // 传入搭配有数据库collection名称和相应数据的数组
  /* 这里return范回的数据就是setModel里最后return的那些实例对象，所以res.xxx取到的就是那个存在着的具体的collection实例了，实例才会有那些增删改查方法！ */
  return initSchema().then(async res => { // 循环每个collection的数据插入数据库中
      let name = Data.collectName /* 取setModel的实例名 */
      let id = Data.condition._id // 查询条件
      let updata = Data.updata // 只需要列出要更新的数据
      //模糊查询
      // console.log(Data, 'findById!!!!!!!!!!!!!!!!')
      return await res[name].findByIdAndUpdate(id, updata) // 返回被更新的整条数据
    // await process.exit(0)
  })
}

const remove = async (Data) => { // 传入搭配有数据库collection名称和相应数据的数组
  /* 这里return范回的数据就是setModel里最后return的那些实例对象，所以res.xxx取到的就是那个存在着的具体的collection实例了，实例才会有那些增删改查方法！ */
  return initSchema().then(async res => { // 循环每个collection的数据插入数据库中
      let name = Data.collectName /* 取setModel的实例名 */
      let condition = Data.condition // 查询条件
      // console.log(Data, 'remove!!!!!!!!!!!!!!!!')
      return await res[name].remove(condition, function(err, res) {
        if (err) {
          return 'remove nothing!please try again' + err
        }
        else {
          // console.log("Res:" + res);
          return res
        }
      })
  })
}

/* 存数据：在网站爬取的数据全部通过insertdbData的参数传到这里，然后插入到数据库中（有重复的数据数据库会跳过继续插入新的数据，
之后便在）setdbModel那里需要规范一下要插入的数据模式，最好在参数传进来的时候以下代码全部可以复用，参数格式类似
{ collectName：xxx, data:xxx }
*/

const insertdbData = async (arrData) => { // 传入搭配有数据库collection名称和相应数据的数组
  /* 这里return范回的数据就是setModel里最后return的那些实例对象，所以res.xxx取到的就是那个存在着的具体的collection实例了，实例才会有那些增删改查方法！ */
  return initSchema().then(async res => { // 循环每个collection的数据插入数据库中
    for (let i = 0, len = arrData.length; i < len; i++) {
      let name = arrData[i].collectName /* 取setModel的实例名 */
      let data = arrData[i].data
      console.log(data,'data!!!!!!!!!!!!!!')
      return await res[name].insertMany(data, { ordered: false }).then(res => { // { ordered: false } 遇到重复项不报错，继续插入下一项
        console.log(res, 'you get the res!!!!!!!!!!!!!!!!!!!!!!')
        if (res.length > 0) {/* 返回对象数组 */
          return res
        } else {
          return 'you get a null res!please try again'
        }
        // console.log(`${name}初始化数据成功！`)
      }).catch(err => {
        console.log(`${name}初始化失败，错误为:${err}`)
      })
    }
    // await process.exit(0)
  })
}

module.exports.insertdbData = insertdbData
module.exports.finddbData = finddbData
module.exports.findOneAndUpdate = findOneAndUpdate
module.exports.findByIdAndUpdate = findByIdAndUpdate
module.exports.remove = remove
module.exports.findSameCollArrData = findSameCollArrData
