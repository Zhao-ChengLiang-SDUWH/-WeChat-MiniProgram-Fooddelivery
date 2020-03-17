// pages/favoriteStore/favoriteStore.js
const app = getApp()
const db = wx.cloud.database()
const userCollection = db.collection('User')
const storeCollection = db.collection('stores')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    stores:[],
    storesData:[],
    tmp:[],
    show:false,
    text:"编辑",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userCollection.doc(app.globalData.openid).get({
      success:res=>{
        console.log(res.data)
        this.setData({
          stores:res.data.followedStores
        })
        var stores = this.data.stores
        var length = stores.length
        for(var i=0;i<length;i++){
          console.log('i'+i)
         storeCollection.doc(stores[i]).get({
          success:res=>{
            this.data.tmp.push({name:res.data.name,thumb:res.data.thumb,condition:res.data.condition,id:res.data._id})
            var tmp = this.data.tmp
            this.setData({
              storesData:tmp
            })
          }

          })
       }
  }
})
  },

 edit:function(){
   if(this.data.text == "编辑"){
    this.setData({
      show:true,
      text:"完成"
    })
  }
    else{
      this.setData({
        show:false,
        text:"编辑"
      })
    }
  
 },
goto:function(e){
  var ccc = e.currentTarget.dataset.shop;//获取view中的药用currentTarget
  console.log(ccc);
  wx.navigateTo({
    url: '/pages/User_shop/User_shop?id='+ccc,
  })
},


 delete:function(e){
    var id = parseInt(e.currentTarget.id)
   this.data.stores.splice(id,1)
   this.data.tmp.splice(id,1)
   this.setData({
    storesData:this.data.tmp
   })
   userCollection.doc(app.globalData.openid).update({
    data: {
      followedStores:this.data.stores
    },
    success: function() {
      console.log('删除成功')
      
}
}) 
 }
})