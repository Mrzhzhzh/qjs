//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return util.formatTime(new Date(log))
      })
    })
  },

  bindViewTap1:function(){
    wx.navigateTo({
      url:"/pages/mine/addres/addres"  
  })
  },
  bindViewTap2:function(){
    wx.navigateTo({
      url:"/pages/mine/bp/bp"  
  })
  },
  bindViewTap3:function(){
    wx.navigateTo({
      url:"/pages/mine/card/card"  
  })
  },
  bindViewTap4:function(){
    wx.navigateTo({
      url:"/pages/mine/change/change"  
  })
  },
  bindViewTap5:function(){
    wx.navigateTo({
      url:"/pages/mine/issue/issue"  
  })
  },
  bindViewTap6:function(){
    wx.navigateTo({
      url:"/pages/mine/news/news"  
  })
  },
  bindViewTap7:function(){
    wx.navigateTo({
      url:"/pages/mine/order/order"  
  })
  },

  bindViewTap8:function(){
    wx.navigateTo({
      url:"/pages/mine/phone/phone"  
  })
  }

})
