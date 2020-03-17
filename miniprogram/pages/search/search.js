const db=wx.cloud.database()
const stores = db.collection("stores")

// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switchTitle1: '优惠',
    switchTitle2: '满减',
 value3:'',
 list:[],
  itemTitle: '筛选',
  option1: [
      { text: '好评优先', value: 0 },
      { text: '人均从低到高', value: 1 },
      { text: '人均从高到低', value: 2 }
    ],
    value1: 0,
    value2:0,
    image:'',
    state:[],
    stores:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   console.log(this.options.tag) 
  if(Object.keys(this.options).length!==0){
    stores.where({
      name: db.RegExp({
        regexp: this.data.value3,
      }),
      type:this.options.tag
    }).orderBy('grade', 'desc').get().then(res => {
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

  }
  }
  ,

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  shop: function (e) {
    var ccc = e.currentTarget.dataset.id;//获取view中的药用currentTarget
    console.log(ccc);
    wx.navigateTo({
      url: '/pages/User_shop/User_shop?id=' + ccc,
    })
  },
  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
   onConfirm() {
     if(this.data.value2==0){
       this.setData({
        state:['grade','desc']
        
       })
     }
     if (this.data.value2 == 1) {
       this.setData({
         state:['avg', 'asc']

       })

     }
     if (this.data.value2 == 2) {
       this.setData({
         state:['avg', 'desc']
       })
     }
  
  console.log(this.data.state[1]);
  console.log(this.data.switch22);
  console.log(this.data.value2)
     stores.where({
       name: db.RegExp({
         regexp: this.data.value3,
       }), tags: this.options.tag,
       manjian:this.data.switch22,
       youhui:this.data.switch11,

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

  onSwitch1Change({ detail }) {
    if (detail == false) {
      this.setData({ switch11: undefined, switch1: false });
    } else {
      this.setData({ switch11: true, switch1: true });
    }
  },

  onSwitch2Change({ detail }) {
    if(detail==false){
      this.setData({ switch22: undefined,switch2:false });
    } else{
      this.setData({ switch22: true ,switch2:true});
    }
    
  },
  change: function(event){
    
   
      if(event.detail==0){
      console.log(event.detail)
       stores.where({
         name: db.RegExp({
           regexp: this.data.value3
         }), type: this.options.tag,
         manjian: this.data.switch22,
         youhui: this.data.switch11,
       }).orderBy('grade','decs').get().then(res => {
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

       if(event.detail==1){
       console.log(event.detail)
       stores.where({
         name: db.RegExp({
           regexp: this.data.value3
         })
         , type: this.options.tag,
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
       if(event.detail==2){
      console.log(event.detail)
       stores.where({
         name: db.RegExp({
           regexp: this.data.value3
         })
         ,
         tags:this.options.tag,
         manjian: this.data.switch22,
         youhui: this.data.switch11,
       }).orderBy('avg','desc').get().then(res => {
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

   
   

    
    // this.setData({value2:this.data.value})
   
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
  onChange: function(e) {
    this.setData({
      value3: e.detail
    });
  },

onSearch:  function (event)  {
  stores.where({
  name:db.RegExp({
    regexp:this.data.value3
    }), type: this.options.tag
}).orderBy('grade','desc').get().then(res=>{
  this.setData({
    stores1:res.data,
    
  })
  console.log(this.data.stores1)
  var im=[]
  var url=[]
  for (var j=0;j<this.data.stores1.length;j++){
    im[j] = this.data.stores1[j].thumb
  }
console.log(im)
wx.cloud.getTempFileURL({
  fileList: im,
    success: res => {
        for(var j=0;j<res.fileList.length;j++){
          url[j] = res.fileList[j].tempFileURL
          this.data.stores1[j].url = res.fileList[j].tempFileURL
        }
        this.setData({
          stores:this.data.stores1
        })
      console.log(this.data.stores)
      },
      fail: err => {
        
      }
    })



})
  

    
  }
})