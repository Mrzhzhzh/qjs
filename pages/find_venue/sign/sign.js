import {Api} from '../../../utils/api.js';
const api = new Api();



Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:''
  },

  onLoad(options){
    const self = this;
    self.data.id = options.id;
    self.getUserData();
    self.getMainData()  
  },


  getUserData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      self.setData({
        web_userInfo:res,
      });
      wx.hideLoading();
    };
    api.userOne(postData,callback);
  },



  sign(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.id = self.data.id;
    const callback = (res)=>{
      api.dealRes(res);
      console.log(res)
      
      wx.hideLoading();
    };
    api.userSignAdd(postData,callback);
  },
  

  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);
    };
    const postData = {};
    postData.thirdapp_id= getApp().globalData.thirdapp_id;
    postData.id = self.data.id;
    const callback = (res)=>{
      console.log(res)
      if(res){
        self.data.mainData = res;
        self.data.mainData.content = api.wxParseReturn(res.content).nodes;    
        self.setData({
          web_mainData:self.data.mainData,
        });
      }else{
        wx.showToast({
          title:'该场馆已被删除',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }
    };
    api.merchantOne(postData,callback);
  },




})

 