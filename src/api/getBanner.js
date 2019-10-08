const cheerio = require('cheerio')
// const { initSchema } = require('../common/setdbModel')

const bannerWrapper = '.swiper-wrapper'
const bannerClass = 'div.swiper-slide'

let bannerData = []

const getBanner = (data) => {
  // console.log(data, 'data')
  const $ = cheerio.load(data)
  const preUrl = 'https://m.topys.cn/'

  $(bannerWrapper).find(bannerClass).each((index, elem) => {
    let bannerItem = {}
    let target = $(elem).children()[0]
    // console.log(elem, 'this')
    // 匹配背景图片
    // console.log(elem.children[1].children, 'text')
    // let bgUrl = elem.attribs.style.match(/background-image:url\('(\S+)'\)/)[1]
    // 修改背景图片尺寸以及限制条件
    elem.children[1].children.forEach(item => {
      if (item.name === 'img') {
        // console.log(item)
        bannerItem.bgUrl = item.attribs['data-src']
      }
    })
    // bannerItem.bgUrl = bgUrl.replace(/(\S+h_)\d{3}(,w_)\d{3}/, '$1434$21085,limit_1/format,webp')
    // banner描述词
    try {
      bannerItem.text = target.children[1].children[0].data
    } catch (err) {
      bannerItem.text = ''
    }
    // 点击链接
    bannerItem.aHref = preUrl + target.attribs.href
    bannerData.push(bannerItem)
  })

  // console.log(bannerData, 'banner-data')

  return bannerData
}

// export { getBanner }客户端能，对应import
module.exports.getBanner = getBanner// 服务器能，对应require
