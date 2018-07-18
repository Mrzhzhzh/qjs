import {Api} from '../../utils/api.js';
var api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  
  },
    

  onLoad(){
    const self = this;
    self.getUserData();
  },



  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
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

})