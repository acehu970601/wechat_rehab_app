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
    titlePic:null,
    informationList: null,
    generalList: null,
    playList: [],
    showModalStatus: false,
    animationData: null,
    isDefault: null,
    attentionText:null,
    userText:null,
    infoText:null,
    scrollHeight: null
  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var height = 100
    var that = this
    wx.getSystemInfo({
      success: function(res) {
        var height = res.windowHeight*1.85
        console.log(height)
        that.setData({
          scrollHeight: height
        })
      },
      fail: function(e) {
        console.log("我尼玛凉凉")
      }
    })
    this.setData({
      partName: options.partName,
      day: options.day,
      informationList: app.globalData.partInformationList[options.partName],
      generalList:app.globalData.partGeneralList[options.partName],
      titlePic:app.globalData.titlePic[options.partName],
      userText:app.globalData.partUserText[options.partName],
      attentionText: app.globalData.partAttentionText[options.partName],
      infoText: app.globalData.partinfoText[options.partName]
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
  changeStyle: function(e) {
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
    var credit = null;
    wx.getStorage({
      key: 'credit',
      success: function (res) {
        credit = res.data
        console.log(credit)
      },
      fail: function () {
        wx.setStorageSync('credit', 0)
        credit = 0
        console.log(credit)
        console.log('credit+1')
      }
    })
    credit = wx.getStorageSync('credit')
    console.log('现在的积分是' + credit)
    if (credit < 10) {
      wx.showModal({
        title: '积分不足',
        content: '10积分以上才能使用自定义功能哦！',
        success: function (res) {
          if (res.confirm) {
            console.log('积分不足')
          }
        }
      })
      return
    }
    var that = this
    var partName = that.data.partName
    var day = that.data.day
    var playList = that.data.playList
    this.setData({
      isDefault: false
    })
    var isDefault = this.data.isDefault
    wx.navigateTo({
      url: '../custom/custom?partName=' + partName + '&day=' + day + '&isDefault=' + isDefault
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

  removeVideo: function(e) {
    var idx = e.currentTarget.id
    var playList = this.data.playList
    playList.splice(idx,1)
    this.setData({
      playList: playList
    })
  },

  showModal: function() {
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
    setTimeout(function() {
      animation.translateY(0).step()
      that.setData({
        animationData: animation.export()
      })
    },200)
  },

  hideModal: function(){
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
    setTimeout(function() {
    animation.translateY(0).step()
    that.setData({
      animationData: animation.export()
    })
  }, 200)
  }
})