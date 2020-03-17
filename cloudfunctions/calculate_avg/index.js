// 云函数入口文件
const cloud = require('wx-server-sdk');

exports.main = async (event, context) => {
  cloud.init(); 
  var s=0
  
  const db = cloud.database();
  const _ = db.command
  const $ = db.command.aggregate
  try {
     
  const all =  await db.collection('history_order').aggregate()
  .match({
    calculated:false
  }).limit(10000).group({
    _id: "$userOpenid",
        sum: $.sum("$total")
      }).end();
    var n = all.list.length
  for (var j = 0; j < n; j++)
  {
    s=s+all.list[j].sum
  }

    var avg =parseInt(s/all.list.length)
  
for(var j=0;j< n ;j++){
    var su=all.list[j].sum
   let message= await db.collection('show_charts').where({
   _id:all.list[j]._id
     }).get()

  if(message.data.length){
  await db.collection('show_charts').doc(all.list[j]._id).update({
    data: {
      sum: _.push({
        each: [su],
        
      }),
      all: _.push({
        each: [avg],
        
      })
    },
    success: function (res) {
      
    }
  });
  await db.collection('show_charts').doc(all.list[j]._id).update({
    data: {
      sum: _.shift(),
      all: _.shift(),
    }
  })

}
else {
    await db.collection("User").where({
      _openid: all.list[j]._id
    }).field({
      institute: true
    }).get().then(res => {
      try{ db.collection('show_charts').add({
       data:{
       _id:all.list[j]._id,
       sum:[0,0,0,su],
       all:[0,0,0,avg],
        count:0,
        institute: res.data[0].institute
       }, 
     })
     }catch(err){}
});



    }
}
    // 循环消息列表
    // const sendPromises = messages.data.map(async message => {
    //   try {
    //     // 发送订阅消息
    //     await cloud.openapi.subscribeMessage.send({
    //       touser: message.userid,
    //       page: "/pages/homepage/homepage",
    //       data: {
    //         date2: {
    //           value: date
    //         },
    //         thing1: {
    //           value: "按时吃饭哦"
    //         }
    //       },
    //       templateId: "Krp3IAhLlJgvPNzUF3BtNXkydvRDAxSiV3YE1tOGM18",
    //       miniprogramState: 'developer'
    //     });
    //     // 发送成功后将消息的状态改为已发送
    //     return db
    //       .collection('Time_notice')
    //       .doc(message._id)
    //       .update({
    //         data: {
    //           sent: true,
    //         },
    //       });
    //   } catch (e) {
    //     return e;
    //   }
    // });
    return all ;
    // return Promise.all(sendPromises);
  } catch (err) {
    console.log(err);
    return err;
  }
};