const { getData } = require('../common/puppeteer')

const newsUrl = 'http://www.enread.com/news/'
const newsClass = '.list.fenlei .node'
const newsFun = list => {
  let newsArr = []// 保存整个news的数据
  list.map(node => { // 获取每个td片段
    if (node.innerHTML === '') return
    let className = node.querySelector('.title a').innerHTML // 每个词条所属的类名
    let classHref = node.querySelector('.title a').href // 对应类名的链接
    node.querySelectorAll('.box ul li').forEach(i => {
      let smallBlock = {}// 保存每条新闻信息
      let children = i.children
      smallBlock.classHref = classHref
      smallBlock.className = className
      smallBlock.href = children[0].href
      smallBlock.title = children[0].innerHTML
      smallBlock.date = children[1].innerHTML
      newsArr.push(smallBlock)
    })
  })
  return newsArr
}

const getNewsData = getData.bind(null, newsUrl, newsClass, newsFun)
module.exports = { getNewsData }
