new VConsole()

let installed_bridge = false

function installedBridge() {
  installed_bridge = true
}

function clickButton(event) {
  let key = event.currentTarget.textContent
  if (!installed_bridge) alert('等待加载 bridge 完成')
  else bridge.postMessage({
    key,
    params: {
      url: '/pages/preview/preview'
    },
    callback: function(ret) {
      alert(JSON.stringify(ret))
    }
  })
}

function openWebviewPage() {
  let key = event.currentTarget.textContent
  if (!installed_bridge) alert('等待加载 bridge 完成')
  else bridge.postMessage({
    key,
    params: {
      url: 'https://github.com/kvker/uniapp-jsbridge'
    },
    callback: function(ret) {
      alert(JSON.stringify(ret))
    }
  })
}
