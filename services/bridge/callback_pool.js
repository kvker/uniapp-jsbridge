export default {
  // 默认均为异步
  USERINFO: () => Promise.resolve(uni.getStorageSync('userinfo') || {
    info: "无用户信息"
  }),
  OPEN_PAGE: (url) => Promise.resolve(uni.navigateTo({
    url
  })),
  OPEN_WEBVIEW_PAGE: (url) => Promise.resolve(this.routeToSync(url)),
  SYSTEM_INFO: () => Promise.resolve(uni.getSystemInfoSync()),
  DEVICE: () => Promise.resolve(plus.device),
  // 同步方法
  CLOSE_CURRENT_PAGE_SYNC: () => uni.navigateBack(),
  RELAUNCH_SYNC: () => uni.reLaunch(),
  BACK_PAGE_SYNC: (delta) => uni.navigateBack({
    delta
  }),
}
