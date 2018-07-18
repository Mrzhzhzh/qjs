// pages/mine/issue.js
import {Api} from '../../../utils/api.js';
const api = new Api();


Page({

  /**
   * 页面的初始数据
   */
  data: {

    mainData:[],   
    isLoadAll:false,
    starArray:[1,2,3,4,5],
    
    },
  



  onLoad(options){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.collect();
    self.setData({
      web_starArray:self.data.starArray,
    })
  },


  onReachBottom() {
    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };
  },

  
  getMainData(){
    const self = this;
    const postData = api.cloneForm(self.data.paginate);
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      wx.hideLoading();
      if(res.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.data);
        self.setData({
          web_mainData:self.data.mainData,
        });
      }else{
        self.data.isLoadAll = true;
        wx.showToast({
          title: '没有更多了',
          icon: 'fail',
          duration: 1000,
          mask:true
        });
      }; 
    };
    api.getMyRemark(postData,callback);
  },

  

  collect(){
    const self = this;
    const id = self.data.id;
    if(wx.getStorageSync('collectData')&&wx.getStorageSync('collectData')[id]){
      api.deleteFootOne(id,'collectData');
      self.setData({
        url: '/images/favor_ic.png',
      });
    }else{
      api.footOne(self.data.mainData,'id',100,'collectData');
      self.setData({
        url: '/images/favor_ic_1.png',
      });
    };
  },
})