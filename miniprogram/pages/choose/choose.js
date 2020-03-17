// pages/choose/choose.js
const db = wx.cloud.database();
const userCollection = db.collection('User');
const storeCollection = db.collection('stores')
let app = getApp();
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    active: 'home',
    isNewUser: false,
    isNewDeliver: false,
    isNewStore: false,
    isNew:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.openid);
    userCollection.doc(app.globalData.openid).get().then(res => {
      if (res.data) {
        if(res.data.role == '0'){
          this.setData({
            isNewDeliver: true
          })
        }
        else if(res.data.role == '1'){
          this.setData({
            isNewUser : true
          })
        }
        }
    }).catch(res => {
      this.setData({
        isNew: true
      })
    })

    userCollection.doc(app.globalData.openid).get().then(res => {
      if (res.data) {
        console.log(res.data)
      }
    }).catch(res => {
      this.setData({
        isNewStore:true
      })
    })
  },

  
  onChange(event) {
    this.setData({ active: event.detail });
  },
  
  

  getUserInfo:function(e){
    console.log(e);
      if(this.data.isNew){
        app.globalData.userInfo = e.detail.userInfo;
        app.globalData.show = true
        userCollection.add({
         data:{
             _id:app.globalData.openid,            //openid作为id
             gender:e.detail.userInfo.gender,      //性别 1是男  2是女
             avatarUrl:e.detail.userInfo.avatarUrl,//头像地址
             nickName:e.detail.userInfo.nickName,  //昵称
             role:'0',                             //角色  0普通用户  1骑手  2商家  3既是用户又是骑手
             phone:'',                             //电话
             institute:'' ,                         //学院
             studentID:'',                         //学号
             address:[],                           //地址
             followedStores:[],                    //已关注店铺
             newUser:true
         },
         success:res=>{
           console.log('信息保存成功')
         }
      })
    }
      else if(this.data.isNewUser){
        userCollection.doc(app.globalData.openid).update({
          // data 传入需要局部更新的数据
          data: {
            // 表示将 done 字段置为 true
            role: '3',
            newUser:true
          },
          success: function() {
            console.log('信息更新成功')
          }
        })
      
    }
          wx.navigateTo({
          
            url: '/pages/homepage/homepage',
          })
    },

  getDeliverInfo:function(e){
    console.log(e);
      if(this.data.isNew == true){
        app.globalData.userInfo = e.detail.userInfo;
        app.globalData.show = true;
       userCollection.add({
        data:{
          _id:app.globalData.openid,            //openid作为id
            gender:e.detail.userInfo.gender,      //性别 1是男  2是女
            avatarUrl:e.detail.userInfo.avatarUrl,//头像地址
            nickName:e.detail.userInfo.nickName,  //昵称
            name:'',                              //真实姓名
            role:'1',                             //角色  0普通用户 1骑手  2商家  3既是用户又是骑手
            phone:'',                             //电话
            institute:'' ,                         //学院
            studentID:'',                         //学号
            address:[],                           //地址
            followedStores:[],                    //已关注店铺
            day_income:0,
            total_income:0
        },
        success:res=>{
          console.log('信息保存成功')
        }
    })
   }
   else if(this.data.isNewDeliver == true){
     app.globalData.show = true
    userCollection.doc(app.globalData.openid).update({
      data: {
        role:'3',
        name:'',
        day_income:0,
        total_income:0
      },
      success: function(res) {
        console.log('信息更新成功')
      }
    })
      } 
      wx.navigateTo({
        url: '/pages/Deliverhomepage/Deliverhomepage'
      })     
  },

  getBusinessInfo:function(e)
  {
    if(this.data.isNewStore){
      app.globalData.show2 = true;
      userCollection.add({
        data:{
            _id:app.globalData.openid,            //openid作为id  
            avatarUrl:e.detail.userInfo.avatarUrl,//头像地址
            nickName:e.detail.userInfo.nickName,  //昵称
            role:'2',                             //角色  0普通用户 1骑手  2商家  3既是用户又是骑手
            phone:'',                             //电话
        },
        success:res=>{
          console.log('商家信息保存成功')
        }
    })
    storeCollection.add({
      data:{
        _id:app.globalData.openid,            //openid作为id  
          address:'',
          des:'',  
          name:'',                            
          tags:[], 
        thumb:'cloud://class-bluetooth-kuduw.636c-class-bluetooth-kuduw-1301103529/icon-test.png',
          total_income:0,
          visit:0,
          goodsDiscount:[],
          week_income:0,
          commentGrade:4,
          condition:'',
          deliveryFee:0,
          lunchboxFee:0,
          monthlySale:0,
          startingPrice:0,
          userDiscount:0 ,
          avg:0,
        goodsList: [{ "classifyName": "热销", "id": "hot" }, { "classifyName": "主食", "id": "food" }, { "classifyName": "小吃", "id": "xiaochi" }, { "classifyName": "饮料", "id": "drink" }, { "classifyName": "套餐", "id": "comb" },{ "classifyName": "新品", "id": "new" },{ "classifyName": "其他", "id": "other" }]
        

      },
      success:res=>{
        console.log('商家信息保存成功2')
      }
  })
    }
    
  wx.switchTab({
    url: '/pages/order/order',
  })
},

// onUnload: function () {
//   wx.reLaunch({
//     url: '/pages/choose/choose'
//   })
// },
})