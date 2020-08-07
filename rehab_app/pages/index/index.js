//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    currDate: null,
    workDay: null,
    motto: '网络正在连接中...',
    begin: '您的康复就是我们共同的愿望!',
    userInfo: {},
    userId: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  jumpPage: function() {
    wx.navigateTo({
      url: '../selectPart/selectPart'
    })
  },
  jumpPage2: function () {
    wx.navigateTo({
      // url: '../chooseMode/chooseMode?partName=shoulder&day=1'
      url: '../QA/QA'
    })
  },
  onLoad: function () {
    var that=this;
    var nickName = that.data.nickName;
    console.log(nickName);
    var currDate = util.formatDate(new Date());
    this.setData({
      currDate: currDate
    })
    this.getDay()
    console.log('1111'+app.globalData.sex)
    wx.getUserInfo({
      success: function (res) {
        that.data.userId = res.userInfo.nickName,
        app.globalData.userId = res.userInfo.nickName,
          that.setData({
            userId: that.data.nickName,
          })
        console.log('yeee' + app.globalData.userId)
        
      }
    })
       
    if (app.globalData.userInfo) {
      console.log('if'),
      that.setData({
        userInfo: app.globalData.userInfo,
        userId:app.globalData.userInfo.nickName,
        hasUserInfo: true
      })
    } else if (that.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      console.log('else if'),
      app.userInfoReadyCallback = res => {
        that.setData({
          userInfo: res.userInfo,
          userId: res.userInfo.nickName,
          hasUserInfo: true,
  
        })
      }
      // console.log(hasUserInfo)
    } else {
      console.log('else'),
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          that.setData({
            userInfo: res.userInfo,
            userId: res.userInfo.nickName,
            hasUserInfo: true
          })
        }
      })
    }
    console.log('ye' + app.globalData.userId)
    var day = wx.getStorageSync("workDay")
    if (day<2){
      wx.navigateTo({
        url: '../extra_talk/Extra_talk',
      })
    }
  },
  getUserInfo: function(e) {
    console.log('NOW')
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getDay: function() {
    var that = this
    var day = 1
    var currDate = that.data.currDate
    wx.getStorage({
      key: "workDay",
      success: function (res) {
        day = res.data
        var lastDate = wx.getStorageSync("lastDate")
        console.log("lastDate" + lastDate)
        console.log("currDate" + currDate)
        if (lastDate!=currDate) {
          day = day + 1
          wx.setStorageSync("lastDate", currDate)
          wx.setStorageSync("workDay", day)
          console.log("换天")
        }
        that.setData({
          workDay: day
        })
        console.log("第" + day + "天")
        // 发布的时候这个地方要改成==1
        // if (day>0){
        //   wx.navigateTo({
        //     url: '../extra_talk/Extra_talk',
        //   })
        // }
      },
      fail: function () {
        wx.setStorageSync("workDay", 1)
        wx.setStorageSync("lastDate",currDate)
        that.setData({
          workDay: day
        })
        console.log("存好了")
      }
    })
    
  },
  onShow: function () {
    var lastDate = wx.getStorageSync("lastDate")
    var longDay = wx.getStorageSync("cont_idx")
    if (app.globalData.userId!=null && app.globalData.userId!='' ){
      console.log(app.globalData.age + '222')
      console.log(app.globalData.userId+'122')
      if (longDay==''){
        console.log('here1')
        longDay=1
      }
      wx.request({
        url: "https://www.kk-rehab.xyz/temp.php",
        dataType: 'json',
        data: {
          id: app.globalData.userId,
          sex: app.globalData.sex,
          age: app.globalData.age,
          therapy: app.globalData.therapy,
          lastdate: lastDate,
          longDay: longDay
        },
        method: "POST",
        header: {
          "content-type": "application/x-www-form-urlencoded"
        },
        success: function (res) {
          console.log("[[["+res.data + "]]]");
        }
      })
    }
  }
})
