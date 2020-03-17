// 云函数入口文件

const cloud = require('wx-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();
  const _ = db.command
  var hours = new Date().getHours()+8
  var weeks = new Date().getDay()
  var date = new Date().toLocaleDateString()
  if( hours>=24){
    hours=hours-24
    weeks=weeks+1
    
  }
  if(weeks>6){
    weeks=weeks-7
  }
   
  try {
    // 从云开数据库中查询等待发送的消息列表
    const messages = await db
      .collection('Time_notice')
      .where({
        ison: true,
        sent: false,
        hour: hours,
        min:_.lte(new Date().getMinutes()+1),
        week: weeks
      }).get();
      
      
  

    // 循环消息列表
    const sendPromises = messages.data.map(async message => {
      try {
        // 发送订阅消息
        await cloud.openapi.subscribeMessage.send({
          touser: message.userid,
          page:"/pages/homepage/homepage",
          data: {
            date2:{
              value:date
            },
            thing1:{
              value:"按时吃饭哦"
            }
          },
          templateId: "Krp3IAhLlJgvPNzUF3BtNXkydvRDAxSiV3YE1tOGM18",
          miniprogramState: 'developer'
        });
        // 发送成功后将消息的状态改为已发送
        return db
          .collection('Time_notice')
          .doc(message._id)
          .update({
            data: {
              sent:true,
            },
          });
      } catch (e) {
        return e;
      }
    });

    return Promise.all(sendPromises);
  }catch (err) {
    console.log(err);}
    }