// vue.config.js

var saveOrGet = 0 // 正常运行网页（输入“0”）|| 存数据（输入“1”）,会自动结束进程！！

const config = {
  publicPath: '/',
  // 选项...
  devServer: {
    port: 8080, // 端口号
    host: 'localhost',
    https: false, // https:{type:Boolean}
    open: false, // 配置自动启动浏览器
    hotOnly: true,
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    /* proxy: {
      '/': {
        target: 'https://m.topys.cn/', // 需要请求的地址
        ws: true,
        changeOrigin: true // 是否跨域
      }
    } // 配置多个代理 */
    before (app, server) {
      /*  app.get('/', async (req, res) => {
          const data = await getAllData.getAllData()
          console.log(data, 'getAllData')
          // console.log(req, 'req')
          console.log(res, 'res')
          // res.json(data)
          res.req.IncomingMessage.client.next()
        }) */
    },
    after (app, server) {
      if (saveOrGet === 0) {
        const { getdbData } = require('./src/common/getdbData')
        // 监听客户端路由，到数据库中取首页数据，然后送到客户端中
        app.get('/indexData', async (req, res) => {
          // 获取数据库数据
          const indexMsg = await getdbData()
          // console.log(indexMsg, 'indexMsg')
          // 向客户端发送数据
          res.json(indexMsg)
        })
      } else if (saveOrGet === 1) { // 存数据
        const { getBanner } = require('./src/api/getBanner')
        const { insertdbData } = require('./src/common/insertdbData')
        const axios = require('axios')
        let articleReq = 'https://www.topys.cn'

        axios.get(articleReq, { // 立即取得banner数据
          headers: {
            referer: articleReq,
            host: new URL(articleReq).host
          }
        }).then(async respp => {
          // 解析banner,存入到数据库
          let data = respp.data
          let bannerData = await getBanner(data)
          await insertdbData(bannerData)
        }).catch(err => {
          console.log(err)
        })
      }
    }
  },
  parallel: require('os').cpus().length > 1
}
// app.use('/', apiRoutes)
module.exports = config
