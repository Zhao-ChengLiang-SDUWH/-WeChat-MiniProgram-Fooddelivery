const app = getApp()
const db = wx.cloud.database()
const orderCollection = db.collection("order")
const storesCollection = db.collection('stores')

Page({
  data: {
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar1(); 

    // console.log(options.id)
    // let id=options.id;
    // orderCollection.doc(id).get().then(res=>{
    //   console.log(res.data);
    //   this.setData({
    //     product:res.data
    //   })
    // })
    
    orderCollection.where({
      condition:"出餐中"
    }).get().then(res => {
      this.setData({
        order: res.data,
      })
    })

    // storesCollection.where({
    //   _openid: this.data.merchantOpenid
    // }).get().then(res => {
    //   this.setData({
    //     stores: res.data,
    //   })
    // })
    
    // orderCollection.where({
    //   condition: '待接单'
    // }).field({
    //   goods:true,
    //   _id:false
    // }).get({
    //   success: res => {
    //     this.setData({
    //       goods: res.data,
    //     })
    //   }
    //  })
     
    
  },

  // onorderDetail: function (e) {
  //   console.log(e.detail);
  //   var orderid = e.currentTarget.dataset.orderid;
  //   var goods1 = JSON.stringify(e.currentTarget.dataset.goods);
  //   var riderOpenid = e.currentTarget.dataset.rideropenid;
  //   var merchantOpenid = e.currentTarget.dataset.merchantopenid;
  //   wx.navigateTo({
  //     url: '/pages/Deliver_order/Deliver_order?orderid=' + orderid + "&riderOpenid=" + riderOpenid + "&merchantOpenid=" + merchantOpenid + "&goods=" + goods1,
  //   })
  //   console.log(orderid)
  //   console.log(riderOpenid)
  // },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    orderCollection.where({
      condition: "出餐中"
    }).get().then(res => {
      this.setData({
        order: res.data,
      },res => {
        console.log("数据更新完成")
        wx.stopPullDownRefresh()
      })
    })
  },

  listToggle: function () {
    this.setData({
      showMore: !this.data.showMore
    })
  },

  toChange: function(event){
    console.log(event)
    wx.cloud.callFunction({
      name: 'update-condition',
      data:{
        _id: event.currentTarget.dataset.id,
        condition:'已接单',
        riderOpenid: app.globalData.openid
      },
      success: res => {
        wx.showToast({
          title: '已接单',
          icon: 'warn',
          duration: 2000
        })
      } 
    })
    
    // wx.cloud.callFunction({
    //   name: 'addSome',
    //   data: {
    //     _id: event.currentTarget.dataset.id,
    //     riderOpenid: '123'
    //   },
    //   success: res => {
    //     console.log(res)
    //   }
    // })
  }

})
