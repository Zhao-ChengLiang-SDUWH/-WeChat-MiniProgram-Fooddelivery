const db = wx.cloud.database()

const app = getApp()
const $ = db.command.aggregate
import * as echarts from '../../ec-canvas/echarts';
let chart = null;
var option={
  title: {
    text: '每周平均消费',
    left: 'center'
  },
  color: ["#37A2DA", "#67E0E3", "#9FE6B8"],
  legend: {
    data: ['校平均', '个人'],
    top: 50,
    left: 'center',
    // backgroundColor: '',
    z: 100
  },
  grid: {
    containLabel: true
  },
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['第一周', '第二周', '第三周', '第四周'],
    // show: false
  },
  yAxis: {
    x: 'center',
    type: 'value',
    splitLine: {
      lineStyle: {
        type: 'dashed'
      }
    }
    // show: false
  },
  series: [{
    name: '个人',
    type: 'line',
    smooth: false,
    data: []
  }, {
    name: '校平均',
    type: 'line',
    smooth: false,
    data: []
  },]
}
var option2 = {
  title: {
    text: '学院订单数排行榜',
    left: 'center'
  },
  color: ['#37a2da', '#32c5e9', '#67e0e3'],
  tooltip: {
    trigger: 'axis',
    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
      type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    },
    confine: true
  },
  legend: {
    data: ['订单数']
  },
  grid: {
    left: 10,
    right: 20,
    bottom: 15,
    top: 20,
    containLabel: true
  },
  xAxis: [
    {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666'
      }
    }
  ],
  yAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      },
      axisLabel: {
        color: '#666'
      }
    }
  ],
  series: [
    {
      name: '热度',
      type: 'bar',
      label: {
        normal: {
          show: true,
          position: 'inside'
        }
      },
      data: [300, 270, 340, 344, 300, 320, 310],
      itemStyle: {
        // emphasis: {
        //   color: '#37a2da'
        // }
      }
    },
    
  ]
};
// pages/fun/fun.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
       
        onInit: initChart
      
      },
    active: 1,
    ec2: {

      onInit: initChart2

    }

    }

    // ecScatter: {
    //   onInit: function (canvas, width, height) {
    //     const scatterChart = echarts.init(canvas, null, {
    //       width: width,
    //       height: height
    //     });
    //     canvas.setChart(scatterChart);
    //     scatterChart.setOption(getScatterOption());

    //     return scatterChart;
    //   }
    // }

  ,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.editTabBar();
    wx.cloud.callFunction(
      {
        name: "ins",
        success: res => {
var s=res.result
var t=s.length
          

          console.log(s)
        }})
    

      
    
    // chart.where({
    //   _id:app.globalData.userInfo.OPENID
    // }).get().then(res => {
    //   this.setData({
    //      data1:res.data[0].sum,
    //      data2:res.data[0].sum

    //   })
         
       
      
    // })
    // a()
  },

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

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

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
  onChange(event) {
   
    this.setData({
      active:Number(event.detail.name)
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
  
})
function initChart(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  const cont = db.collection('show_charts');
  cont.where({
    _id:app.globalData.openid
  }).get({
    success(res) {
      console.log(res.data)
      const name = res.data[0].all;
      const num = res.data[0].sum;

      option.series[1].data = name;
      option.series[0].data = num;
      chart.setOption(option);
      return chart;
    }
  })
}
function initChart2(canvas, width, height) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  wx.cloud.callFunction(
    {
      name: "ins",
     
      success: function (res) {
         var s = res.result
         var t = s.length
      var nam=[]
      var nu=[]
      for(var i=0;i<t;i++){
        nam[i]= s[i]._id
        nu[i]=s[i].totalnum
      }
      
      option2.yAxis[0]["data"] = nam;
      option2.series[0]["data"] = nu;
      chart.setOption(option2);
      return chart;
     }
    })
    
  
}