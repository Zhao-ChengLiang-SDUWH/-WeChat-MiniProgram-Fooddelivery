const db = wx.cloud.database()
const order = db.collection('order')
const hisorder = db.collection('history_order')
const user = db.collection('User')
const stores = db.collection('stores')

Page({
  externalClasses: ['i-class'],
  options: {
    addGlobalClass: true
  },
  data: {

    hisorders:[],
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
    hisorder.where({
      _id:this.data.orderid
    }).get().then(res =>{
      this.setData({
        hisorders:res.data
        
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

  

  
 
})
