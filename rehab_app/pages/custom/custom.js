// pages/custom/custom.js
const app = getApp()
Page({

  /**
   * Page initial data
   */
  data: {
    testPic:'../image/acc.png',
    partName: null,
    informationList: null,
    playList: [],
    playListName: [],
    showModalStatus: false,
    animationData: null,
    isDefault: null,
    scrollHeight: null
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var height = 100
    var that = this
    wx.getSystemInfo({
      success: function (res) {
        var height = res.windowHeight * 1.85
        console.log(height)
        that.setData({
          scrollHeight: height
        })
      },
      fail: function (e) {
        console.log("我尼玛凉凉")
      }
    })
    this.setData({
      partName: options.partName,
      day: options.day,
      informationList: app.globalData.partInformationList[options.partName],
    })
    var informationList = this.data.informationList
    var i = 0
    for (i = 0; i < informationList.length; i++) {
      console.log(informationList[i])
      informationList[i]['src'] = "https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/" + informationList[i]['engName'] + ".jpg"
    }
    this.setData({
      informationList: informationList
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

  jumpPageCustom: function () {
    var that = this
    var partName = that.data.partName
    var day = that.data.day
    var playList = that.data.playList
    var playListName = that.data.playListName
    this.setData({
      isDefault: false
    })
    var isDefault = this.data.isDefault
    wx.navigateTo({
      url: '../preparation/preparation?partName=' + partName + '&day=' + day + '&isDefault=' + isDefault + '&playList=' + JSON.stringify(playList) + '&playListName=' + JSON.stringify(playListName)
    })
  },
  
  addVideo: function (e) {
    var that = this
    var index = e.currentTarget.dataset.index + 1;//每一个button的索引
    var name = e.currentTarget.dataset.text;
    var cName = e.currentTarget.dataset.id;
    var playList = that.data.playList
    var playListName = that.data.playListName
    console.log(cName)
    playList.push(name)
    playListName.push(cName)
    this.setData({
      playList: playList,
      playListName: playListName
    })
    console.log(this.data.playList)
    console.log(this.data.playListName)
  },

  removeVideo: function (e) {
    var idx = e.currentTarget.id
    var playList = this.data.playList
    var playListName = this.data.playListName
    playList.splice(idx, 1)
    playListName.splice(idx,1)
    this.setData({
      playList: playList,
      playListName: playListName
    })
    console.log(this.data.playList)
    console.log(this.data.playListName)
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