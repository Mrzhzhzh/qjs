// pages/mine/order.js
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
      pay_status:'1',
      passage2:'2'
    },
    
  },

  onLoad(options){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    if(options.num){
      self.changeSearch(options.num)
    }else{
      self.getMainData();
    }
    
  },

  onReachBottom() {

    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };

  },

  
  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self)
    };
    const postData = api.cloneForm(self.data.paginate);
    postData.searchItem = api.cloneForm(self.data.searchItem);
    postData.token = wx.getStorageSync('token');
    const callback = (data)=>{
      console.log(data)
      wx.hideLoading();
      if(data.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,data.data);
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
    api.orderList(postData,callback);
  },
})