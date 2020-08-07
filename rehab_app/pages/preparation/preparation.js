// pages/preparation/preparation.js
const app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * Page initial data
   */
  data: {
    fullScreen: false,
    inLoop: false,
    playList: null,
    playListName: null,
    videoIdx: 0,
    videoPlayed: true,
    partName: null,
    day: 0,
    dayText: 0,
    srcName: null,
    highlight: null,
    fullScreenText:"全屏",

    continuityDays7:[false,false,false,false,false,false],
    signed: false,
    temp_idx: 0,
    newSignIntegrals: 0,
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    // wx.setNavigationBarTitle({  //这里需要更改上方导航标题的名字
    //   title: options.partName,
    //   success: function (res) {
    //     // success
    //   }
    // }),
    this.videoContext=wx.createVideoContext('trainVideo', this)
    console.log("here:" + options)
    this.setData({
      partName: options.partName,
      day: options.day%7,   //这个之后要改的，每个part的周期都不一样
      dayText: parseInt(options.day) + 1
    })
    if (options.isDefault == '{{true}}') {
      this.setData({
        playList: app.globalData.partPlayList[this.data.partName][this.data.day],
        playListName: app.globalData.partPlayList_Name[this.data.partName][this.data.day]
      })
      console.log("default:" + this.data.playList)
    } else {
      this.setData({
        playList: JSON.parse(options.playList),
        playListName: JSON.parse(options.playListName)
      }) 
      console.log("custom:" + this.data.playList)
    }
    this.setData({
      srcName: "https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/VIDEO/" + this.data.playList[this.data.videoIdx] + ".mp4",
      highlight: this.data.playListName[this.data.videoIdx]
    })
  },

  //视频结束fucn
  bindEnded: function(e) {
    var idx = this.data.videoIdx
    var pn = this.data.partName
    var pl = this.data.playList
    var pl_name=this.data.playListName
    const that = this
    if (idx == that.data.playList.length - 1) {
      var completeDay = parseInt(that.data.day) + 1
      console.log(completeDay)
      wx.setStorageSync(pn, completeDay)
      console.log('HERE')
      this.signNewFn()
      // console.log('HERE1')
      // wx.showModal({
      //   title: '恭喜完成今日训练！',
      //   content: '积分+10',
      //   success: function (res) {
      //     if (res.confirm) {
      //       console.log('用户点击确定')
      //       wx.redirectTo({
      //         url: '../selectPart/selectPart',
      //       })
      //     }
      //   }
      // })
      
    }
    else {
      that.setData({
        videoPlayed: false,
        videoIdx: idx + 1,
        srcName: "https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/VIDEO/" + pl[idx + 1] + ".mp4",
        highlight: pl_name[idx+1]
      })
      that.videoContext.play()
    }
  },
  //视频刷新fucn
  bindTimeUpdate: function(e) {
    var currentTime = e.detail.currentTime
    var duration = e.detail.duration
    if (currentTime >= duration-1) {
      var idx = this.data.videoIdx
      var pn = this.data.partName
      var pl = this.data.playList
      const that = this
      if (!this.data.inLoop) {
        this.setData({
          inLoop: true,
        })
        setTimeout(function () {
          if (idx == that.data.playList.length - 1) {
            var completeDay = parseInt(that.data.day) + 1
            console.log(completeDay)
            wx.setStorageSync(pn,completeDay)
            wx.redirectTo({
              url: '../selectPart/selectPart',  //这里需要改成跳到弹窗
            })
          }
          else {
            that.setData({
              videoPlayed: false,
              inLoop: false,
              videoIdx: idx + 1,
              srcName: "https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/VIDEO/" + pl[idx + 1] + ".mp4"
            })
            that.videoContext.play()
          }
        }, 3000)
      } 
    }   
  },
  //播放暂停按钮
  VideoPlayStop: function() {
    var videoPlayed = this.data.videoPlayed
    if (videoPlayed) {
      this.videoContext.pause(),
      this.setData({
        videoPlayed: false
      })
    } else {
      this.videoContext.play(),
        this.setData({
          videoPlayed: true
        })
    }
  },
  //全屏按钮
  changeFullScreen: function() {
    var fullScreen = this.data.fullScreen
    var videoContext = this.videoContext
    if (fullScreen) {
      videoContext.exitFullScreen()
      this.setData({
        fullScreen: false,
        fullScreenText: "全屏"
      })
    } else {
      videoContext.requestFullScreen({direction: 90})
      this.setData({
        fullScreen: true,
        fullScreenText: "退出全屏"
      })
    }
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

  //积分系统运算
  signNewFn: function () {
    console.log('我今天做完了哈哈哈')
    var that = this;
    var lastDate = wx.getStorageSync("lastDate");
    var currDate = util.formatDate(new Date())
    var yesterday_date = new Date();
    yesterday_date.setTime(yesterday_date.getTime() - 24 * 60 * 60 * 1000);
    var yesterday = util.formatDate(yesterday_date);
    lastDate=yesterday //测试用途，可删除
    var credit=0;
    console.log(currDate);
    console.log(yesterday);
    //第一天
    if (that.data.completeDay<=1) {
      console.log('今天第一天啦')
      wx.setStorageSync('cont_idx',1);
      credit++;
    }
    else{
      if (currDate == lastDate) {
        console.log('同一天不能打卡两次')
      }
      else {
        //如果连续两天打卡
        console.log('不是同一天的登陆')
        if (lastDate == yesterday) {
          console.log('HERE3')
          var idx=wx.getStorageSync('cont_idx');
          idx++;
          console.log('HERE4')
          wx.setStorageSync('cont_idx',idx)
          credit++;
        }
        //按新的一天打卡来算周期
        else {
          console.log('HERE5')
          wx.setStorageSync('cont_idx', 1);
          credit++;
        }
      }
    }
    

    //七天中最后一天的计算
    var cont_idx = wx.getStorageSync('cont_idx');
    //7日连续打卡
    if (cont_idx >= 7) {
      wx.setStorageSync('cont_idx', 0);
      credit=credit+7;
      var curr_credit=0
      wx.getStorage({
        key: 'credit',
        success: function(res) {
          curr_credit=res.data
          console.log(curr_credit)
          curr_credit = curr_credit + credit
          wx.setStorageSync('credit', curr_credit)
        },
        fail: function () {
          wx.setStorageSync('credit', credit)
          console.log('credit+7')
        }
      })
      wx.showModal({
        title: '恭喜完成连续一周训练！',
        content: '积分+7',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.redirectTo({
              url: '../selectPart/selectPart',
            })
          }
        }
      })
      wx.setStorageSync('cont_idx', 0);
      }
     
    //还没到7天
    else{
      var curr_credit = 0;
      wx.getStorage({
        key: 'credit',
        success: function (res) {
          curr_credit = res.data
          console.log(curr_credit)
          curr_credit = curr_credit + credit
          wx.setStorageSync('credit', curr_credit)
        },
        fail: function() {
          wx.setStorageSync('credit', credit)
          console.log(credit)
          console.log('credit+1')
        }
      })
      console.log('现在需要跳转页面了')
      wx.showModal({
        title: '恭喜完成今日训练！',
        content: '积分+1',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.redirectTo({
              url: '../selectPart/selectPart',
            })
          }
        }
      })
    }

  }
})

