// pages/mine/attention.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData:[],


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    const self = this;
    self.getMainData();
  },

  getMainData(){
    const self = this;
    console.log()
    self.data.mainData = api.jsonToArray(wx.getStorageSync('collectData'),'unshift');
    self.setData({
      web_mainData:self.data.mainData,
    });
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  cancel(e){
    const self = this;
    console.log(api.getDataSet(e,'id'))
    api.deleteFootOne(api.getDataSet(e,'id'),'collectData');
    self.getMainData();
  },


})