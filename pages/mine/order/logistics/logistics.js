// pages/mine/order/logistics.js
import {Api} from '../../../../utils/api.js';
const api = new Api();


Page({

  /**
   * 页面的初始数据
   */
  data: {

    id:'',
    mainData:[],
    markers: [{

      iconPath: "/images/coach_list1.png",
      id: 0,
      latitude: '',
      longitude: '',
      width: 50,
      height: 50
      
    }],
    
    supply:{}
    
  },


  onLoad(options){
    const self = this;
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
        self.data.supply.latitude = res.supplierLat;
        self.data.supply.longitude = res.supplierLng;
        self.data.markers[0].latitude = res.transporterLat;
        self.data.markers[0].longitude = res.transporterLng;
        self.setData({
          web_mainData:self.data.mainData, 
          web_supply:self.data.supply, 
          web_markers:self.data.markers
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