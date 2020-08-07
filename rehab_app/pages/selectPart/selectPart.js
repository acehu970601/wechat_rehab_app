// pages/selectPart/selectPart.js
Page({

  /**
   * Page initial data
   */
  data: {
    jieshao: '请选择你的专属康复运动^_^',
    partList:[
      { name: "shoulder", Chinese: "肩周炎", sum_day: 7 },
      { name: "neck", Chinese: "颈椎病", sum_day: 10}
    ],
    workDay:null
  },
  jumpPage: function(e) {
    var that = this
    var partName = e.currentTarget.id
    wx.getStorage({
      key: partName,
      success: function (res) {
        var day = res.data
        console.log("第" + day + "天!!!" + partName)
        wx.navigateTo({
          url: '../chooseMode/chooseMode?partName=' + partName + '&day=' + day
          //url: '../intro/intro?partName=' + partName + '&day=' + day
        })
      },
      fail: function () {
        wx.setStorageSync(partName, 0)
        var day = 0
        console.log("存好了")
        wx.navigateTo({
          url: '../chooseMode/chooseMode'
        })
      }
    })

  },
  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: "workDay",
      success: function (res) {
      var day = res.data
      // console.log("对了"+day)
        that.setData({
          workDay: day
        })
      // console.log("对了")
      },
      fail: function () {
        console.log("错了")
      }
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

  }
})