const { initSchema } = require('./setdbModel')

const { activities } = require('../assets/data/activities')
const { inspire } = require('../assets/data/inspire_cook')
const { items } = require('../assets/data/items')
const { video } = require('../assets/data/video')

const insertdbData = (bannerData) => {
  initSchema().then(async res => {
    await res.Activities.insertMany(activities, { ordered: false }).then(res => {
      console.log('Activites初始化数据成功！')
    }).catch(err => {
      console.log('Activites初始化数据有出现错误：', err.result)
    })
    await res.Video.insertMany(video, { ordered: false }).then(res => {
      console.log('Video初始化数据成功！')
    }).catch(err => {
      console.log('Video初始化数据有出现错误：', err.result)
    })
    await res.Items.insertMany(items, { ordered: false }).then(res => {
      console.log('Items初始化数据成功！')
    }).catch(err => {
      console.log('Items初始化数据有出现错误：', err.result)
    })
    await res.Inspire.insertMany(inspire, { ordered: false }).then(res => {
      console.log('Inspire初始化数据成功！')
    }).catch(err => {
      console.log('Inspire初始化数据有出现错误：', err.result)
    })
    await res.Banner.insertMany(bannerData, { ordered: false }).then(res => {
      console.log('Banner初始化数据成功！')
    }).catch(err => {
      console.log('Banner初始化数据有出现错误：', err.result)
    })
    await process.exit(0)
  })
}

module.exports.insertdbData = insertdbData
