// pages/mine/order.js
import {Api} from '../../../utils/api.js';
const api = new Api();


Page({
  /**
   * 页面的初始数据
   */
  data: {

    num:1,
    mainData:[],
    isLoadAll:false,
    searchItem:{}, 
     
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



  payNow(e){
    const self = this;
    const postData  ={};
    postData.token = wx.getStorageSync('token');
    postData.id = api.getDataSet(e,'id');
    const callback = (data)=>{
      const payCallback=(payData)=>{
        if(payData == 1){

          self.autoChangeStatus(1);
          
        }else{
          
        }
      };
      api.realPay(data,payCallback);
    };
    api.payPre(postData,callback);
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

 
    self.data.searchItem = {};
    if(num=='1'){

    }else if(num=='2'){
      self.data.searchItem.pay_status = '0';
      self.data.searchItem.order_step = '0';
    }else if(num=='3'){
      self.data.searchItem.pay_status = '1';
      self.data.searchItem.transport_status = '1';
      self.data.searchItem.order_step = '0';
        
    }else if(num=='4'){
      self.data.searchItem.pay_status = '1';
      //self.data.searchItem.transport_status = '2';
      self.data.searchItem.order_step = '0';
      self.data.searchItem.remark_status = 'false';
    }else if(num=='5'){
      self.data.searchItem.order_step = '2';
    };

    self.setData({
      web_mainData:[],
    });

    self.getMainData(true);

  },

  deleteOrder(e){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.id = api.getDataSet(e,'id');
    const callback  = res=>{
      api.dealRes(res);
      self.getMainData(true);
    };
    api.orderDel(postData,callback);
    
  },

  cancelOrder(e){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.id = api.getDataSet(e,'id');
    const callback  = res=>{
      api.dealRes(res);
      self.getMainData(true);
    };
    api.orderCancel(postData,callback);
    
  },

  receiveOrder(e){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.id = api.getDataSet(e,'id');
    const callback  = res=>{
      api.dealRes(res);
      self.getMainData(true);
    };
    api.orderReceive(postData,callback);
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav')
  },

 
})