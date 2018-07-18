// pages/food/food_list.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({

  data: {

    minusStatus: 'disabled',
    merchantData:[],
    mainData:[],
    num:'0',
    count:0,
    products:{},
    searchItem:{
      category_id:4,
      passage1:''

    },

    sort:{

      sortby:'',
      sort:''
    },

    open:false,
    isLoadAll:false,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    isSelect: false,

    buttonClicked: false
  },
  

  onLoad(options){
    const self = this;
    self.data.id = options.id;
    self.data.searchItem.passage1 = options.id;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getmerchantData();
    wx.removeStorageSync('payPro');
  },
   



  onReachBottom() {
    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };
  },


  getmerchantData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);
    };
    const postData = {};
    postData.thirdapp_id= getApp().globalData.thirdapp_id;
    postData.id = self.data.id;
    const callback = (res)=>{
      if(res){
        self.data.merchantData = res;
        self.data.merchantData.content = api.wxParseReturn(res.content).nodes;
        self.setData({
          web_merchantData:self.data.merchantData,
        });
      }else{
        wx.showToast({
          title:'该商家已被删除',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }

    };
    api.merchantOne(postData,callback);
  },



  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);
      self.setData({
        web_mainData:self.data.mainData
      });
    };
    const postData = api.cloneForm(self.data.paginate);
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    postData.searchItem = api.cloneForm(self.data.searchItem);
    if(self.data.sort.sortby){
      postData.sortby = self.data.sort.sortby;
    };
    if(self.data.sort.sort){
      postData.sort = self.data.sort.sort;
    };
    const callback = (data)=>{
      if(data.data.length>0){
          self.data.mainData.push.apply(self.data.mainData,data.data);
          self.setData({
            web_mainData: self.data.mainData,
            cssName:"origin-a"
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
    api.productList(postData,callback);
  },


  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },



  changeSort(e){
    const self = this;
    self.setData({
      buttonClicked: true
    });
    const sortby = api.getDataSet(e,'sortby');
    if(self.data.sort.sortby == sortby){
      if(self.data.sort.sort == 'asc'){
        self.data.sort.sort = 'desc'
      }else if(self.data.sort.sort == 'desc'){
        self.data.sort.sort = 'normal'
      }else if(self.data.sort.sort == 'normal'){
        self.data.sort.sort = 'asc'
      }
    }else{
      self.data.sort.sortby = sortby;
      self.data.sort.sort = 'asc';
    };
    self.setData({
      web_sort:self.data.sort
    });
    
    if(self.data.sort.sort == 'normal'){
      self.data.sort = {}
    };
    setTimeout(function(){
      self.setData({
        buttonClicked: false
      })
    }, 1000);
    self.getMainData(true);
  },



  counter(e){
    const self = this;
    const id = api.getDataSet(e,'id');
    if(self.data.products[id]){
      if(api.getDataSet(e,'type')=='+'){
        self.data.products[id].count++;
        api.updateFootOne(id+'salt','payPro','count',self.data.products[id].count);
      }else if(self.data.products[id].count > '1'){
        self.data.products[id].count--;
        api.updateFootOne(id+'salt','payPro','count',self.data.products[id].count);
      }else{
        delete self.data.products[id];
        api.deleteFootOne(id+'salt','payPro')
      };
    }else{
      self.data.products[id] = {};
      self.data.products[id].count = 1;
      self.data.products[id].info = self.data.mainData[api.getDataSet(e,'index')];
      self.data.products[id].model_id = id;
      api.footOne(self.data.products[id],'model_id',100,'payPro','salt');   
    };
    self.setData({
        web_products:self.data.products,
        web_products_one:api.jsonToArray(wx.getStorageSync('payPro'),'push'),
    });  
    self.countTotalPrice();
  },

  
  
  countTotalPrice(){  
    const self = this;
    var totalPrice = 0;
    const obj = self.data.products;
    for(var key in obj){
      totalPrice += obj[key].count*obj[key].info.price;
    };
    self.setData({
      web_totalPrice:totalPrice.toFixed(2)
    });
  },


  check(){
    const self = this;
    const callback = res =>{
    const obj = self.data.products;
    for(var key in obj){
    }
      api.pathTo('/pages/mine/order/cat/cat','nav')
    };
    api.checkPhoneCallback(callback);
  },



  bindManual: function (e) {
    const self = this;
    var count = e.detail.value;
    self.setData({
      count:count
    });
  },


  tap_ch: function(e){
    const self = this;
    if(!self.data.open){
      self.setData({
        open : true
      });
    }else{
      self.setData({
        open : false
      });
    }
  }
   
})  
