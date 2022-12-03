# uniapp-jsbridge

## APP端

### 使用方法
* 监听 @message，此方法在 APP 中是实时监听 `<web-view :webview-styles="ws" :src="url" @message="message"></web-view>`
* 引用 `import { bridge } from '@/services/services.js'`
* 实现message方法
  ```js
  import {
    bridge,
  } from '@/services/services.js'

  export default {
    data() {
      return {
        ws: {
          progress: {
            color: 'red',
          },
        },
      }
    },
    onLoad(options) {
      options.url = '/hybrid/html/index.html'
      this.url = options.url || 'https://github.com/kvker/uniapp-jsbridge'
    },
    methods: {
      message(e) {
        let data = e.detail.data[0]
        bridge.regist(data)
          .then(() => {
            let currentWebview = this.$scope.$getAppWebview()
            let webview = currentWebview.children()[0]
            return bridge.callback(webview, data.key, {
              message: 'from uni'
            })
          })
          .catch(error => {
            uni.showToast({
              title: error.message,
              icon: 'error'
            })
          })
      }
    }
  }
  ```

## Web|H5端

* 引用相关类库，vconsole 方便调试、uni-webview 建立通信、bridge 为核心库
  ```js
  <script src="libs/vconsole.min.js"></script>
  <script src="libs/uni.webview.1.5.4.js"></script>
  <script src="libs/bridge.js"></script>
  <script src="js/index.js"></script>
  ```
* 实现 installedBridge 方法，这里直接调用 bridge，实际应该是某些操作调用
  ```js
  function installedBridge() {
    bridge.postMessage({
      key: 'USERINFO',
      callback: function(ret) {
        alert(JSON.stringify(ret))
      }
    })
  }
  ```
