// pages/chooseLocation/chooseLocation.js
const db = wx.cloud.database();
const userCollection = db.collection('User');
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userCollection.doc(app.globalData.openid).get({
      success:res=>{
        console.log(res.data)
        console.log(res.data.address)
        this.setData({
          address:res.data.address
        })
    }
  })
  },

  onShow:function(){
    userCollection.doc(app.globalData.openid).get({
      success:res=>{
        this.setData({
          address:res.data.address
        })
    }
  })
  },


  addLocation:function(){
    wx.navigateTo({
      url: '/pages/addLocation/addLocation',
    })
  },

  itemChange:function(e){
    var nid = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/locationDetail/locationDetail?nid='+nid,
    })
  },

  onUnload: function () {
    wx.redirectTo({
      url: '/pages/User_mine/User_mine',//指定界面
    })
  },
})