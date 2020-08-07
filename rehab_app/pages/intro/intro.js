// pages/chooseMode/chooseMode.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    partName: null,
    day: null,
    viewIdx: 0,
    informationList: null,
    playList: [],
    showModalStatus: false,
    animationData: null,
    isDefault: null
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    this.setData({
      partName: options.partName,
      day: options.day,
      informationList: app.globalData.partInformationList[options.partName]
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },
  changeStyle: function (e) {
    var idx = e.currentTarget.dataset.index
    this.setData({
      viewIdx: idx
    })
  },
  jumpPageDefault: function () {
    var that = this
    var partName = that.data.partName
    var day = that.data.day
    this.setData({
      isDefault: true
    })
    var isDefault = this.data.isDefault
    wx.navigateTo({
      url: '../preparation/preparation?partName=' + partName + '&day=' + day + '&isDefault={{true}}'
    })
  },

  jumpPageCustom: function () {
    var that = this
    var partName = that.data.partName
    var day = that.data.day
    var playList = that.data.playList
    this.setData({
      isDefault: false
    })
    var isDefault = this.data.isDefault
    wx.navigateTo({
      url: '../chooseMode/chooseMode?partName=' + partName + '&day=' + day
    })
  },

  addVideo: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index + 1;//每一个button的索引
    var playList = that.data.playList
    console.log('add' + index)
    console.log(this.data.playList)
    playList.push(index)
    this.setData({
      playList: playList
    })
    console.log(this.data.playList)
  },

  removeVideo: function (e) {
    var idx = e.currentTarget.id
    var playList = this.data.playList
    playList.splice(idx, 1)
    this.setData({
      playList: playList
    })
  },

  showModal: function () {
    var that = this
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  },

  hideModal: function () {
    var that = this
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: false
    })
    setTimeout(function () {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    }, 200)
  }
})