// pages/mine/bp.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    mainData:[],
    isLoadAll:false,
    searchItem:{

    },
    
    searchChange:{
      pay_user:wx.getStorageSync('token')
    },

  },


  onLoad: function (options) {
    const self = this;
      self.data.paginate = api.cloneForm(getApp().globalData.paginate);
      self.getMainData();
      self. getUserData()
    },
    


  onReachBottom() {
    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };
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


  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);
    };
    const postData = self.data.paginate;
    postData.token = wx.getStorageSync('token');
    postData.searchItem = api.cloneForm(self.data.searchItem); 
    const callback = (res)=>{
      self.setData({ 
        score:res.user_score
      });
      if(res.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.data);
      }else{
        wx.showToast({
          title:'没有更多了',
          icon:'fail',
          duration:1000,
          mask:true
        });

      };
      wx.hideLoading();
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.scoreList(postData,callback);

  }
})