// 云函数入口文件
const cloud = require('wx-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  var s = {}

  const db = cloud.database();
  const _ = db.command
  const $ = db.command.aggregate
  
  try {
  const all =await db.collection('history_order').aggregate()
    .match({
      calculated: false
    }).limit(10000).group({
      _id: "$userOpenid",
      count: $.sum(1)
    }).end();
  var n = all.list.length
  for(var i=0; i<n;i++){
   
       await db.collection("show_charts")
        .doc(all.list[i]._id)
        .update({
          data:{
            count:all.list[i].count    
          },
        });
        
    
}
const all1 =await db.collection("show_charts").aggregate()
.limit(10000).group({
  _id:"$institute",
  totalnum: $.sum("$count")
}).sort({
  totalnum:1
}).end()

    return all1.list
  
  } catch (err) {
    console.log(err);
    return err;
  }

}