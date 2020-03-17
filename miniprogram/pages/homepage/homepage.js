const db = wx.cloud.database()
const stores = db.collection("stores")

const app = getApp()
var QQMapWX = require('../../qqmap-wx-jssdk.js');
var qqmapsdk;
var util = require('../../utils/util.js')
var myDate = new Date()

// pages/homepage/homepage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:false,
    page:0,
text2:'',
    switchTitle1: '优惠',
    switchTitle2: '满减',
    value3: '',
    list: [],
    itemTitle: '筛选',
    option1: [
      { text: '好评优先', value: 0 },
      { text: '人均从低到高', value: 1 },
      { text: '人均从高到低', value: 2 }
    ],
    value1: 0,
    value2: 0,
    image: '',
    state: [],
    stores: [],
    x:0,
    y:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      show:app.globalData.show
    })
 
    //console.log(app.globalData.userInfo.OPENID)
    
    
    wx.requestSubscribeMessage({
      tmplIds: ['WCqO5XuySDpBRdPWsvTFGeiRCtRYxE4OXoDNCwGrpQU','Krp3IAhLlJgvPNzUF3BtNXkydvRDAxSiV3YE1tOGM18', "WCqO5XuySDpBRdPWsvTFGT3KeBQGatBrEQyv3qOR3mI"],
      success(res) {
        
       }
    })
    app.editTabBar();
    qqmapsdk = new QQMapWX({
      key: 'N5YBZ-OOUKW-AG2RC-OGOGP-ZEQ42-WIFZC'
    });
    var url=[]
    wx.cloud.getTempFileURL({
      fileList: ["cloud://class-bluetooth-kuduw.636c-class-bluetooth-kuduw-1301103529/bacon-and-eggs-icon.png", "cloud://class-bluetooth-kuduw.636c-class-bluetooth-kuduw-1301103529/noodle-icon.png", "cloud://class-bluetooth-kuduw.636c-class-bluetooth-kuduw-1301103529/hamburger-icon.png", "cloud://class-bluetooth-kuduw.636c-class-bluetooth-kuduw-1301103529/roast-chicken-icon.png", "cloud://class-bluetooth-kuduw.636c-class-bluetooth-kuduw-1301103529/coffee--icon.png","cloud://class-bluetooth-kuduw.636c-class-bluetooth-kuduw-1301103529/watermelon-icon.png"],
      success: res => {
        for (var j = 0; j < res.fileList.length; j++) {
          url[j] = res.fileList[j].tempFileURL}
        this.setData({
          image1: url
        })
        console.log(this.data.image1)
      },
      fail: err => {

      }
    })
    stores.orderBy('grade', 'desc').limit(10).get().then(res => {
      this.setData({
        stores1: res.data,
        
      })
      console.log(this.data.stores1)
      var im = []
      var url = []
      for (var j = 0; j < this.data.stores1.length; j++) {
        im[j] = this.data.stores1[j].thumb
      }
      console.log(im)
      wx.cloud.getTempFileURL({
        fileList: im,
        success: res => {
          for (var j = 0; j < res.fileList.length; j++) {
            url[j] = res.fileList[j].tempFileURL
            this.data.stores1[j].url = res.fileList[j].tempFileURL
          }
          this.setData({
            stores: this.data.stores1
          })
          console.log(this.data.stores)
        },
        fail: err => {

        }
      })



    })

  },

  goUpdate: function(e){
    console.log(e)
    app.globalData.show = false
    wx.navigateTo({
      url: '/pages/Userupdate/Userupdate',
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


    this.setData({
      x:wx.getSystemInfoSync().windowWidth,
      y:wx.getSystemInfoSync().windowHeight
    })
  var time=myDate.getHours()
  console.log(time)
   if(time>=6&& time<10){
     wx.cloud.getTempFileURL({
       fileList: ["cloud://class-bluetooth-kuduw.636c-class-bluetooth-kuduw-1301103529/shouye-qingchenmianxing.png"]
     }).then(res => {
       this.setData({
         url1:res.fileList[0].tempFileURL,
         text:'早上好 ！'
       })
    
     }).catch(error => {
       // handle error
     })
   }
    if (time >= 10 && time < 17) {
      wx.cloud.getTempFileURL({
        fileList: ["cloud://class-bluetooth-kuduw.636c-class-bluetooth-kuduw-1301103529/icon-test.png"]
      }).then(res => {
        this.setData({
          url1: res.fileList[0].tempFileURL,
          text: '中午好 ！'
        })

      }).catch(error => {
        // handle error
      })
    }
    if (time >= 17 || time < 6) {
      wx.cloud.getTempFileURL({
        fileList: ["cloud://class-bluetooth-kuduw.636c-class-bluetooth-kuduw-1301103529/yueliang.png"]
      }).then(res => {
        this.setData({
          url1: res.fileList[0].tempFileURL,
          text: '晚上好 ！'
        })
        console.log(res.fileList)

      }).catch(error => {
        // handle error
      })
    }


   var that =this
    wx.hideHomeButton();
    qqmapsdk.reverseGeocoder({
      
      success: function (res) {
        that.setData({
         text2:res.result.formatted_addresses.recommend.slice(0,5).concat("...")
        })
        
      },
      fail: function (res) {
        console.log(res);
      }
      
    });

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
console.log("ha")
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    let page = this.data.page + 10;
    stores.skip(page).orderBy('grade', 'desc').get().then(res => {
      this.setData({
        stores2: res.data,

      })
      console.log(res.data)
      var im = []
      var url = []
      for (var j = 0; j < this.data.stores2.length; j++) {
        im[j] = this.data.stores2[j].thumb
      }
      console.log(im)
      wx.cloud.getTempFileURL({
        fileList: im,
        success: res => {
          for (var j = 0; j < res.fileList.length; j++) {
            url[j] = res.fileList[j].tempFileURL
            this.data.stores2[j].url = res.fileList[j].tempFileURL
          }
          
          let new_data = this.data.stores2
          let old_data = this.data.stores
          console.log(new_data)
          console.log(old_data)
          this.setData({
            stores: old_data.concat(new_data),
            page: page
          })
          console.log(this.data.stores)
        },
        fail: err => {

        }
      })



    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  onConfirm() {
    if (this.data.value2 == 0) {
      this.setData({
        state: ['grade', 'desc']

      })
    }
    if (this.data.value2 == 1) {
      this.setData({
        state: ['avg', 'asc']

      })

    }
    if (this.data.value2 == 2) {
      this.setData({
        state: ['avg', 'desc']
      })
    }

    console.log(this.data.state[1]);
    console.log(this.data.switch22);
    console.log(this.data.value2)
    stores.where({
      name: db.RegExp({
        regexp: this.data.value3,
      }), tags: this.options.tag,
      manjian: this.data.switch22,
      youhui: this.data.switch11,

    }).orderBy(this.data.state[0], this.data.state[1]).get().then(res => {
      this.setData({
        stores1: res.data,

      })
      console.log(this.data.stores1)
      var im = []
      var url = []
      for (var j = 0; j < this.data.stores1.length; j++) {
        im[j] = this.data.stores1[j].thumb
      }
      console.log(im)
      wx.cloud.getTempFileURL({
        fileList: im,
        success: res => {
          for (var j = 0; j < res.fileList.length; j++) {
            url[j] = res.fileList[j].tempFileURL
            this.data.stores1[j].url = res.fileList[j].tempFileURL
          }
          this.setData({
            stores: this.data.stores1
          })
          console.log(this.data.stores)
        },
        fail: err => {

        }
      })



    })

  },
gotoloc:function(){
  wx.navigateTo({
    url: '/pages/chooseLocation/chooseLocation',
  })
},
  onSwitch1Change({ detail }) {
    if (detail == false) {
      this.setData({ switch11: undefined, switch1: false });
    } else {
      this.setData({ switch11: true, switch1: true });
    }
  },

  onSwitch2Change({ detail }) {
    if (detail == false) {
      this.setData({ switch22: undefined, switch2: false });
    } else {
      this.setData({ switch22: true, switch2: true });
    }

  },
  change: function (event) {


    if (event.detail == 0) {
      console.log(event.detail)
      stores.where({
        name: db.RegExp({
          regexp: this.data.value3
        }), tags: this.options.tag,
        manjian: this.data.switch22,
        youhui: this.data.switch11,
      }).orderBy('grade', 'decs').get().then(res => {
        this.setData({
          stores1: res.data,
          value2: event.detail
        })
        console.log(this.data.stores1)
        var im = []
        var url = []
        for (var j = 0; j < this.data.stores1.length; j++) {
          im[j] = this.data.stores1[j].thumb
        }
        console.log(im)
        wx.cloud.getTempFileURL({
          fileList: im,
          success: res => {
            for (var j = 0; j < res.fileList.length; j++) {
              url[j] = res.fileList[j].tempFileURL
              this.data.stores1[j].url = res.fileList[j].tempFileURL
            }
            this.setData({
              stores: this.data.stores1
            })
            console.log(this.data.stores)
          },
          fail: err => {

          }
        })



      })

    }

    if (event.detail == 1) {
      console.log(event.detail)
      stores.where({
        name: db.RegExp({
          regexp: this.data.value3
        })
        , tags: this.options.tag,
        manjian: this.data.switch22,
        youhui: this.data.switch11,
      }).orderBy('avg', 'acs').get().then(res => {
        this.setData({
          stores1: res.data,
          value2: event.detail
        })
        console.log(this.data.stores1)
        var im = []
        var url = []
        for (var j = 0; j < this.data.stores1.length; j++) {
          im[j] = this.data.stores1[j].thumb
        }
        console.log(im)
        wx.cloud.getTempFileURL({
          fileList: im,
          success: res => {
            for (var j = 0; j < res.fileList.length; j++) {
              url[j] = res.fileList[j].tempFileURL
              this.data.stores1[j].url = res.fileList[j].tempFileURL
            }
            this.setData({
              stores: this.data.stores1
            })
            console.log(this.data.stores)
          },
          fail: err => {

          }
        })



      })

    }
    if (event.detail == 2) {
      console.log(event.detail)
      stores.where({
        name: db.RegExp({
          regexp: this.data.value3
        })
        ,
        tags: this.options.tag,
        manjian: this.data.switch22,
        youhui: this.data.switch11,
      }).orderBy('avg', 'desc').get().then(res => {
        this.setData({
          stores1: res.data,
          value2: event.detail
        })
        console.log(this.data.stores1)
        var im = []
        var url = []
        for (var j = 0; j < this.data.stores1.length; j++) {
          im[j] = this.data.stores1[j].thumb
        }
        console.log(im)
        wx.cloud.getTempFileURL({
          fileList: im,
          success: res => {
            for (var j = 0; j < res.fileList.length; j++) {
              url[j] = res.fileList[j].tempFileURL
              this.data.stores1[j].url = res.fileList[j].tempFileURL
            }
            this.setData({
              stores: this.data.stores1
            })
            console.log(this.data.stores)
          },
          fail: err => {

          }
        })



      })

    }
  },

  onChange: function (e) {
    this.setData({
      value3: e.detail
    });
  },

gosearch :function() {
 wx.navigateTo({
   url: '/pages/search/search',
 })

},
timenotice : function(){
  wx.navigateTo({
    url: '/pages/notice/notice',
  })
},
shop: function(e){
  var ccc = e.currentTarget.dataset.xxx;//获取view中的药用currentTarget
  console.log(ccc);
  wx.navigateTo({
    url: '/pages/User_shop/User_shop?id=' + ccc,
  })
}

})
