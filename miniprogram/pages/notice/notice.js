// pages/notice/notice.js

const db = wx.cloud.database()
const notice = db.collection("Time_notice")

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
  notices:[],
  check:[false,true,true]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)

    wx.showModal({
      title: '提示',
      content: '由于微信推送限制，若您要使用订餐提醒功能 请在授权时选择始终允许',
    })
    wx.requestSubscribeMessage({
      tmplIds: ['Krp3IAhLlJgvPNzUF3BtNXkydvRDAxSiV3YE1tOGM18', "WCqO5XuySDpBRdPWsvTFGT3KeBQGatBrEQyv3qOR3mI"],
      success(res) { }
    })

    var gettime=new Date().toLocaleDateString()
console.log(gettime)
    wx.cloud.callFunction({
      name: "food_delivered_mseeage",
      data: {
        userid: app.globalData.openid,
        address: "学22",
        time: gettime
      },
      success: res => {

      }
  })
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
    console.log(new Date().getMinutes())
    notice.where({
      userid: app.globalData.openid
    }).get().then(res => {
      this.setData({
        notices: res.data
      })

      console.log(this.data.notices)

    })
    var now = []
    for (var j = 0; j < now.length; j++) {
      now[j] = notices[j].ison
    }
    this.setData({
      check: now
    })
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
  onShareAppMessage: function () {

  },
  addnotice : function(){
    wx.navigateTo({
      url: '/pages/addnotice/addnotice',
    })
  },
  onchange(e) {
    console.log(e.detail)
    var ccc = e.currentTarget.dataset.id;
    for (var j = 0; j < this.data.notices.length; j++ ){
      if(this.data.notices[j]._id==ccc){
        var i =j
      }
    }
    console.log(i)
    var noti=this.data.notices
    noti[i].ison=e.detail
    notice.doc(ccc).update({
      data:{
        ison:e.detail
      },
      success:function(res){
     

      }
        
      })

    this.setData({
      notices: noti
    })
    console.log(noti)
    // notice.where({
    //   userid: app.globalData.openid
    // }).get().then(res => {
    //   this.setData({
    //     notices: res.data
    //   })
    // })
    
    
    
  },
  del: function(e){
    var noti1=this.data.notices
    var cc = e.currentTarget.dataset.iid;
  for (var j = 0; j < this.data.notices.length; j++) {
      if (this.data.notices[j]._id == cc) {
        var i = j
      }
    }
    console.log(i)
   noti1.splice(i,1)
   this.setData({
     notices:noti1
   }) 
    
    notice.doc(cc).remove({
      success: function (res) {
      }
    })
   
    
  }

})