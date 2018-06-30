// pages/mine/order/cat.js
import {Api} from '../../../../utils/api.js';
const api = new Api();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeOrder:{
      token:'',
      address_id:'0',
      pay_type:'1',
      pay_method:'1',
      product_type:'product',
      products:[],
      solely_paytype:"true",
      passage2:'1'
      

    },
    searchItem:{},
    sForm:{},
    type:'',
    coupon:{},
    totalPrice:0,
    product_id:'',
    id:''
    
  },

  onLoad(options){
    const self = this;
    console.log(options)
    self.data.id = options.id;
    self.data.product_id = options.product_id;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    

    if(options.type){
      console.log(options.type)
      self.data.type = options.type;
      if(self.data.type == 'group'){
        self.data.placeOrder.isgroup="true";

      };
      if(self.data.type == 'score'){
        self.data.placeOrder.isscore="true"; 
      };
      
    }
    self.data.placeOrder.products = wx.getStorageSync('payPro');
    console.log(self.data.placeOrder);
    
    self.setData({
      web_products:self.data.placeOrder.products,
 
      web_type:self.data.type
    });
    getApp().globalData.address_id = '';
    getApp().globalData.coupon = {};
    self.getMainData()
  
  },

  onShow(){
    const self = this;
    self.data.searchItem = {};
    if(getApp().globalData.address_id){
      self.data.searchItem.id = getApp().globalData.address_id;
    }else{
      self.data.searchItem.isdefault = '1';
    };
    self.getDefaultAddress();

    if(JSON.stringify(getApp().globalData.coupon) != "{}"&&getApp().globalData.coupon.deduction<self.data.totalPrice){
      self.data.coupon = getApp().globalData.coupon;
      self.data.placeOrder.couponList = [];
      self.data.placeOrder.couponList.push(getApp().globalData.coupon.id);
      console.log(self.data.placeOrder.couponList);
      self.setData({
        web_couponData:getApp().globalData.coupon
      });
      console.log(getApp().globalData.coupon);
      self.countTprice();
    }else{
      getApp().globalData.coupon = {};
    }

    
  },

  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);
    };
    const postData = {};
    postData.token = wx.getStorageSync('token'),
    postData.thirdapp_id= getApp().globalData.thirdapp_id;
    postData.id = self.data.id;
    postData.paginate = api.cloneForm(self.data.paginate);
     const callback = (res)=>{
      console.log(res)
      if(res){
        self.data.mainData = res;
        self.data.mainData.content = api.wxParseReturn(res.content).nodes;
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
    api.orderList(postData,callback);
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
      if(res){
        self.data.mainData = res;
        self.data.mainData.content = api.wxParseReturn(res.content).nodes;
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
    api.productOne(postData,callback);
  },
  


  pay(){
    const self = this;
    const callback = (res)=>{
      console.log(res);
      if(res&&!res.solely_code){
        const payCallback=(payData)=>{
          if(payData == 1){
            
            api.pathTo('/pages/mine/order/order','nav')
          }else{
            
          }
        };
        api.realPay(res,payCallback);
      }
      
    };
    api.orderAdd(self.data.placeOrder,callback);
    
  },

 

  getDefaultAddress(){
    const self = this;
    const postData = {};
    postData.is_page = false;
    postData.searchItem = api.cloneForm(self.data.searchItem);
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      wx.hideLoading();
      console.log(res[0]);
      if(res.length>0){
        self.data.placeOrder.address_id = res[0].id;
        self.setData({
          web_addressData:res[0],
        });
      }
      
    };
    api.addressList(postData,callback);
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  
  address:function(){
    wx.navigateTo({
      url: '/pages/mine/addres/addres',
    })
  },

  choose(e){
    const self = this;
    self.data.placeOrder.passage1 = api.getDataSet(e,'name')
  },
})