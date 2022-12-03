new VConsole()

function installedBridge() {
  bridge.postMessage({
    key: 'USERINFO',
    callback: function(ret) {
      alert(JSON.stringify(ret))
    }
  })
}