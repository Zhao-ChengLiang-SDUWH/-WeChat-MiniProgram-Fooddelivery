// pages/addLocation/addLocation.js
const app = getApp()
const db = wx.cloud.database()
const userCollection = db.collection('User')
var newAddress=[]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    radio:'1',
    newAddress:[],
    address:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userCollection.doc(app.globalData.openid).get({
      success:res=>{
        this.setData({
          newAddress:res.data.address
        })
        console.log(res.data.address)
    }
  })
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
        address:res.name
      }) 
     },
   })
 },

 save:function(e){
   console.log(e.detail.value)
  if(e.detail.value.name && e.detail.value.phone && this.data.address){
    this.data.newAddress.push({_id:this.data.newAddress.length,address:this.data.address, detailAddress:e.detail.value.detailAddress, name:e.detail.value.name, gender:e.detail.value.先生, phone:e.detail.value.phone})
    console.log(this.data.newAddress)
    userCollection.doc(app.globalData.openid).update({
      data: {
        address:this.data.newAddress,
      },
      success: function(res) {
        console.log(res)
        console.log('地址保存成功')
        wx.navigateBack({
          delta:1
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

})