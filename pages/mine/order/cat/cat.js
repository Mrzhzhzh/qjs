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
      passage2:'1',

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
    order_no:'',  

    buttonClicked: false  
  },



  onLoad(options){
    const self = this;
    self.data.token = wx.getStorageSync('token');
    self.data.placeOrder.products = api.jsonToArray(wx.getStorageSync('payPro'),'push');
    self.setData({
      web_products:self.data.placeOrder.products
    });
    getApp().globalData.address_id = '';
  },



  onShow(){
    const self = this;
    if(getApp().globalData.address_id&&self.data.searchItem.id != getApp().globalData.address_id){
      self.data.searchItem = {};
      self.data.searchItem.id = getApp().globalData.address_id;
    }else if(!self.data.searchItem.isdefault&&!self.data.searchItem.id){
      self.data.searchItem = {};
      self.data.searchItem.isdefault = '1';
    }else{
      return;
    };
    self.getDefaultAddress();  
  },



  counter(e){
    const self = this;
    const index = api.getDataSet(e,'index');
    if(api.getDataSet(e,'type')=='+'){
      self.data.placeOrder.products[index].count++;
    }else{
      if(self.data.placeOrder.products[index].count > '1'){
        self.data.placeOrder.products[index].count--;
      }     
    };

    self.setData({
      web_products:self.data.placeOrder.products
    });

    self.countTotalPrice();
    
  },

   



  click(){
    const self = this;
    self.setData({
      buttonClicked: true
    });
    const callback = (res)=>{
      if(res&&!res.solely_code){
        const payCallback=(payData)=>{
          if(payData == 1){    
            api.pathTo('/pages/mine/order/order','nav')
          }else{
            setTimeout(function(){
              self.setData({
                buttonClicked: false
              })
            }, 1000)  
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
      
      if(res.length>0){
        self.data.placeOrder.address_id = res[0].id;
        self.deliverFee();
        self.data.placeOrder.passage1 = '送货上门';
        self.setData({
          web_addressData:res[0],
          deliverType:self.data.placeOrder.passage1
        });
      }
      
    };
    api.addressList(postData,callback);
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
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
          self.countTotalPrice();
        }else{
          self.deliverFee();
        };

      };

    }else{
      self.data.placeOrder.passage1 = name;
      self.countTotalPrice();
      delete self.data.placeOrder.order_no;
    };

    self.setData({
      deliverType:self.data.placeOrder.passage1
    });

  },



  deliverFee(e){
    const self = this;
    const obj = self.data.placeOrder.products;
    for(var key in obj);
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.city_code = '029';
    postData.cargo_price = obj[key].info.price;
    postData.is_prepay = 0;
    postData.address_id = self.data.placeOrder.address_id;
    postData.id = obj[key].info.id;  
    const callback = (res)=>{
      if(!res.solely_code){
        self.data.dFee = res.fee;
        self.data.order_no = res.order_no;
        self.data.placeOrder.order_no = res.order_no;
        self.setData({
          web_fee:self.data.dFee
        });
        self.countTotalPrice();
      }else{
        api.showToast(res.msg,'fail');
      }
    };
    api.orderDeliverFee(postData,callback);
  },



  countTotalPrice(){  
    const self = this;
    var Price = 0;
    var obj = self.data.placeOrder.products;
    for(var key in obj){
      Price += obj[key].count*obj[key].info.price ;
    };
    if(self.data.placeOrder.passage1=='送货上门'){
      Price += self.data.dFee;
    };
    self.setData({
      web_Price:Price.toFixed(2)
    });
  },

  

})