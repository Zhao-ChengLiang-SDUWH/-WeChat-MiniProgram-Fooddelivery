// pages/locationDetail/locationDetail.js
const app = getApp()
const db = wx.cloud.database()
const userCollection = db.collection('User')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    radio:'1',
    address:{},
    allAddress:[],
    id:0,
    newAddress:''
  },

  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },

  chooseAddress:function(){
    let _this = this
    wx.chooseLocation({
      success: (res) => {
        console.log(res)
        _this.setData({
         newAddress:res.name
       }) 
      },
    })
  },
 
  save:function(e){
    if(this.data.newAddress && e.detail.value.name && e.detail.value.phone){
      var id = this.data.id
      var address = this.data.allAddress
      address[id] = {_id:id,address:this.data.newAddress,detailAddress:e.detail.value.detailAddress,name:e.detail.value.name,gender:e.detail.value.先生,phone:e.detail.value.phone}
    userCollection.doc(app.globalData.openid).update({
      data: {
        address:this.data.allAddress
      },
      success: function() {
        console.log('地址保存成功')
        wx.navigateTo({
          url: '/pages/chooseLocation/chooseLocation',
        })
      } 
    })
  }
    else{
      this.setData({
        show:true
      })
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = options.nid
    userCollection.doc(app.globalData.openid).get({
      success:res=>{
        this.setData({
          allAddress:res.data.address,
          address:res.data.address[id],
          id:options.nid,
          newAddress:res.data.address[id].address
        })
        console.log(id)
        console.log(this.data.address)
    }
  })
  },

  delete:function(){
    var id = this.data.id
    var address = this.data.allAddress
    address.splice(id, 1)
    var len = address.length
    //console.log(len)
    //console.log(address[len])
    address[len-1]._id = id
    userCollection.doc(app.globalData.openid).update({
      data: {
        address:this.data.allAddress
      },
      success: function() {
        console.log('地址保存成功')
        wx.navigateTo({
          url: '/pages/chooseLocation/chooseLocation',
        })
  }
})
  }
})