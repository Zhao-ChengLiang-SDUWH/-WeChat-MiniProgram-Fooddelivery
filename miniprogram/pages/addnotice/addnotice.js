// pages/addnotice/addnotice.js
var util = require('../../utils/util.js')
var myDate = new Date()
const app = getApp()
const db = wx.cloud.database()
const notice = db.collection("Time_notice")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    radio:1,
    result1:["0","1"],
    filter(type, options) {
      if (type === 'minute') {
        return options.filter(option => option % 5 === 0)
      }

      return options;
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
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
  onShareAppMessage: function () {

  },
  onInput(event) {
    this.setData({
      currentDate: event.detail
    });
    
  },
  
  onChange(event) {
    this.setData({
      radio: event.detail
    });
    if(this.data.radio==1){
      this.setData({
        result1:["0","1","2","3","4","5","6"]
      })
    }
    if (this.data.radio == 2) {
      this.setData({
        result1: ["1", "2", "3", "4", "5"]
      })
    }
    if(this.data.radio==3){
      console.log("zid")
      this.setData({ show: true });
    }
  },
  onChange1(event) {
    this.setData({
      result1: event.detail
    });
  },
  onClose(event) {
    this.setData({ show: false }
      
    );
  },
  add:function(event){
    var result = this.data.result1.map(Number)
    var time1=this.data.currentDate
    var time=this.data.currentDate.split(":")
    var hour=Number(time[0])
    var min= Number(time[1])
    console.log(hour)
    console.log(min)
notice.add({
  data:{
    userid: app.globalData.openid,
    hour:hour,
    min:min,
    week:result,
    sent:false,
    ison:true,
    time:time1
  }

}).then(res=>{
  wx.showToast({
    title: '添加成功',
    icon: 'success',
    duration: 5000,
  })
    wx.navigateBack({
      
    })
})

  }
})