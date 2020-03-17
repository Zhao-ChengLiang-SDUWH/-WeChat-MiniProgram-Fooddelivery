const app = getApp()
const db = wx.cloud.database()
// pages/shop_mine/shop_mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:[],
    goods: [],
    goodsArray: [],
    tmp: [],
    selectedFodds:[],
    cart: {
      count: 0,
      total: 0,
      list: {}
    },
    showCartDetail: false,
    followedStores:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(options.id)
    db.collection('stores').doc(options.id).get({
      success: res => {
        this.setData({
          shop: res.data
        });
        this.data.shop.goodsDiscount.sort(function (a, b) {
          if (a.total > b.total) {
            return -1;
          } else if (a.total == b.total) {
            return 0;
          } else {
            return 1;
          }
        })
        for (var i = 0; i < this.data.shop.goodsList.length; i++) {
          this.data.tmp.push([])
        }
      }
    })
    db.collection('User').doc(app.globalData.openid).get({
      success: res => {
        this.setData({
          followedStores: res.data.followedStores
        })
        if (this.data.followedStores.indexOf(this.data.shop._id) > -1){
          console.log('in')
          this.setData({
            followed:true
          })
        }

      }
    })

    db.collection('goods').where({
      _openid: options.id
    }).get({
      success: res => {
        this.setData({
          goods: res.data          
        });
       

        for (var i = 0; i < this.data.goods.length; i++) {
          for (var j = 0; j < this.data.shop.goodsList.length; j++) {
            if (this.data.goods[i].tag == this.data.shop.goodsList[j].classifyName) {
              this.data.tmp[j].push(i);
              break;
            }
          }
        }
        var tmp = this.data.tmp
        this.setData({
          goodsArray: tmp
        })       
      }
      
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
    //console.log(this.data.shop)
   // this.setData({
    //  classifySeleted: this.data.shop.goodList[0].id
  //  });
    this.countCart()
  },

  tapAddCart: function (e) {
    this.addCart(e.target.dataset.id);
  },
  tapReduceCart: function (e) {
    this.reduceCart(e.target.dataset.id);
  },
  addCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    this.data.cart.list[id] = num + 1;
    this.countCart();
  },
  reduceCart: function (id) {
    var num = this.data.cart.list[id] || 0;
    if (num <= 1) {
      delete this.data.cart.list[id];
    } else {
      this.data.cart.list[id] = num - 1;
    }
    this.countCart();
  },
  countCart: function () {
    var count = 0,
      total = 0;
    for (var id in this.data.cart.list) {
      var goods = this.data.goods[id];
      count += this.data.cart.list[id];
      total += goods.price * this.data.cart.list[id];
    }
    this.data.cart.count = count;
    this.data.cart.total = total;
    this.setData({
      cart: this.data.cart
    });
  },
  onGoodsScroll: function (e) {
    if (e.detail.scrollTop > 10 && !this.data.scrollDown) {
      this.setData({
        scrollDown: true
      });
    } else if (e.detail.scrollTop < 10 && this.data.scrollDown) {
      this.setData({
        scrollDown: false
      });
    }
  
    var scale = e.detail.scrollWidth / 570,
      scrollTop = e.detail.scrollTop / scale,
      h = 0,
      classifySeleted,
      len = this.data.shop.goodsList.length;
      var goodsLen = [];
    this.data.goodsArray.forEach(function(classify, i) {
      goodsLen.push(classify.length);
    })
    this.data.shop.goodsList.forEach(function (classify, i) {
      var _h = 70 + goodsLen[i] * (46 * 3 + 20 * 2);
      if (scrollTop >= h - 100 / scale) {
        classifySeleted = classify.id;
      }
      h += _h;
    });
    this.setData({
      classifySeleted: classifySeleted
    });
  },
  tapClassify: function (e) {
    var id = e.target.dataset.id;
    this.setData({
      classifyViewed: id
    });
    var self = this;
    setTimeout(function () {
      self.setData({
        classifySeleted: id
      });
    }, 100);
  },
  showCartDetail: function () {
    this.setData({
      showCartDetail: !this.data.showCartDetail
    });
  },
  hideCartDetail: function () {
    this.setData({
      showCartDetail: false
    });
  },
  follow: function () {
		this.setData({
			followed: !this.data.followed
		});
    if (this.data.followed == false) {
      var followedStores = this.data.followedStores
      followedStores.pop(this.data.shop._id)
      this.setData({
        followedStores:followedStores
      })
      db.collection('User').doc(app.globalData.openid).update({
        data: {
          followedStores: followedStores
        },
        success: res => {
          console.log('success')
        }
      })

    }
    else {
      
      var followedStores = this.data.followedStores
      followedStores.push(this.data.shop._id)
      this.setData({
        followedStores: followedStores
      })
      db.collection('User').doc(app.globalData.openid).update({
        data: {
          followedStores: followedStores
        },
        success: res => {
          console.log('success')
        }
      })
    }
    
	},


  submit: function (e) {
    app.globalData.cart = this.data.cart
    app.globalData.goods = this.data.goods
    app.globalData.deliveryFee = this.data.shop.deliveryFee
    app.globalData.lunchboxFee = this.data.shop.lunchboxFee
    app.globalData.newUser = this.data.newUser
    app.globalData.shop = this.data.shop
    
    console.log(this.data.cart)
    wx.navigateTo({
      url: '/pages/createNewList/createNewList',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  }
});

