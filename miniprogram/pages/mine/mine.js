import {navigateToChat} from '../../utils/util'
const app = getApp()
const db = wx.cloud.database()
const stores = db.collection('stores')
const hisorders = db.collection('history_order')
Page({
  data: {
    navList: [
      // {title: '我的活动', imgUrl: '../../assets/images/setting/reback.png'},
      {title: '在线客服', imgUrl: '../../assets/images/setting/cs.png'},
      {title: '呼叫客户', imgUrl: '../../assets/images/setting/mac.png'},
      {title: '市场经理', imgUrl: '../../assets/images/setting/manager.png'},
    ],
    sign: true,
    show: false,
    stores:[],
    goodsDiscount:[],
    total:''
 
  },
  options: {
    addGlobalClass: true,
  },
  properties: {
    item: Object,
    border: {
      type: Boolean,
      value: false
    }
  },

 
    shopDetail () {
      wx.navigateTo({
        url: '/pages/mine_shopDetail/mine_shopDetail'
      })
    },
  change() {
    wx.navigateTo({
      url: '/pages/store_mine/store_mine'
    })
  },
    onmerchantSign () {
      this.setData({
        show: !this.data.show
      })
    },

    onClose() {
      this.setData({ show: false });
    },

    noselectSign:function (e) {
      let id = e.currentTarget.dataset.id
     
        if (id === '0') {
          console.log(e.detail)
          stores.doc(id).update({
            data:{
              condition:"营业中"
            }      
          }).then(res =>{
            this.setData({
            sign: true,
            show: false
          })
            console.log(res)
          })
         
        }else{
          console.log(e.detail)
         stores.doc(id).update({
            data:{
              condition:"已关店"
            }      
          }).then(res =>{
            this.setData({
            sign: false,
            show: false
          })
            console.log(res)
          })
        }
       
        
     
      this.triggerEvent('sign', id)
    },
  
 
  onLoad () {
   
  
  hisorders.where({
    merchantOpenid: app.globalData.openid
  }).count().then(res =>{
    this.setData({
      total:res.total,
    })
    console.log(this.data.total)
  })

  stores.where({
    _openid: app.globalData.openid
  }).get().then(res =>{
    this.setData({
      stores:res.data,
    })
  })
  stores.where({
    _openid: app.globalData.openid
  }).field({
    goodsDiscount:true,
    _id:false
  }).get().then(res =>{
    
    this.setData({
        goodsDiscount:res.data,
                         
    })
    console.log(this.data.goodsDiscount)


  })
  wx.cloud.callFunction({
    name: 'monthlySaleUpdate',
    data:{
     openid: app.globalData.openid,
    total:this.data.total
    },
    success: res => {
       console.log('更新数据成功')
    }
 })
  
  },

  onPullDownRefresh:function(res){
    hisorders.where({
      merchantOpenid: app.globalData.openid
    }).count().then(res =>{
      this.setData({
        total:res.total,
      })
      console.log(this.data.total)
    })
  
    stores.where({
      _openid: app.globalData.openid
    }).get().then(res =>{
      this.setData({
        stores:res.data,
      })
    })
    stores.where({
      _openid: app.globalData.openid
    }).field({
      goodsDiscount:true,
      _id:false
    }).get().then(res =>{
      
      this.setData({
          goodsDiscount:res.data,
                           
      })
      console.log(this.data.goodsDiscount)
  
  
    })
      stores.doc(app.globalData.openid).update({
        data:{
          monthlySale: this.data.total
        }
        
      }).then(res => {
        console.log(this.data.total)
      })
      wx.cloud.callFunction({
        name: 'monthlySaleUpdate',
        data:{
         openid: app.globalData.openid,
        total:this.data.total
        },
        success: res => {
           console.log('更新数据成功')
        }
     })
      wx.stopPullDownRefresh();
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 1000,
        mask: true
      });
  },

  callphone (phone){
    wx.makePhoneCall({
      phoneNumber: phone,
      success: (r => {
        console.log(r);
      }),
      fail: (r => {
        console.log();
      })
    })
  },

  onmyWallet () {
    wx.navigateTo({
      url: '../mine_Children/myWallet/myWallet'
    })
  },

  ondailyOrder () {
    wx.navigateTo({
      url: '../mine_dailyOrder/mine_dailyOrder'
    })
  },

  onskipNav (e) {
    let index = e.currentTarget.dataset.index
    if (index === -1) {
     
    }else if(index === 0){
      navigateToChat('1076')
    }else if(index === 1){
      this.callphone('13137265010')
    }else{
      this.callphone('110')
    }
  },

  onoperationLog () {
    wx.navigateTo({
      url: '../mine_Children/operationLog/operationLog'
    })
  },
  logout: function () {
    wx.redirectTo({
     
      url: '/pages/choose/choose',
    })
  },
  onmyData () {
    wx.navigateTo({
      url: '../mine_Children/myData/myData'
    })
  }
  
})