//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        env:'class-bluetooth-kuduw',
        traceUser:true
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        // env: 'my-env-id',
        
      })
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          console.log("云函数 [login] user openid: ", res.result.wxInfo.OPENID)
          this.globalData.openid = res.result.wxInfo.OPENID;
        },
        fail: res => {
          console.log("云函数 [login] 调用失败")
        }
      })
    }
    
    this.globalData = {
      userInfo:null,
      show2: false,
      show: false,
      cart:[],
      goods:[],
      shop: [],
      newUser:'',
      deliveryFee:'',
      lunchboxFee:'',
      openid:"",
      tabBar: {
        "color": "#8a8a8a",
        "selectedColor": "#FF8C00",
        "backgroundColor": "F0E68C",
        "borderStyle": "ccc",
        "list": [
          {
            "pagePath": "/pages/homepage/homepage",
            "text": "首页",
            "iconPath": "/images/shop.png",
            "selectedIconPath": "/images/Sshop.png",
            "clas": "menu-item",
            "selectedColor": "#FF8C00",
            active: true
          },
          {
            "pagePath": "/pages/User_dingdan/User_dingdan",
            "text": "订单",
            "iconPath": "/images/form.png",
            "selectedIconPath": "/images/Sform.png",
            "selectedColor": "#FF8C00",
            "clas": "menu-item",
            active: false
          },
          {
            "pagePath": "/pages/fun/fun",
            "text": "发现",
            "iconPath": "/images/faxian-6.png",
            "selectedIconPath": "/images/faxian-5.png",
            "selectedColor": "#FF8C00",
            "clas": "menu-item",
            active: false
          },
          {
            "pagePath": "/pages/User_mine/User_mine",
            "text": "我的",
            "iconPath": "/images/people.png",
            "selectedIconPath": "/images/Speople.png",
            "selectedColor": "#FF8C00",
            "clas": "menu-item",
            active: false
          }
        ],
        "position": "bottom"
      },
      tabBar1: {
        "color": "#9E9E9E",
        "selectedColor": "#f00",
        "backgroundColor": "#fff",
        "borderStyle": "#ccc",
        "list": [ 
          {
            "pagePath": "/pages/Deliver_curr/Deliver_curr",
            "text": "待接订单",
            "iconPath": "/images/form.png",
            "selectedIconPath": "/images/Sform.png",
            "selectedColor": "#FF8C00",
            "clas": "menu-item1",
            active: true
          },
          {
            "pagePath": "/pages/Deliverhomepage/Deliverhomepage",
            "text": "我的订单",
            "iconPath": "/images/waimai-.png",
            "selectedIconPath": "/images/Swaimai-.png",
            "selectedColor": "#FF8C00",
            "clas": "menu-item1",
            active: false
          },
          {
            "pagePath": "/pages/Deliver_mine/Deliver_mine",
            "text": "我的",
            "iconPath": "/images/people.png",
            "selectedIconPath": "/images/Speople.png",
            "selectedColor": "#FF8C00",
            "clas": "menu-item1",
            active: false
          }
        ],
        "position": "bottom"
      }
    }

    
  } ,
  
  //app.js  

  //第一种底部  
  editTabBar: function () {
    //使用getCurrentPages可以获取当前加载中所有的页面对象的一个数组，数组最后一个就是当前页面。

    var curPageArr = getCurrentPages();    //获取加载的页面
    var curPage = curPageArr[curPageArr.length - 1];    //获取当前页面的对象
    var pagePath = curPage.route;    //当前页面url
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }

    var tabBar = this.globalData.tabBar;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;    //根据页面地址设置当前页面状态    
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
  //第二种底部，原理同上
  editTabBar1: function () {
    var curPageArr = getCurrentPages();
    var curPage = curPageArr[curPageArr.length - 1];
    var pagePath = curPage.route;
    if (pagePath.indexOf('/') != 0) {
      pagePath = '/' + pagePath;
    }
    var tabBar = this.globalData.tabBar1;
    for (var i = 0; i < tabBar.list.length; i++) {
      tabBar.list[i].active = false;
      if (tabBar.list[i].pagePath == pagePath) {
        tabBar.list[i].active = true;
      }
    }
    curPage.setData({
      tabBar: tabBar
    });
  },
  
  


})
