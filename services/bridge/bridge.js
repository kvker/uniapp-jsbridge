import callback_pool from './callback_pool.js'

export default new class Bridge {
  constructor() {
    this.callback_pool = callback_pool
  }

  routeToSync(url) {
    let [host, query] = url.split('?')
    if (query && query.includes('login=') && !uni.getStorageSync('userinfo')) {
      uni.showToast({
        title: '未登录',
        icon: 'none'
      })
      uni.navigateTo({
        url: '/pages/account/login/login'
      })
    } else {
      uni.navigateTo({
        url: `/pages/bridge/bridge?url=${url}`
      })
    }
  }

  /**
   * 注册事件
   * @param {object} data {params: object, key: string}
   */
  regist(data) {
    const {
      params,
      key
    } = data
    return this.checkKey(key)
  }

  /**
   * 回调，若没有key则会一次性执行所有的回调
   */
  callback(webview, key, data = {}) {
    return this.checkKey(key)
      .then(() => this.callback_pool[key]())
      .then(params => this.runJS(webview, `bridge.reciveHandler('${key}', ${JSON.stringify({ ...params, ... data })})`))
      .then((ret) => console.log('runJS结束，返回值为: ' + ret))
  }

  /**
   * @param {string} js 运行网页js，若有回调则继续执行回调
   */
  runJS(webview, js) {
    return new Promise((resolve, reject) => {
      if (typeof(js) === 'string' && js.trim().length) {
        resolve(webview.evalJS(js))
      } else {
        console.error({
          js
        })
        reject(new Error('脚本异常'))
      }
    })
  }

  // 工具
  checkKey(key) {
    return new Promise((resolve, reject) => {
      if (this.callback_pool[key]) resolve(true)
      else reject(this.errorSync('非法key'))
    })
  }

  errorSync(message) {
    return new Error(message)
  }
}
