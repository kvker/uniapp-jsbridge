document.addEventListener('UniLoaded', function() {
  if (window.installedBridge) {
    installedBridge()
  }
})

window.bridge = new class Bridge {
  constructor() {
    console.log('bridge init success')
    this.adapter()
    this.callback_pool = {}
  }

  adapter() {
    document.addEventListener('UniAppJSBridgeReady', () => {
      uni.getEnv(({
        h5,
        plus
      }) => {
        let event = new Event('UniLoaded')
        event.plus = plus
        event.h5 = h5
        this.instance = uni
        if (plus) {
          bridge.postMessage({
            key: 'USERINFO',
            callback: userinfo => {
              localStorage.setItem('userinfo', JSON.stringify(userinfo))
              bridge.postMessage({
                key: 'DEVICE',
                callback: device => {
                  localStorage.setItem('device', JSON.stringify(device))
                  document.dispatchEvent(event)
                }
              })
            }
          })
        } else {
          document.dispatchEvent(event)
        }
      })
    })
  }

  /**
   * 传参事件
   * @param {object} data {params: object, key: string, callback: function}
   */
  postMessage(data) {
    let {
      key,
      callback
    } = data
    if (!this.instance) this.instance = uni // 这行主要是调试用，必要注释，不影响
    return new Promise((resolve, reject) => {
      if (key) {
        console.log('bridge key: ' + key)
        this.callback_pool[key] = callback // 注册回调
        this.instance.postMessage({
          data
        })
        resolve(true)
      } else {
        reject('请写入key')
      }
    })
  }

  /**
   * 接收处理，提供给移动端调用
   * @param {string} key 事件key
   * @param {object} params 返回的参数
   */
  reciveHandler(key, params) {
    // console.log(key, params)
    return new Promise((resolve, reject) => {
      if (key) {
        let callback = this.callback_pool[key]
        callback && callback(params)
        resolve(true)
      } else {
        reject('回调无key')
      }
    })
  }
}
