const db = wx.cloud.database()
const goods = db.collection('goods')
const _ = db.command
const app = getApp()
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog';
  Page({
    
    data: {
      option1: [
        { text: '全部', value: 0 },
        { text: '新品', value: 1 },
        { text: '热销', value: 2 },
        { text: '主食', value: 3 },
        { text: '小吃', value: 4 },
        { text: '饮料', value: 5 },
        { text: '套餐', value: 6 },
        { text: '其他', value: 7 }
      ],
      option2: [
        { text: '默认排序', value: 8 },
        { text: '好评排序', value: 9},
        { text: '销量排序', value: 10 },
        { text: '价格排序', value: 11},
        { text: '货存排序', value: 12 }
      ],
     
      value:'',
      value1: 0,
      value2: 8,
      value3:'',
      value4:'',
      page:0,
      type:'',
      tag1:'',
      tag2: app.globalData.openid,
      list:[],
      goods:[],
     

    },

  onChange: function(e) {
      this.setData({
        value:e.detail
      });
    },
  
  onSearch:  function (event)  {
    goods.where({
    title: this.data.value,
      _openid: app.globalData.openid
  }).orderBy('myid','asc').get().then(res=>{
    this.setData({
      goods:res.data,
      type:res.data.type
    })
    console.log(this.data.goods)

    })     
  },

  selectKind: function(event){
   

    if (event.detail == 0) {
      console.log(event.detail)
   

      goods.where({
        title: db.RegExp({
          regexp: this.data.value
        }),
        _openid: app.globalData.openid

      }).orderBy('myid', 'asc').get().then(res => {
        this.setData({
          tag1: '',
          tag2: app.globalData.openid,
          goods: res.data,
          value3: event.detail,
          page:0
        })
        console.log(this.data.goods)

      })
    }
    if (event.detail == 1) {
      console.log(event.detail)
      this.setData({
        type: '新品',
        page:0
      })
      goods.where({
        title: db.RegExp({
          regexp: this.data.value
        })
        ,
        _openid: app.globalData.openid,
        tag: '新品',

      }).orderBy('myid', 'asc').get().then(res => {
        this.setData({
          tag1: '新品',
          tag2: '',
          goods: res.data,
          value3: event.detail
        })
        console.log(this.data.goods)

      })
    }
    if (event.detail == 2) {
      console.log(event.detail)
      this.setData({
        type: '热销',
        page:0
      })
      goods.where({
        title: db.RegExp({
          regexp: this.data.value
        })
        ,
        _openid: app.globalData.openid,
        tag: '热销',

      }).orderBy('myid', 'asc').get().then(res => {
        this.setData({
          goods: res.data,
          value3: event.detail,
          tag1: '热销',
          tag2: ''
        })
        console.log(this.data.goods)

      })
    }
    if(event.detail==3){
    console.log(event.detail)
      this.setData({
        type: '主食',
        page:0
      })
     goods.where({
       title: db.RegExp({
         regexp: this.data.value
       })
       ,
       _openid: app.globalData.openid,
       tag: '主食',
       
     }).orderBy('myid','asc').get().then(res => {
          this.setData({
            goods: res.data,
            value3: event.detail,
            tag1: '主食',
            tag2:''
          })
          console.log(this.data.goods)
   
        })
     }

     if(event.detail==4){
      console.log(event.detail)
       this.setData({
         type: '小吃',
         page:0
       })
       goods.where({
         title: db.RegExp({
           regexp: this.data.value
         })
         ,
         _openid: app.globalData.openid,
         tag: '小吃',
         
       }).orderBy('myid','asc').get().then(res => {
            this.setData({
              tag1: '小吃',
              goods: res.data,       
              value3: event.detail,
              tag2:''
            })
            console.log(this.data.goods)
          
          })
       }

       if(event.detail==5){
        console.log(event.detail)
         this.setData({
           type: '饮料',
           page:0
         })
         goods.where({
           title: db.RegExp({
             regexp: this.data.value
           })
           ,
           _openid: app.globalData.openid,
           tag: '饮料',
           
         }).orderBy('myid','asc').get().then(res => {
              this.setData({
                tag1: '饮料',
                tag2:'',
                goods: res.data,
                value3: event.detail
              })
              console.log(this.data.goods)
             
            })
         }

         if(event.detail==6){
          console.log(event.detail)
           this.setData({
             type: '套餐',
             page:0
           })
           goods.where({
             title: db.RegExp({
               regexp: this.data.value
             })
             ,
             _openid: app.globalData.openid,
             tag: '套餐',
             
           }).orderBy('myid','asc').get().then(res => {
                this.setData({
                  tag1: '套餐',
                  tag2:'',
                  goods: res.data,
                  value3: event.detail
                })
                console.log(this.data.goods)
              
              })
           }
      
    if (event.detail == 7) {
      console.log(event.detail)
      this.setData({
        type: '其他',
        page:0
      })
      goods.where({
        title: db.RegExp({
          regexp: this.data.value
        })
        ,
        _openid: app.globalData.openid,
        tag: '其他',

      }).orderBy('myid', 'asc').get().then(res => {
        this.setData({
          goods: res.data,
          value3: event.detail,
          tag1: '其他',
          tag2: ''
        })
        console.log(this.data.goods)

      })
    }

},
 
selectOrder: function(event){
  if(event.detail==8){
    console.log(event.detail)
    goods.where(
      _.or([
      {
          _openid: app.globalData.openid,
        tag:this.data.tag1,
        title: db.RegExp({
          regexp: this.data.value
        })
      },
      {
        _openid:app.globalData.openid,
        title: db.RegExp({
          regexp: this.data.value
        })
      }])
      )
    
       
      
     .orderBy('myid','asc').get().then(res => {
          this.setData({
            goods: res.data,
            value4: event.detail,
            page:0
          })
          console.log(this.data.goods)
         
        })
     }
  if(event.detail==9){
    console.log(event.detail)
    goods.where(
      _.or([
      {
          _openid: app.globalData.openid,
        tag:this.data.tag1,
        title: db.RegExp({
          regexp: this.data.value
        })
      },
      {
        _openid:app.globalData.openid,
        title: db.RegExp({
          regexp: this.data.value
        })
      }])
      )
    
    .orderBy('grade','desc').orderBy('myid','asc').get().then(res => {
          this.setData({
            goods: res.data,
            value4: event.detail,
            page:0
          })
          console.log(this.data.goods)
         
        })
     }

     if(event.detail==10){
      console.log(event.detail)
      goods.where(
        _.or([
        {
            _openid: app.globalData.openid,
          tag:this.data.tag1,
          title: db.RegExp({
            regexp: this.data.value
          })
        },
        {
          _openid:app.globalData.openid,
          title: db.RegExp({
            regexp: this.data.value
          })
        }])
        )
      .orderBy('sale','desc').orderBy('myid','asc') .get().then(res => {
            this.setData({
              goods: res.data,
              value4: event.detail,
              page:0
            })
            console.log(this.data.goods)
           
          })
       }

       if(event.detail==11){
        console.log(event.detail)
        goods.where(
          _.or([
          {
              _openid: app.globalData.openid,
            tag:this.data.tag1,
            title: db.RegExp({
              regexp: this.data.value
            })
          },
          {
            _openid:app.globalData.openid,
            title: db.RegExp({
              regexp: this.data.value
            })
          }])
          )
          .orderBy('price','desc').orderBy('myid','asc').get().then(res => {
              this.setData({
                goods: res.data,
                value4: event.detail,
                page:0
              })
              console.log(this.data.goods)
            
            })
         }

         if(event.detail==12){
          console.log(event.detail)
          goods.where(
            _.or([
            {
                _openid: app.globalData.openid,
              tag:this.data.tag1,
              title: db.RegExp({
                regexp: this.data.value
              })
            },
            {
              _openid:app.globalData.openid,
              title: db.RegExp({
                regexp: this.data.value
              })
            }])
            )
          .orderBy('num','desc').orderBy('myid','asc').get().then(res => {
                this.setData({
                  goods: res.data,
                  value4: event.detail,
                  page:0
                })
                console.log(this.data.goods)
               
              })
           }
               
},

    onPullDownRefresh: function (res) {
      if (this.data.value3 == 0) {
        goods.where({
          _openid: app.globalData.openid
        }).orderBy('myid','asc').get().then(res => {
          this.setData({
            goods: res.data,
            page:0
      })
      })
      }else{
      goods.where({
        _openid: app.globalData.openid,
        tag: this.data.type
      }).orderBy('myid','asc').get().then(res => {
        this.setData({
          goods: res.data,
          page:0

        })
      })
      }
        wx.stopPullDownRefresh();
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1000,
          mask: true
        });
      



   
    },
  
  onReachBottom:function(){
    console.log("触底了")
    if (this.data.value3 == 0) {
    let page= this.data.page +20;
    
      goods.where({
        _openid: app.globalData.openid,
      }).skip(page).orderBy('myid','asc').get().then(res =>{
        let new_data = res.data 
        let old_data = this.data.goods
        this.setData({
          goods:old_data.concat(new_data),
          page:page
        },res =>{
          console.log("res")
          
          })
        })
      }else{
        let page= this.data.page +20;
    goods.where({
      _openid: app.globalData.openid,
      tag:this.data.type
    }).skip(page).orderBy('myid','asc').get().then(res =>{
      let new_data = res.data 
      let old_data = this.data.goods
      this.setData({
        goods:old_data.concat(new_data),
        page:page
      },res =>{
        console.log("res")
        
        })
      })
    }
  },

  
  onLoad: function(options) {
    goods.where({
      _openid: app.globalData.openid
    }).orderBy('myid','asc').get().then(res =>{
      this.setData({
        goods:res.data
      })
    })
  },

  goToDelete:function(e){
    Dialog.confirm({
      title: '提示',
      message: '确认下架该商品？'
    }).then(res => {
      // on confirm 
      var id=e.currentTarget.dataset.id ;
    goods.doc(e.currentTarget.dataset.id).remove().then(res =>{
      console.log(res);
      wx.showToast({
        title: '成功',
        icon: 'succes',
        duration: 1000,
        mask:true
    });
    })
    }).catch(res => {
      // on cancel
      wx.showToast({
        title: '失败',
        icon: 'none',
        duration: 1000,
        mask:true
    });
    });
   
  },

  goToAdd :function(param) {
    wx.navigateTo({
      url: '/pages/goods_add/goods_add',       
      })
  },
  goToManage :function(e) {
    console.log(e.detail);   
    var id=e.currentTarget.dataset.id ;
    
    wx.navigateTo({
      url: '/pages/goods_manage/goods_manage?id='+  id    
      })
       console.log(id)
   
  } 
  });
  