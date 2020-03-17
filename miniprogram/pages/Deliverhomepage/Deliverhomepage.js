const app = getApp()
const db = wx.cloud.database()
const historyCollection=db.collection("history_order")
const orderCollection = db.collection("order")

// pages/Deliverhomepage/Deliverhomepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    currtab: 0,
    swipertab:[{name:'我的订单',index:0},{name:'历史订单',index:1}],
    total:0,
    deliverFee:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar1(); 
    this.setData({
      show:app.globalData.show
    })

    // historyCollection.where({
    //   riderOpenid: app.globalData.openid,
    //   condition:"已完成"
    // }).get().then(res =>{
    //   this.setData({
    //     history_order: res.data
    //   })
    // })

    // orderCollection.where({
    //   condition: "已接单",
    //   riderOpenid: app.globalData.openid
    // }).get().then(res => {
    //   this.setData({
    //     order: res.data,
    //   })
    // })

  },

  goUpdate: function(e){
    console.log(e)
    app.globalData.show = false
    wx.navigateTo({
      url: '/pages/updateInformation/upateInformation',
    })
  },
  
onShow:function(){
  
  orderCollection.where({
    condition: "已接单",
    riderOpenid: app.globalData.openid
  }).get().then(res => {
    console.log(res.data)
    this.setData({
      order: res.data,
    })
  })
  historyCollection.where({
    riderOpenid: app.globalData.openid,
    condition: "已完成"
  }).get().then(res => {
    console.log(res.data)
    this.setData({
      history_order: res.data
    })
  })
},
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getDeviceInfo()
    this.orderShow()
  },

  onReachBottom: function () {
    // let page = this.data.page +20;
    // orderCollection.where({
    //   condition: "已接单"
    // }).skip(page).get().then(res => {
    //   let new_data = res.data
    //   let old_data = this.data.order
    //   this.setData({
    //     order: old_data.concat(new_data),
    //     page:page
    //   })
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },


  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },



  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.currentTarget.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.currentTarget.dataset.current
      })
    }
  },

  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },
 
  orderShow: function () {
   

    let that = this
    switch (this.data.currtab) {
      case 0:
        that.waitPayShow()
        break
      case 1:
        that.alreadyShow()
        break
    }
  },

  waitPayShow: function () {
    historyCollection.where({
      riderOpenid: app.globalData.openid
    }).get().then(res => {
      this.setData({
        history_order: res.data
      })
    })
  },
 
  listToggle: function () {
    this.setData({
      showMore: !this.data.showMore
    })
  },

  alreadyShow: function () {
    orderCollection.where({
      riderOpenid: app.globalData.openid,
      condition: "已接单"
    }).get().then(res => {
      this.setData({
        order: res.data,
      })
    })
  },

  toAccomplish: function (event) {
    console.log(Number(event.currentTarget.dataset.actualTotal))
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var gettime = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + "\t" + date.getHours() + ":" + date.getMinutes()
    console.log(gettime)

    //console.log(event)
    wx.cloud.callFunction({
      name: 'update-condition',
      data: {
        _id: event.currentTarget.dataset.id,
        condition: '已完成',
      },
      success: res => {
        console.log(res)
      }
    })
  orderCollection.doc(event.currentTarget.dataset.id).get().then(res=>{
    console.log(res)
      this.setData({
        total:res.data.actualTotal,
        deliverFee: res.data.deliverFee
      })
    console.log(res.data.actualTotal)
    
    wx.showToast({
      title: '已送达',
      icon: 'warn',
      duration: 2000
    })
    
    historyCollection.add({
      data: {
        address: event.currentTarget.dataset.address,
        acceptTime: gettime,
        goods: event.currentTarget.dataset.goods,
        //condition: event.currentTarget.dataset.condition,
        deliverFee: this.data.deliverFee,
        merchantOpenid: event.currentTarget.dataset.merchantOpenid,
        thumb: event.currentTarget.dataset.thumb,
        punctual:"准时",
        commentGrade:4,
        merchant: event.currentTarget.dataset.merchant,
        calculated:false,
        total: this.data.total,
        userOpenid: event.currentTarget.dataset.userid,
        riderOpenid:app.globalData.openid,
        orderTime: event.currentTarget.dataset.orderTime
      },
      success: function (res) {
        console.log(res)
      },
      fail: console.error,
      complete: console.log
    })
  })
    var time = new Date().toLocaleDateString()
    wx.cloud.callFunction({
      name: "food_notice",
      data: {
        userid: event.currentTarget.dataset.userid,
        time: time,
        address: event.currentTarget.dataset.address
      },
      success: res => {
        console.log(res)
      }
      
    })

    orderCollection.doc(event.currentTarget.dataset.id).remove({
      success: function(res){
        console.log(res.data)
      }
    })
    orderCollection.where({
      condition: "已接单",
      riderOpenid: app.globalData.openid
    }).get().then(res => {
      this.setData({
        order: res.data,
      })
    })
  }

  // callback: function () {
  //   console.log(this.data.order)
   
  // }


})


