
const cloud = require('wx-server-sdk');
exports.main = async (event, context) => {
  cloud.init();
  var s = 0

  const db = cloud.database();
  const _ = db.command
  const $ = db.command.aggregate
  try {

    const all = await db.collection('history_order').aggregate()
      .match({
        calculated: false
      }).limit(10000).group({
        _id: "$userOpenid",
        sum: $.sum("$total")
      }).end();
    var n = all.list.length
    for (var j = 0; j < n; j++) {
      var su = all.list[j].sum
      let message = await db.collection('show_charts').where({
        _id: all.list[j]._id
      }).get()
      if (message.data.length) {
        return}
        else{
        await db.collection("User").where({
          _openid: all.list[j]._id
        }).field({
          institute: true
        }).get().then(res => {
          try {
            db.collection('show_charts').add({
              data: {
                _id: all.list[j]._id,
                sum: [0, 0, 0, su],
                all: [0, 0, 0, 0],
                count: 0,
                institute: res.data[0].institute
              },
            })
          } catch (err) {}


        })
        }
    }
  }catch(err){}
}