const db = wx.cloud.database()
const order = db.collection('order')
const user = db.collection('User')
const stores = db.collection('stores')
const app = getApp()
Page({
  externalClasses: ['i-class'],
  options: {
    addGlobalClass: true
  },
  data: {
    orders:[],
    riders:[],
    stores:[],
    goods:[],
    orderid:'',
    openid:'',
    riderOpenid:'',
    merchantOpenid:'',
    acceptTime:'',
    ordernum:'',
    hisordernum:''


    
  },
  properties: {
    item: {
      type: Object,
      value: {}
    }
  },
  

  onLoad:function (options) {
    this.setData({
      orderid:options.orderid,
      goods:JSON.parse(options.goods),
      riderOpenid:options.riderOpenid,
      merchantOpenid:options.merchantOpenid,
      ordernum:options.ordernum,
      hisordernum:options.hisordernum
    })
    console.log(this.data.goods)
    console.log(this.data.orderid)
    order.where({
      _id:this.data.orderid
    }).get().then(res =>{
      this.setData({
        orders:res.data
        
      })
    })

   
   
      user.where({
        _openid:this.data.riderOpenid
      }).get().then(res =>{
        this.setData({
          riders:res.data
        })
        console.log(this.data.riderOpenid)
      })

      stores.where({
        _openid:this.data.merchantOpenid
      }).get().then(res =>{
        this.setData({
          stores:res.data
        })
        console.log(this.data.merchantOpenid)
      })
  },

  acceptOrder:function(event){
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var time = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + "\t" + date.getHours() + ":" + date.getMinutes();
    this.setData({
      acceptTime:time
    })
    wx.cloud.callFunction({
      name: 'merchantUpdate',
      data:{
       _id: this.data.orderid,
       acceptTime:this.data.acceptTime,
       condition:'出餐中'
      },
      success: res => {
         console.log('更新数据成功')
      }
   })
   
     
      wx.showToast({
        title: '接单成功',
      })
      
    var page=0;
    wx.navigateBack({
      complete: (res) => {'返回成功'},
    })
   
    
  },

  
 
})
