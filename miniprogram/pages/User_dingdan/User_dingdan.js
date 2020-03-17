import Tab from '../../components/tab/index'
const db = wx.cloud.database()
const order = db.collection("order")
const history_order = db.collection("history_order")
const app = getApp()
// miniprogram/pages/User_dingdan/User_dingdan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    order:[],
    history:[],
    page:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar();
    order.where({
      _openid: app.globalData.openid
    }).get().then(res => {
      console.log(res)
      this.setData({
        order:res.data   
      })
      
  })
    history_order.where({
      userOpenid: app.globalData.openid
    }).limit(10).get().then(res => {
      console.log(res)
      this.setData({
        history: res.data
      })

    })
  },


onChange(event) {
  
    this.setData({
          active: Number(event.detail.name)
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
    wx.hideHomeButton()
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
    console.log("触底了")

    let page = this.data.page + 10;
    console.log(page)
    history_order.skip(page).where({
      userOpenid: app.globalData.openid
    }).get().then(res => {
      let new_data = res.data
      let old_data = this.data.history
      this.setData({
        history: old_data.concat(new_data),
        page: page
      })
      console.log(this.data.history)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})