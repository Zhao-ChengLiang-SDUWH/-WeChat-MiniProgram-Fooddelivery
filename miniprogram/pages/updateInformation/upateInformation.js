// pages/updateInformation/upateInformation.js
const db = wx.cloud.database()
const userCollection = db.collection('User')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender:'',
    show2:false,
    show:false,
    userInfo:{},
    institute:'',
    error:'',
    columns: ['数学与统计学院', '商学院', '文化传播学院', '机电与信息工程学院', '艺术学院', '海洋学院', '东北亚学院', '翻译学院', '空间科学与物理学院', '法学院', '澳国立理学院', '马克思主义学院']
  },


  onConfirm(event) {
    console.log(event);
    this.setData({ 
      show: false ,
      institute:event.detail.value
    });
  },

  onCancel() {
    this.setData({ show: false });
  },
 
  showPopup() {
    this.setData({ show: true });
  },

  onClose() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userCollection.doc(app.globalData.openid).get({
      success:res=>{
        console.log(res.data)
        this.setData({
          userInfo:res.data,
          institute:res.data.institute
        })
        if(res.data.gender == 2){
          this.setData({
            gender:'女'
          })
        }
        else if(res.data.gender == 1){
          this.setData({
            gender:'男'
          })
        }
      }
    })
    
  },

  
  onSubmit: function(e) {
    if(e.detail.value.name && e.detail.value.studentID && e.detail.value.phone && this.data.institute){
      console.log(e.detail)
      if(e.detail.value.name != this.data.userInfo.name){
        userCollection.doc(app.globalData.openid).update({
          data: {
            name:e.detail.value.name
          },
          success: function() {
            console.log('姓名更新成功')
          }
        })
      } 
       if(e.detail.value.nickName != this.data.userInfo.nickName){
        userCollection.doc(app.globalData.openid).update({
          data: {
            nickName:e.detail.value.nickName
          },
          success: function() {
            console.log('昵称更新成功')
          }
        })
      } 
       if(e.detail.value.studentID != this.data.userInfo.studentID){
        userCollection.doc(app.globalData.openid).update({
          data: {
            studentID:e.detail.value.studentID
          },
          success: function() {
            console.log('学号更新成功')
          }
        })
      } 
       if(e.detail.value.phone != this.data.userInfo.phone){
        userCollection.doc(app.globalData.openid).update({
          data: {
            phone:e.detail.value.phone
          },
          success: function() {
            console.log('电话号码更新成功')
          }
        })
      } 
      if(this.data.userInfo.institute != this.data.institute){
        userCollection.doc(app.globalData.openid).update({
          data: {
            institute:this.data.institute
          },
          success: function() {
            console.log('学院更新成功')
          }
        })
      } 
  
      if(e.detail.value.gender != this.data.gender){
        console.log("different")   
         if(e.detail.value.gender == "男"){
          userCollection.doc(app.globalData.openid).update({
            data: {
              gender:2
            },
            success: function() {
              console.log('性别更新成功')
            }
        })
      }
      else{
        userCollection.doc(app.globalData.openid).update({
          data: {
            gender:1
          },
          success: function() {
            console.log('性别更新成功')
          }
      })
      } 
    }
    wx.navigateTo({
      url: '/pages/Deliver_mine/Deliver_mine?show=false'
    })
    } 
    else{
      this.setData({
        show2:true
      })
    }
  }
    
  

})