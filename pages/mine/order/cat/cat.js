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
      passage1:'自提',
      passage2:'1'
      

    },
    searchItem:{},
    sForm:{},
    type:'',
    coupon:{},
    totalPrice:0,
    product_id:'',
    id:'',
    dFee:0,
    isAddress:true,
    order_no:''
    
  },

  onLoad(options){
    const self = this;
    console.log(options)
    self.data.id = options.id;
    
    
    

    
    self.data.placeOrder.products[0] = {
      model_id:self.data.id,
      count:1
    };
    console.log(self.data.placeOrder);
    
    
    getApp().globalData.address_id = '';
    
    self.getMainData();
  
  },

  onShow(){
    const self = this;
    self.data.searchItem = {};
    console.log(getApp().globalData.address_id);
    if(getApp().globalData.address_id){
      if(self.data.searchItem.id != getApp().globalData.address_id){
        self.data.searchItem.id = getApp().globalData.address_id;
        
        self.deliverFee();
        self.data.placeOrder.passage1 = '送货上门';
      }
      
    }else{
      self.data.searchItem.isdefault = '1';
    };
    self.getDefaultAddress();
    self.setData({
      web_fee:self.data.dFee,
      deliverType:self.data.placeOrder.passage1,
    })

    
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
        self.data.totalPrice = res.price;
        console.log(self.data.mainData)
        self.setData({
          web_mainData:self.data.mainData,
          web_totalPrice:self.data.totalPrice
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
    const name = api.getDataSet(e,'name');

    if(name == '送货上门'&&self.data.placeOrder.address_id=='0'){
        
    }else if(name == '送货上门'&&self.data.placeOrder.address_id!='0'){
      
    }else{
      self.data.placeOrder.passage1 = name;
    }

    if(name == '送货上门'){

      if(self.data.placeOrder.address_id=='0'){

        api.showToast('请选择地址');

      }else{

        self.data.placeOrder.passage1 = name;

        if(self.data.dFee>0){
          self.data.placeOrder.order_no = self.data.order_no;
          self.count(self.data.dFee);
        }else{
          self.deliverFee();
        };

      };


    }else{
      self.data.placeOrder.passage1 = name;
      self.count(0);
      delete self.data.placeOrder.order_no;

    };


    self.setData({
      deliverType:self.data.placeOrder.passage1
    });


  },


  deliverFee(e){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.city_code = '029';
    postData.cargo_price = self.data.mainData.price;
    postData.is_prepay = 0;
    postData.address_id = self.data.placeOrder.address_id;
    postData.id = self.data.id;
    console.log(postData);
    const callback = (res)=>{
      console.log(res);
      self.data.dFee = 1;
      self.data.order_no = 111111111;
      self.data.placeOrder.order_no = 111111111;
      self.setData({
        web_fee:self.data.dFee
      });
      self.count(self.data.dFee);
      if(!res.solely_code){
        self.data.dFee = res.fee;
        self.data.order_no = res.order_no;
        self.data.placeOrder.order_no = res.order_no;
        self.setData({
          web_fee:self.data.dFee
        });
        self.count(self.data.dFee);
      }else{
        api.showToast(res.msg,'fail');
      }
    };
    api.orderDeliverFee(postData,callback);
  },


  count($fee){
    const self = this;
    console.log($fee);
    self.data.totalPrice = parseFloat(self.data.mainData.price) + $fee;
    self.setData({
      web_totalPrice:self.data.totalPrice
    });
  }


})