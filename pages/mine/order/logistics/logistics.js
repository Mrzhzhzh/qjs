// pages/mine/order/logistics.js
import {Api} from '../../../../utils/api.js';
const api = new Api();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    mainData:[]
    
  },

  onLoad(options){
    const self = this;
    console.log(options)
    self.data.id = options.id; 
    self.getMainData();
  },


  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);
    };
    const postData = {};
     postData.token = wx.getStorageSync('token');
     postData.id = self.data.id;
     const callback = (res)=>{
      self.data.mainData = res;
      if(res){
        console.log(self.data.mainData)
        self.setData({
          web_mainData:self.data.mainData, 
        });
      }else{
        wx.showToast({
          title:'该商品已被删除',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }

    };
    api.orderLogistics(postData,callback);
  },

})