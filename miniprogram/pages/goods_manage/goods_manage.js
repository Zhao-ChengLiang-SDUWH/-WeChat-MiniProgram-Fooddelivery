const db = wx.cloud.database()
const goods = db.collection('goods')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    good:[ ],

   
   
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:function (options) {
    this.setData({
      id:options.id
    })
    console.log(this.data.id)
    goods.where({
      _id:this.data.id
    }).get().then(res =>{
      this.setData({
        good:res.data,
        
      })
    })
   
   
    
  },

  
  //获取表单数据函数
  getForm:function(e){
    var formdata = e.detail.value;
    this.setData({
    "data.myid":Number(formdata.myid),
      "data.title":formdata.title,
       "data.price":Number(formdata.price),
       "data.num":Number(formdata.num),
       "data.desc":formdata.desc,
       "data.tag":formdata.tag,
       
    })
    wx.showToast({
      title: '上传成功',
      icon: 'succes',
      duration: 1000,
      mask:true
  });
        console.log("更新data",e)
   },
   //添加表单至数据库函数
   saveData:function(e){
        var getdata = this.data;
        goods.doc(this.data.id).update({
          data:{
            myid:getdata.data.myid,
         title:getdata.data.title,
          price:getdata.data.price,
          num:getdata.data.num,
          desc:getdata.data.desc,
          tag:getdata.data.tag,
          thumb:getdata.fileID
          }      
        }).then(res=>{
   console.log("添加至数据库成功",res) ;
   wx.showToast({
     title: '保存成功',
     icon: 'succes',
     duration: 1000,
     mask:true
 });
 
  }).catch(res=>{
    console.log("添加失败",res);
    wx.showToast({
     title: '失败',
     icon: 'fail',
     duration: 1000,
     mask:true
 });
  })

  wx.navigateBack({
    complete: (res) => {'返回上级界面'},
  })
 },
 
 savePhoto:function() {
   let that = this;
   let openid = app.globalData.openid || wx.getStorageSync('openid');
   wx.chooseImage({
     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
     success: function (res) {
       wx.showLoading({
         title: '上传中',
       });
       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
       let filePath = res.tempFilePaths[0];
       const name = Math.random() * 1000000;
       const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
       wx.cloud.uploadFile({
         cloudPath,//云存储图片名字
         filePath,//临时路径
         success: res => {
           console.log('[上传图片] 成功：', res)
           that.setData({
             fileID: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
           });
           let fileID = res.fileID;
         
         },fail: e => {
           console.error('[上传图片] 失败：', e)
         },
         complete: () => {
           wx.hideLoading()
         }
       });
       }
     })
 }
 })