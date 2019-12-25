export function storeLocalData (stateArr) {
  /* 需要的参数格式为: [[key, value]] */
  stateArr.forEach(e => {
    localStorage.setItem(e[0], JSON.stringify(e[1]))
  })
}

export function getLocalData (stateArr) {
  /* 需要的参数格式为: [key] */
  let result = []
  stateArr.forEach(e => {
    result.push(JSON.parse(localStorage.getItem(e)))
  })
  return result
}

export function throttle (fnArr, time) {
  // 防抖和节流
  let start = Date.now()
  let timer = null // Date.now() 方法返回自1970年1月1日 00:00:00 UTC到当前时间的毫秒数。
  return function () {
    let millis = Date.now() - start
    if (millis < 100) {
      // 时间间隔小于1s
      clearTimeout(timer) // 清除定时器
      window.thorttle = setTimeout(function () {
        // 时间不大于间隔，但是可以实现最后一次可以触发定时器
        fnArr.forEach(item => {
          item()
        })
      }, time)
    } else {
      fnArr.forEach(item => {
        // 每隔一个间隔触发一次定时器
        item()
      })
      start = Date.now()
    }
  }
}

export function isVideoFile (ext) {
  return (
    [
      'flv', 'mp4', 'avi', 'wmv', 'mpg', 'mov', 'mkv', 'f4v', 'm4v', 'rmvb', 'rm', '3gp'
    ].indexOf(ext) !== -1
  )
}

export function isImage (ext) {
  return (
    [
      'png',
      'jpg',
      'jpeg',
      'bmp',
      'gif',
      'webp',
      'psd',
      'svg',
      'tiff'
    ].indexOf(ext) !== -1
  )
}
