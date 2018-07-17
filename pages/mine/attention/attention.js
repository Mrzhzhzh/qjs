// pages/mine/attention.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    venueData:[],
    foodData:[],
    classData:[],
    coachData:[],
    cardData:[],
    num:1,

    isLoadAll:false

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
    self.data.foodData = api.jsonToArray(wx.getStorageSync('foodData'),'unshift');
    self.data.venueData = api.jsonToArray(wx.getStorageSync('venueData'),'unshift'); 
    self.data.classData = api.jsonToArray(wx.getStorageSync('classData'),'unshift');
    self.data.coachData = api.jsonToArray(wx.getStorageSync('coachData'),'unshift'); 
    self.data.cardData = api.jsonToArray(wx.getStorageSync('cardData'),'unshift');

    self.setData({
      web_foodData:self.data.foodData,
    });

    self.setData({
      
      web_venueData:self.data.venueData,
    });
    self.setData({
      
      web_classData:self.data.classData,
    });
    self.setData({
      
      web_coachData:self.data.coachData,
    });
    self.setData({
      
      web_cardData:self.data.cardData,
    });
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  cancel(e){
    const self = this;
    console.log(api.getDataSet(e,'id'))
    api.deleteFootOne(api.getDataSet(e,'id')+'salt','foodData');
    api.deleteFootOne(api.getDataSet(e,'id')+'salt','venueData');
    api.deleteFootOne(api.getDataSet(e,'id')+'salt','classData');
    api.deleteFootOne(api.getDataSet(e,'id')+'salt','coachData');
    api.deleteFootOne(api.getDataSet(e,'id')+'salt','cardData');
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
        web_venueData:self.data.venueData
      })
    }else if(num=='2'){
      self.setData({
        web_foodData:self.data.foodData
      })    

    }else if(num=='3'){
      self.setData({
        web_classData:self.data.classData
      })    
    }else if(num=='4'){
      self.setData({
        web_coachData:self.data.coachData
      })    
    }else if(num=='5'){
      self.setData({
        web_cardData:self.data.cardData
      })    
    }
  },

  
})