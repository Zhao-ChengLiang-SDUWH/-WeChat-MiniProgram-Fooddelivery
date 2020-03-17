import Tab from '../../components/tab/index'
const db = wx.cloud.database()
const order = db.collection('order')
const hisorders = db.collection('history_order')
const _ = db.command
const app = getApp()
Page({
  data: {
    show: false,
   orders:[],
   hisorders:[],
   goods:[],
   orderid:'',
   riderOpenid:'',
   value1:'',
   condition:'',
   ordercondition:'',
   ordernum:'',
   hisordernum:'',
   page:0,

  },

  onChange: function(e) {
    this.setData({
      value1:e.detail
    });
  },

onSearch:  function (event)  {
  order.where({
  nickName: this.data.value1,
  condition:this.data.ordercondition,
    merchantOpenid: app.globalData.openid,
}).get().then(res=>{
  this.setData({
    orders:res.data,
    
  })
  console.log(this.data.orders)

  })     
},

selectOrder:function(e){
  
  order.where({
    condition: e.detail.name,
    merchantOpenid: app.globalData.openid,
  }).get().then(res => {
    this.setData({
      orders: res.data,
      page:0,
      ordercondition:e.detail.name
    })
  }) 

  order.where({
    merchantOpenid: app.globalData.openid,
    condition: e.detail.name
  }).count().then(res => {
    this.setData({
      ordernum:res.total
    })
    console.log(this.data.ordernum)
  })  

  hisorders.where({
    merchantOpenid: app.globalData.openid,
  }).count().then(res => {
    this.setData({
      hisordernum:res.total
      
    })
    console.log(this.data.hisordernum)
  }) 

  hisorders.where({
    merchantOpenid: app.globalData.openid,
  }).get().then(res => {
    this.setData({
      hisorders: res.data,
      page:0,
    })
  })  


},
 
   

  onLoad:function (options) {
    this.setData({
      show: app.globalData.show2
    }) 
    order.where({
      merchantOpenid: app.globalData.openid,
      condition:'待接单'
    }).count().then(res => {
      this.setData({
        ordernum:res.total
      })
      console.log(this.data.ordernum)
    })   

      order.where({
        condition:'待接单',
        merchantOpenid: app.globalData.openid
      }).get().then(res =>{
        
        this.setData({
          orders:res.data,  
          ordercondition:'待接单' , 
        })
        console.log(this.data.orders)
      })

        order.where({
          condition:'待接单',
          merchantOpenid: app.globalData.openid
        }).field({
          goods:true,
          _id:false
        }).get().then(res =>{
          
          this.setData({
              goods:res.data,
                               
          })
      
         console.log(this.data.goods)
        })

        hisorders.where({
          merchantOpenid: app.globalData.openid
        }).get().then(res =>{
          
          this.setData({
            hisorders:res.data,   
          })
          console.log(this.data.hisorders)
        })

        hisorders.where({
          merchantOpenid: app.globalData.openid,
        }).count().then(res => {
          this.setData({
            hisordernum:res.total
          })
          console.log(this.data.hisordernum)
        })  
      

    },

  onorderDetail:function (e) {
    console.log(e.detail);   
 var orderid=e.currentTarget.dataset.orderid ;
 var goods1=JSON.stringify(e.currentTarget.dataset.goods) ;
 var riderOpenid=e.currentTarget.dataset.rideropenid ;
 var merchantOpenid=e.currentTarget.dataset.merchantopenid ;

    wx.navigateTo({
      url:'/pages/order_Detail/order_Detail?orderid='+ orderid + "&riderOpenid=" + riderOpenid +"&merchantOpenid="+merchantOpenid+"&goods="+goods1+"&ordernum="+this.data.ordernum+"&hisordernum="+this.data.hisordernum,
    })
    console.log(orderid)
    console.log(riderOpenid)
  } ,
  onorderDetail1:function (e) {
    console.log(e.detail);   
 var orderid=e.currentTarget.dataset.orderid ;
 var goods1=JSON.stringify(e.currentTarget.dataset.goods) ;
 var riderOpenid=e.currentTarget.dataset.rideropenid ;
 var merchantOpenid=e.currentTarget.dataset.merchantopenid ;

    wx.navigateTo({
      url:'/pages/order_Detail1/order_Detail1?orderid='+ orderid + "&riderOpenid=" + riderOpenid +"&merchantOpenid="+merchantOpenid+"&goods="+goods1+"&ordernum="+this.data.ordernum+"&hisordernum="+this.data.hisordernum,
    })
    console.log(orderid)
    console.log(riderOpenid)
  } ,

  onPullDownRefresh:function(res){
    order.where({
      condition:this.data.ordercondition,
      merchantOpenid: app.globalData.openid
    }).get().then(res => {
      this.setData({
        orders: res.data,
        page:0
      })

      order.where({
        merchantOpenid: app.globalData.openid,
        condition:this.data.ordercondition
      }).count().then(res => {
        this.setData({
          ordernum:res.total
        })
        console.log(this.data.ordernum)
      })  
    
      hisorders.where({
        merchantOpenid: app.globalData.openid,
      }).count().then(res => {
        this.setData({
          hisordernum:res.total
        })
        console.log(this.data.hisordernum)
      })  

     wx.stopPullDownRefresh();
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1000,
          mask: true
        });
    
        
 
    })
    },
  goUpdate: function (e) {
    console.log(e)
    app.globalData.show2 = false
    wx.navigateTo({
      url: '/pages/store_mine/store_mine',
    })
  },
  onReachBottom: function () {
 
    console.log("触底了")
    
    let page = this.data.page + 20;
    console.log(page)
    order.skip(page).where({
      condition:this.data.ordercondition,
      merchantOpenid: app.globalData.openid
    }).get().then(res => {
      let new_data = res.data
      let old_data = this.data.orders
      this.setData({
        orders: old_data.concat(new_data),
        page: page
      }, res => {
        console.log(res)

      })
    })
  },
})