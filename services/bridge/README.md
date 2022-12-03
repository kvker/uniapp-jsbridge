## 示例

USERINFO
```js
// H5调用
clickUni() {
  bridge.postMessage({
    key: 'USERINFO',
    callback: (params) => {
      alert(JSON.stringify(params))
    }
  })
}

// uniapp处理
message(e) {
  let data = e.detail.data[0]
  bridge.regist(data)
    .then(params => {
      return console.log(params)
    })
    .then(() => {
      let currentWebview = this.$scope.$getAppWebview()
      let webview = currentWebview.children()[0]
      return bridge.callback(webview, data.key, {
        message: 'from uni'
      })
    })
    .catch(error => {
      ui.toast(error.message)
    })
}

```

## query参数

|字段|类型|说明|
|-|-|-|
|login|boolean|需要登录|