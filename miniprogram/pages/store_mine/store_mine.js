// pages/store_mine/store_mine.js
const db = wx.cloud.database()
const storeCollection = db.collection('stores')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{},

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    storeCollection.doc(app.globalData.openid).get({
      success:res=>{
        console.log(res.data)
        this.setData({
          userInfo:res.data,
        })
      }
    })
  },

 goUpdate:function(){
   wx.redirectTo({
     
     url: '/pages/storeUpdate/storeUpdate',
   })
 },

 changeImage:function(){
  var that = this
  wx.chooseImage({
    count: 1,	
    sizeType: ['original', 'compressed'],
    sourceType: ['album', 'camera'],
    success(res) {
      const tempFilePaths = res.tempFilePaths
      wx.cloud.uploadFile({
        cloudPath: 'storeImage'+app.globalData.openid + Date.parse(new Date())+'.jpg',
        filePath: tempFilePaths[0],
        success(res) {
           console.log(res.fileID) 
           storeCollection.doc(app.globalData.openid).update({
            data: {
              thumb:res.fileID
            },
            success: function() {
              console.log('图片更新成功')
                wx.navigateTo({
                url: '/pages/store_mine/store_mine',
              }) 
            }
          })
          
          wx.showToast({
            title: '头像更改成功',
          })
        }
      })
    }
  })
}
})