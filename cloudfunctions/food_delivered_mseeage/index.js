// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  try {
    // 发送订阅消息
    await cloud.openapi.subscribeMessage.send({
      touser: event.userid,
      page: "/pages/homepage/homepage",
      data: {
        date9: {
          value: event.time
        },
        thing4: {
          value: event.address
        }
      },
      templateId:"WCqO5XuySDpBRdPWsvTFGT3KeBQGatBrEQyv3qOR3mI",
      miniprogramState: 'developer'
    });
    // 发送成功后将消息的状态改为已发送
    return 
  } catch (e) {
    return e;
  }

  
}