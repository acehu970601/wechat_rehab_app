// QA.js
const app = getApp()
Page({
  data: {
    imageList: ['https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/picpic.jpg'],
    current_tag: 0,
    current_tag1: 0,
    current_tag2: 0,
    current_tag3: 0,
    current_tag4: 0,
    current_tag5: 0,
    current_tag6: 0,
  },
  
  jumpPage: function () {
    wx.navigateBack({
      url: '../index/index',
    })
    wx.navigateTo({
      url: '../extra_card/extra_card',
    })
  },
  previewImage: function(e){
    var current=e.target.dataset.src;
    wx.previewImage({
      current: current,
      urls: this.data.imageList
    })
  },
  onLoad: function (options) {
    console.log(app.globalData.sex)
  },
  sex1: function(){
    let that = this;
    app.globalData.sex=0;
    console.log(app.globalData.sex)
    that.setData({
      current_tag: 1,
    })
    console.log(that.data.current_tag)
  },
  sex2: function () {
    let that = this;
    app.globalData.sex = 1;
    console.log(app.globalData.sex)
    that.setData({
      current_tag1: 1,
    })
  },
  age1: function () {
    let that = this;
    app.globalData.age = 1;
    console.log(app.globalData.age)
    that.setData({
      current_tag2: 1,
    })
  },
  age2: function () {
    let that = this;
    app.globalData.age = 2;
    console.log(app.globalData.age)
    that.setData({
      current_tag3: 1,
    })
  },
  age3: function () {
    let that = this;
    app.globalData.age = 3;
    console.log(app.globalData.age)
    that.setData({
      current_tag4: 1,
    })
  },
  therapy1:function(){
    let that = this;
    app.globalData.therapy=0;
    console.log(app.globalData.therapy)
    that.setData({
      current_tag5: 1,
    })
  },
  therapy2: function () {
    let that = this;
    app.globalData.therapy = 1;
    console.log(app.globalData.therapy)
    that.setData({
      current_tag6: 1,
    })
  }
})