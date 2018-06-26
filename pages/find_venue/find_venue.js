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

  bindViewTap:function(){
    wx.navigateTo({
      url:'/pages/find_venue/venue_details/venue_details'
  })
  },
})
