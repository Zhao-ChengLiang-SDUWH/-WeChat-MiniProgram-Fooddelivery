const db = wx.cloud.database()
const stores = db.collection('stores')
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    item: Object,
    border: {
      type: Boolean,
      value: false
    }
  },
  data: {
    sign: true,
    show: false,
    stores:[]
  },
  methods: {
    shopDetail () {
      wx.navigateTo({
        url: '/pages/mine_shopDetail/mine_shopDetail'
      })
    },

    onmerchantSign () {
      this.setData({
        show: !this.data.show
      })
    },

    onClose() {
      this.setData({ show: false });
    },

    noselectSign (e) {
      let id = e.currentTarget.dataset.id
      if (id === '0') {
        stores.where({
          _openid:'o7CHY5SHTnnNB8IbHkqI-xepgNik ' 
        }).update({
          data: {
            condition: 营业中
          },
          success: console.log,
          fail: console.error
        })
        this.setData({
          sign: true,
          show: false
        })
      }else{
        stores.where({
          _openid:' o7CHY5SHTnnNB8IbHkqI-xepgNik  '
        }).update({
          data: {
            condition: 已关店
          },
          success: console.log,
          fail: console.error
        })
        this.setData({
          sign: false,
          show: false
        })
      }
      this.triggerEvent('sign', id)
    }
  
  },
  onLoad:function (options) {
   
    stores.where({
      _openid:'o7CHY5SHTnnNB8IbHkqI-xepgNik'
    }).get().then(res =>{
      this.setData({
        stores:res.data
      })
    })
  }
})