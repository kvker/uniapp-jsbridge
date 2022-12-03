<template>
  <web-view :webview-styles="ws" :src="url" @message="message"></web-view>
</template>

<script>
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
      this.url = options.url || '/hybrid/html/index.html'
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
</script>

<style>
  web-view {
    width: 100vw;
    height: 100vh;
  }
</style>
