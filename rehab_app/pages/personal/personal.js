// personal.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    credit: 0,
    userInfo: {},
    progress: 0,
    next_class_credit: 20,
  },

  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var credit = 0
    var that = this
    wx.getStorage({
      key: 'credit',
      success: function (res) {
        credit = res.data
        console.log(credit)
      },
      fail: function () {
        wx.setStorageSync('credit', 0)
        that.setData({
          credit: 0
        })
        console.log(credit)
        console.log('credit+1')
      }
    })
    var credit = wx.getStorageSync('credit')
    this.setData({
      credit: credit
    });
    console.log(this.data.credit)
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    };
    wx.showShareMenu({
      withShareTicket: true,
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (ops) {
    if (ops.from == 'button') {
      console.log(ops.target)
    }
    var cr = this.data.credit + 2
    var that = this
    setTimeout(function () {
      wx.setStorageSync('credit', cr)
      that.setData({
        credit: cr
      })
    }, 700)
    return {
      title: '别坐着玩手机了，一起来锻炼吧！',
      path: 'pages/index/index',
      imageUrl: '../image/pain.jpeg',
    }

  }
})