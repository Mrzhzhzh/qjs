// pages/mine/attention.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData:[],
    productData:[],
    num:1

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
    self.data.productData = api.jsonToArray(wx.getStorageSync('collectProductData'),'unshift');
    self.data.mainData = api.jsonToArray(wx.getStorageSync('collectData'),'unshift');
    console.log(self.data.mainData);
    console.log(self.data.productData);
    self.setData({
      web_mainData:self.data.mainData,
    });

    self.setData({
      
      web_productData:self.data.productData,
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
    api.deleteFootOne(api.getDataSet(e,'id'),'collectProductData');
    
    self.getMainData();
  },

  menuClick: function (e) {
    const self = this;
    const num = api.getDataSet(e,'num');
    self.changeSearch(num);
  },

  changeSearch(num){
    const self = this;
    this.setData({
      num: num
    });
    
    if(num=='1'){
      
      self.setData({
        web_mainData:self.data.mainData
      })
    }else{
      self.setData({
        web_productData:self.data.productData
      })    

    };

  },


})