const app = getApp()
const db = wx.cloud.database()
const userCollection = db.collection('User')
// miniprogram/pages/User/User.js
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
    app.editTabBar();
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

logout:function() {
  wx.redirectTo({
    
    url: '/pages/choose/choose',
  })
},

goUpdata:function(){
  wx.navigateTo({
    url: '/pages/Userupdate/Userupdate',
  })
},

favoriteStore:function(){
  wx.navigateTo({
    url: '/pages/favoriteStore/favoriteStore',
  })
},

discount:function(){
  wx.showToast({
    title: '正在开发',
    icon: 'warn',
    duration: 2000
  })
}

})