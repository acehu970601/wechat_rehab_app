//app.js
App({
  config: {
    host: 'www.kk-rehab.xyz' // 我的域名
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    userId:null,
    sex:null,
    age:null,
    therapy:null,

    //data for custom mode
    partInformationList: {
      shoulder: [{ chineseName: '背部拉伸', engName: 'back_pull_oc' }, { chineseName: '背部伸展', engName: 'back_stretch_oc' }, { chineseName: '爬墙', engName: 'climb_oc' }, { chineseName: '向下牵引拉伸', engName: 'down_stretch_oc' }, { chineseName: '手臂平直画圈', engName: 'parallel_turn_oc' }, { chineseName: '靠墙牵引拉伸', engName: 'side_stretch1_oc' }, { chineseName: '侧伸展', engName: 'side_stretch_oc' }, { chineseName: '侧转身', engName: 'side_turn_oc' }, { chineseName: '天鹅臂', engName: 'swan_arm_oc' }, { chineseName: '合手向上牵引', engName: 'upper_stretch_oc' }, { chineseName: '大风车', engName: 'windmill_oc' }, { chineseName: '扩胸运动', engName: 'workout_chest_oc' }],
      neck: [{ chineseName: '颈部运动', engName: 'neck1_oc' }, { chineseName: '颈部旋转运动', engName: 'neck2_oc' }, { chineseName: '放松颈部', engName: 'neck_relax_oc' }, { chineseName: '颈部拉伸', engName: 'neck_stretch_oc' }]
    },

    //data for default mode
    partGeneralList:{
      shoulder: [{
        src: 'https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/shoulder1.jpg', text:'第一天：放松拉伸'},
        {
          src: 'https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/shoulder2.jpg', text: '第二天：拉伸舒展'
        },
        {
          src: 'https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/shoulder3.jpg', text: '第三天：舒展运动'
        },
        {
          src: 'https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/shoulder4.jpg', text: '第四天：活动筋骨'
        },
        {
          src: 'https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/shoulder5.jpg', text: '第五天：激活肌肉'
        },
        {
          src: 'https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/shoulder6.jpg', text: '第六天：肩部运动'
        },
        {
          src: 'https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/shoulder7.jpg', text: '第七天：加强运动'
        }],
        neck: [
          {
            src: 'https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/neck1.jpg', text: '放松肌肉'
          },
          {
            src: 'https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/neck2.jpg', text: '肌肉拉伸'
          },
          {
            src: 'https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/neck3.jpg', text: '肩颈运动'
          },
          {
            src: 'https://wechatkk-1300098253.cos.ap-shanghai.myqcloud.com/neck4.jpg', text: '激活肌肉'
          }
        ]
    },
    partPlayList:{
      shoulder: [['climb_oc', 'side_stretch1_oc', 'down_stretch_oc'], ['climb_oc', 'side_stretch_oc', 'side_turn_oc', 'side_stretch1_oc'], ['side_stretch1_oc', 'down_stretch_oc', 'climb_oc', 'windmill_oc', 'parallel_turn_oc'], ['side_turn_oc', 'climb_oc', 'back_stretch_oc', 'workout_chest_oc', 'side_stretch_oc', 'windmill_oc'], ['side_turn_oc', 'windmill_oc', 'back_pull_oc', 'workout_chest_oc', 'parallel_turn_oc', 'side_stretch1_oc', 'down_stretch_oc'], ['side_turn_oc', 'workout_chest_oc', 'swan_arm_oc', 'back_pull_oc', 'windmill_oc', 'back_stretch_oc', 'upper_stretch_oc'], ['upper_stretch_oc', 'windmill_oc', 'side_turn_oc', 'side_stretch_oc', 'swan_arm_oc', 'parallel_turn_oc', 'back_stretch_oc', 'down_stretch_oc']],
      neck: [['neck_relax_oc', 'neck_stretch_oc','neck1_oc','neck2_oc']]
    },

    // //调试用途** 可删【
    // partPlayList: {
    //   shoulder: [['swan_arm_new'], ['swan_arm_new'], ['swan_arm_new'], ['upper_stretch_new'], ['swan_arm_new'], ['swan_arm_new'], ['swan_arm_new']]
    // },
    // partPlayList_Name: {
    //   shoulder: [['测试用第一天'], ['测试用第二天'], ['测试用第三天'], ['测试用第四天'], ['测试用第五天'], ['测试用第六天'], ['测试用第七天']]
    // },
    // //】可删

    partPlayList_Name: {
      shoulder: [['爬墙', '靠墙牵引拉伸', '向下牵引拉伸'], ['爬墙', '侧伸展', '左右转腰伸展', '靠墙牵引拉伸'], ['靠墙牵引拉伸', '向下牵引拉伸', '爬墙', '大风车', '手臂平直画圈'], ['左右转腰伸展', '爬墙', '身后拉伸', '活动肩关节', '侧伸展', '大风车'], ['左右转腰伸展', '大风车', '合手身后上拉', '活动肩关节', '手臂平直画圈', '靠墙牵引拉伸', '向下牵引拉伸'], ['左右转腰伸展', '活动肩关节', '天鹅臂', '合手身后上拉', '大风车', '身后拉伸', '合手向上牵引'], ['合手向上牵引', '大风车', '左右转腰伸展', '侧伸展', '天鹅臂', '手臂平直画圈', '身后拉伸', '向下牵引拉伸']],
      neck: [['放松颈部', '颈部拉伸','颈部运动','颈部旋转运动']]
    },
    titlePic: {
      shoulder: '../image/cap2.jpg', neck: '../image/cap3.jpg'},
    partinfoText: {
      shoulder: ['12个经典训练动作'],
      neck: ['4个组合动作']
    },
    partUserText: {
      shoulder: ['1. 有肩周炎的患者', '2. 长期有肩颈疼痛的人群', '3. 缺乏训练的上班族\n\n'],
      neck: ['1. 有颈椎炎的患者', '2. 长期有肩颈疼痛的人群', '3. 缺乏训练的上班族\n\n']
    },
    partAttentionText: {
      shoulder: ['*请根据自身情况选择课程，调整\n节奏，并咨询医生，切勿过度训练', '*局部酸疼属于正常情况，适当的\n按摩以及拉伸能够有效地缓解酸痛'],
      neck: ['*请根据自身情况选择课程，调整\n节奏，并咨询医生，切勿过度训练', '*局部酸疼属于正常情况，适当的\n按摩以及拉伸能够有效地缓解酸痛']
    }
  },
  
})