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
  },
  

  onLoad(options){

    const self = this;
    console.log(options);
    self.data.id = options.id;
    self.data.searchItem.passage1 = options.id;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getmerchantData();
    wx.removeStorageSync('payPro');
    
    
  /*  self.data.products[0] = {};
    self.data.products[0].product_id = options.id;
   self.data.products[0].isSelect = false;
    self.data.products[0].count =1;*/
    
    /*
    self.setData({
      currentStatus:0,
      web_productCounts:self.data.products[0].count,
      web_modelIndex:0,
      web_passageIndex:0,
      web_payType:'price',
    });


    
    api.footOne(self.data.products[0],'product_id',100,'cartData');*/
  
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
        console.log(self.data.merchantData)
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

  /*onShow: function () {
    const self = this;
    self.data.products= api.jsonToArray(wx.getStorageSync('products'),'unshift');
    self.setData({
      web_products:self.data.products
    });
    self.countTotalPrice();
  },*/

  
  

  
 


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
    console.log(postData);

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
    self.getMainData(true);
  },

  counter(e){
    const self = this;
    const id = api.getDataSet(e,'id');
    
    if(self.data.products[id]){

      if(api.getDataSet(e,'type')=='+'){
        self.data.products[id].count++;
      }else{
        if(self.data.products[id].count > '1'){
          self.data.products[id].count--;
        }else{
          delete self.data.products[id];
        }
      };

    }else{

      self.data.products[id] = {};
      self.data.products[id].count = 1;
      self.data.products[id].info = self.data.mainData[api.getDataSet(e,'index')];
      self.data.products[id].model_id = id;
      
    };

    api.footOne(self.data.products[id],'model_id',100,'payPro','salt');

    self.setData({
        web_products:self.data.products,
        web_products_one:api.jsonToArray(wx.getStorageSync('payPro'),'push'),
    });




    /*if(api.getDataSet(e,'type')=='+'){
      self.data.mainData[index].count++;
    }else{
      if(self.data.mainData[index].count > '1'){
        
        self.data.mainData[index].count--;
      }
    };
    api.updateFootOne(self.data.mainData[index].product_id,'cartData','count',self.data.mainData[index].count);*/
    
    self.countTotalPrice();
  },

  /*choose(e){
    const self = this;
    const id = api.getDataSet(e,'id');
    if(self.data.products[id].isSelect == 'true'){
      self.data.products[id].isSelect = 'false';
    }else{
      self.data.products[id].isSelect = 'true';
    }
   
    api.updateFootOne(self.data.products[id].info.id,'products','isSelect',self.data.products[id].isSelect)
    self.setData({                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
      web_products:self.data.products
    });
     
    self.countTotalPrice();
  },
*/
  


  countTotalPrice(){  
    const self = this;



    var totalPrice = 0;
    const obj = self.data.products;
    for(var key in obj){
      console.log(obj[key]);
      totalPrice += obj[key].count*obj[key].info.price;
    };
    console.log(totalPrice);
    self.setData({
      web_totalPrice:totalPrice.toFixed(2)
    });

    /*var products = self.data.products;
    var totalPrice =0;
    var obj = products;
    var arr = Object.keys(obj);
    for(var i=0;i<arr;i++){ 
     
      totalPrice += products[i].info.price * products[i].count;
    
    };
    
        
    self.setData({
      web_totalPrice:totalPrice.toFixed(2)
    });*/

    
  },

  check(){
    const self = this;
    const callback = res =>{
    const obj = self.data.products;
    for(var key in obj){
      console.log(obj)
    }
      //wx.setStorageSync('payPro',obj);
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
