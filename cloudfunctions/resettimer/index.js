// 云函数入口文件
const cloud = require('wx-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  


  try {
    // 从云开数据库中查询等待发送的消息列表
    return await db
      .collection('Time_notice')
      .where({
        sent: true
      }).update({
        data:{
        sent: false}
      })

  } catch (e) {
    console.error(e);
  }
}