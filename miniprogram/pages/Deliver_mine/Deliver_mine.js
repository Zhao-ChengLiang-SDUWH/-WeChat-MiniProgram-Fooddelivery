const db = wx.cloud.database()
const userCollection = db.collection('User')
const app = getApp()


// pages/Deliver_mine/Deliver_mine.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},
    avatarUrl:'',
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar1();
    userCollection.doc(app.globalData.openid).get({
      success:res=>{
        console.log(res.data)
        this.setData({
          userInfo:res.data,
          avatarUrl:res.data.avatarUrl
        })
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
    wx.hideHomeButton()
  },


  chooseImage: function() {
    let _this = this;
    wx.chooseImage({
      count: 1,
      sizeType: [ 'compressed'],
      sourceType: ['album', 'camera'],
      success (res) {
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths;
        console.log(res.tempFilePaths);
        _this.setData({
          avatarUrl:res.tempFilePaths[0]
        })
        userCollection.doc(app.globalData.openid).update({
          data: {
            avatarUrl:res.tempFilePaths[0]
          },
          success: function() {
            console.log('头像更新成功')
          }
      })
    }
  })
},
logout:function(){
  wx.navigateTo({
    url: '/pages/choose/choose',
  })
},

goUpdate: function(e){
  wx.navigateTo({
    url: '/pages/updateInformation/upateInformation',
  })
},
  discount: function () {
    wx.showToast({
      title: '正在开发',
      icon: 'warn',
      duration: 2000
    })
  }
})