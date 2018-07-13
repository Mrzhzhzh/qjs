// pages/mine/addres.js
import {Api} from '../../../utils/api.js';
const api = new Api();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    mainData:[],
    isLoadAll:false,

  },

  onShow(){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
  },


  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);
    }
    const postData = api.cloneForm(self.data.paginate);
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      
      if(res.data.length>0){
        self.data.mainData = res.data;
      }else{
        if (res.current_page =='1'){
          setTimeout(function(){
            api.pathTo('./add_address/add_address','nav');
          },300);
        }else{
          api.showToast('没有地址了','fail')
        }
        }
      self.setData({
        web_mainData:self.data.mainData,
      });
    };
    api.addressList(postData,callback);
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  setDefalut(e){
    const self = this;
    console.log(111)
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.id = api.getDataSet(e,'id');
    const callback = res =>{
      const resType = api.dealRes(res);
      if(resType){
        self.getMainData(true);
      }
    };
    api.addressSet(postData,callback);
  },

  choose(e){
    const self = this;
    const id = api.getDataSet(e,'id');
    self.data.id = id;
    getApp().globalData.address_id = id;
    self.setData({
      address_id:self.data.id,
    });
    setTimeout(function(){
      wx.navigateBack({
        delta: 1
      });
    },300);
    

  },

  deleteAddress(e){
    const self = this;
    const postData = {};
    postData.id = api.getDataSet(e,'id');
    postData.token = wx.getStorageSync('token');
    const callback = res=>{
      const resType = api.dealRes(res);
      if(resType){
        self.data.mainData=[];
        self.getMainData(true);
      }
    };
    api.addressDel(postData,callback)

  },

  add_address:function(){
    wx.navigateTo({
      url: '/pages/food/add_address/add_address',
    })
  }

})