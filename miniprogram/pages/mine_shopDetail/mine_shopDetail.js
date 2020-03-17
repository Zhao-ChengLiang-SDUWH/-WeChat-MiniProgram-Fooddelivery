const app = getApp()
const db = wx.cloud.database()
const stores = db.collection('stores')
Page({
  data: {
    stores:[],
   
  },
  onLoad () {
    stores.where({
      _openid: app.globalData.openid
    }).get().then(res =>{
      this.setData({
        stores:res.data,
      })
    })
  },
  onpreviewImage () {
   
    wx.previewImage({
      urls:[this.data.thumb],
      current:this.data.thumb
    })
  }
})