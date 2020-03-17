const db = wx.cloud.database()
const storeCollection = db.collection('stores')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show2:false,
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

 
  onSubmit: function(e) {
    if( e.detail.value.name && e.detail.value.address && e.detail.value.phone){
      console.log(e.detail)
       if(e.detail.value.name != this.data.userInfo.name){
        storeCollection.doc(app.globalData.openid).update({
          data: {
            name:e.detail.value.name
          },
          success: function() {
            console.log('店铺名称更新成功')
            wx.showToast({
              title: '信息更新成功',
            })     
          }
        })
      } 
      if(e.detail.value.phone != this.data.userInfo.phone){
        storeCollection.doc(app.globalData.openid).update({
          data: {
            phone:e.detail.value.phone
          },
          success: function() {
            console.log('店铺电话更新成功')
            wx.showToast({
              title: '信息更新成功',
            })     
          }
        })
      } 
       if(e.detail.value.address != this.data.userInfo.address){
        storeCollection.doc(app.globalData.openid).update({
          data: {
            address:e.detail.value.address
          },
          success: function() {
            console.log('店铺地址更新成功')
            wx.showToast({
              title: '信息更新成功',
            })     
          }
        })
      } 
      if(e.detail.value.des != this.data.userInfo.des){
        storeCollection.doc(app.globalData.openid).update({
          data: {
            des:e.detail.value.des
          },
          success: function() {
            console.log('店铺描述更新成功')
            wx.showToast({
              title: '信息更新成功',
            })     
          }
        })
      }
      if (e.detail.value.avg != this.data.userInfo.avg) {
        storeCollection.doc(app.globalData.openid).update({
          data: {
            avg: Number(e.detail.value.avg)
          },
          success: function () {
            console.log('店铺jiage更新成功')
            wx.showToast({
              title: '信息更新成功',
            })     
          }
        })
      }  
      if (e.detail.value.tag != "") {
        var x = e.detail.value.tag
        console.log(x)
        storeCollection.doc(app.globalData.openid).update({
          data: {
            type: db.command.push(x)
          },
          success: function () {
            console.log('店铺jiage更新成功')
            wx.showToast({
              title: '信息更新成功',
            })     
          }
        })
      } 
      if (e.detail.value.discount != '') {
        var x = Number(e.detail.value.discount)
        var y = Number(e.detail.value.total)
        var manjian={"discount":x,"total":y}
        storeCollection.doc(app.globalData.openid).update({
          data: {
            goodsDiscount: db.command.push([manjian])
          },
          success: function () {
            console.log('店铺manj更新成功')
            wx.showToast({
              title: '信息更新成功',
            })     
          }
        })
      } if (e.detail.value.userDiscount != this.data.userInfo.userDiscount) {
        storeCollection.doc(app.globalData.openid).update({
          data: {
            userDiscount: Number(e.detail.value.userDiscount)
          },
          success: function () {
            console.log('店铺newuser更新成功')
            wx.showToast({
              title: '信息更新成功',
            })     
          }
        })
      }  
      if (e.detail.value.deliveryFee != this.data.userInfo.deliveryFee) {
        storeCollection.doc(app.globalData.openid).update({
          data: {
            deliveryFee: Number(e.detail.value.deliveryFee)
          },
          success: function () {
            console.log('店铺df更新成功')
            wx.showToast({
              title: '信息更新成功',
            })     
          }
        })
      }  
      if (e.detail.value.lunchboxFee != this.data.userInfo.lunchboxFee) {
        storeCollection.doc(app.globalData.openid).update({
          data: {
            lunchboxFee: Number(e.detail.value.lunchboxFee)
          },
          success: function () {
            console.log('店铺lf更新成功')
            wx.showToast({
              title: '信息更新成功',
            })     
          }
        })
      }  
      if (e.detail.value.startingPrice != this.data.userInfo.startingPrice) {
        storeCollection.doc(app.globalData.openid).update({
          data: {
            startingPrice: Number(e.detail.value.startingPrice)
          },
          success: function () {
            console.log('店铺sp更新成功')
            wx.showToast({
              title: '信息更新成功',
            })     
          }
        })
      } 
      wx.showToast({
        title: '信息更新成功',
      })           
      wx.redirectTo({ 
        url: '/pages/store_mine/store_mine'
      })
      } 
    
    else{
      this.setData({
        show2:true
      })
    }
  },

  
    
  

})