// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  // API 调用都保持和云函数当前所在环境一致
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()
const orderCollection = db.collection('order')

// 云函数入口函数
exports.main = async (event, context) => {
  //let id = event.currentTarget.dataset.id
  // dataid='{{event._id}}'
  try{
    return await orderCollection.doc(event._id).update({
      data: {
        condition:event.condition,
        riderOpenid:event.riderOpenid
      }
    })
  } catch (e) {
    console.error(e)
  }
}