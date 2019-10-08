const puppeteer = require('puppeteer')// 不可再前端浏览器页面执行puppeteer，它本来就是被赋予是headless
/* 使用vue-cli3.0引用puppeteer时会出现error
< This dependency was not found:
* ws in ./node_modules/puppeteer/lib/WebSocketTransport.js >
解决方法为：
使用npm正常安装好ws依赖之后，删除node_modules/puppeteer/package.json中的
这一行
...
"browser": {
...
    "ws": "./utils/browser/WebSocket",
...
就可以正常运行了

*/

const url = 'https://www.topys.cn/'
const bannerClass = 'div.swiper-slide'

async function getAllData () { // 运行速度非常慢
  console.log('1')
  const browser = await puppeteer.launch({
    args: [
      '–disable-gpu',
      '–disable-dev-shm-usage',
      '–disable-setuid-sandbox',
      '–no-first-run',
      '–no-sandbox',
      '–no-zygote',
      '–single-process'
    ]
  })
  console.log('2')
  const page = await browser.newPage()
  await page.goto(url)
  console.log('gotopage')
  console.log('setViewport')
  const getBanner = await page.$$eval(bannerClass, item => item.href)
  browser.close()
  return getBanner
  // console.log(getBanner, 'banner')
}

// getAllData()

module.exports = { getAllData }
