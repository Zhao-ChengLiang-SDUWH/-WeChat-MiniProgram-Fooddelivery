// pages/createNewList/createNewList.js
import Popup from '@vant/weapp/popup/index';
import Dialog from '@vant/weapp/dialog/dialog';
const db = wx.cloud.database()
const orderCollection = db.collection('order')
const app = getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    startingPrice:5,
    cnt: 0,
    value1: 0,
    switch1: 0,
    user:[],
    goods: [],
    deliveryFee:'',
    goodsDic:{},
    orderGoodsList:[],
    tmpAddress:[],
    address:[],
    show:false,
    radio:'1',
    show2:false,
    value:'',
    disabled:false,
    show3:false,
  },
  getUserInfo2(event) {
    wx.navigateBack({//返回
      delta: 1
    })
  },

  getUserInfo(event) {
    console.log('success');
    this.setData({
      show3:true
    })
    db.collection('User').doc(app.globalData.openid).update({
      data: {
        newUser: false
      },
      success: res => {
        console.log('success')
      }
    })
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var time = date.getFullYear() + '-' + (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + "\t" + date.getHours() + ":" + date.getMinutes()
    
    
    orderCollection.add({
      data: {
        //_id: app.globalData.openid,            //openid作为id
        acceptTime:'',      //性别 1是男  2是女
        actualTotal:this.data.cart.total,//头像地址
        address:this.data.user.address[this.data.switch1].address,
        arriveTime:'',
        condition:'待接单',
        deliveryFee:this.data.deliveryFee,
        lunchboxFee:this.data.lunchboxFee,
        deliverTime:'',
        goods:this.data.orderGoodsList,
        merchantOpenid:app.globalData.shop._openid,
        orderTime:time,
        riderOpenid:'',
        merchant: app.globalData.shop.name,
        nickName:this.data.user.nickName,
        total:this.data.actotal
      },
      success: res => {
        console.log('信息保存成功')
      }
    })






  },
  onClose3(){
    wx.navigateBack({//返回
      delta: 1
    })
  },
  onClose2() {
    this.setData({ close: false });
  },
  onChange2(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
  },


  
  onChange(event) {
    this.setData({
      radio: event.detail
    });
  },

  onClick(event) {
    const { name } = event.currentTarget.dataset;
    this.setData({
      radio: name
    });
    console.log('ok')
    this.onClose()
    this.setData({
      show2:true
    })
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
    db.collection('User').doc(app.globalData.openid).get({
      success: res => {
        this.setData({
          user: res.data,
        });
        //
        if (this.data.cnt == 0) {
          var tmpCart = app.globalData.cart
          app.globalData.cart = []
          this.setData({
            actotal: tmpCart.total
          })
          var goodsDiscount = app.globalData.shop.goodsDiscount
          console.log(goodsDiscount)
          for (let dis in goodsDiscount) {
            console.log(goodsDiscount[dis].total)
            if (tmpCart.total >= goodsDiscount[dis].total) {
              tmpCart.total = tmpCart.total - goodsDiscount[dis].discount
              break
            }
          }

          if (this.data.user.newUser == true && (tmpCart.total >= app.globalData.shop.userDiscount)) {
            tmpCart.total = tmpCart.total - app.globalData.shop.userDiscount
          }
          console.log(tmpCart.total)
          tmpCart.total = (tmpCart.total + app.globalData.deliveryFee + app.globalData.lunchboxFee)

          this.setData({
            cart: tmpCart,
            goods: app.globalData.goods,
            deliveryFee: app.globalData.deliveryFee,
            lunchboxFee: app.globalData.lunchboxFee,
            startingPrice: app.globalData.shop.startingPrice

          })
          console.log(this.data.user.newUser)

          if (this.data.cart.total < this.data.startingPrice) {
            this.setData({
              disabled: true
            })
            console.log('dis')
          }



          var orderGoodsList = []
          for (let i in tmpCart.list) {
            this.setData({
              goodsDic: {
                'name': this.data.goods[i].title,
                'number': tmpCart.list[i],
                'price': this.data.goods[i].price
              }
            })
            orderGoodsList.push(this.data.goodsDic)
          }
          this.setData({
            orderGoodsList: orderGoodsList
          })
          this.data.cnt++
        }







        //
        for (var i = 0; i < this.data.user.address.length; i++) {
          var tmpDic = {}
          if (this.data.user.address[i].detailAddress!=null){
            tmpDic['text'] = this.data.user.address[i].address +' '+ this.data.user.address[i].detailAddress
          }
          else{
            tmpDic['text'] = this.data.user.address[i].address
          }
          tmpDic['value'] = i
          console.log(tmpDic)
          this.data.tmpAddress[i] = tmpDic
        }
        this.setData({
          address: this.data.tmpAddress
        })
        console.log(tmp.address)
      },
    })
    
    
    
    
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.onLoad()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  onSwitch1Change({ detail }) {
    this.setData({ switch1: detail });
  },
  addNewAddress: function (e) {
    wx.navigateTo({
      url: '/pages/addLocation/addLocation',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },
  submitList: function (e) {
    console.log('ssss')
    this.setData({
      show:true
    })
  }

})

