// pages/find_venue/venue_details/course.js
import {Api} from '../../../../utils/api.js';
const api = new Api();

Page({

  data: {

    mainData:[],

    
    searchItem:{
      thirdapp_id:getApp().globalData.thirdapp_id,
      
    },
    hiddenModal: true,
    isLoadAll:false,
    placeOrder:{
      token:'',
      address_id:'0',
      pay_type:'1',
      pay_method:'1',
      product_type:'product',
      products:[],
      solely_paytype:"true",
      passage2:'2'

    },
    
  },
  

  onLoad(options){
    const self = this;
    self.data.id = options.id;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();

    self.data.placeOrder.products[0] = {};
    self.data.placeOrder.products[0]['model_id'] = options.id;
    self.data.placeOrder.products[0]['count'] = 1;

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
          title:'该会员卡已被删除',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }

    };
    api.productOne(postData,callback);
  },


  intoPath(e){

    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');

  },

   getRemarkData(){
    const self = this;
    
    const postData = api.cloneForm(self.data.paginate);
    postData.id = self.data.id;
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    const callback = (res)=>{
      console.log(res);
      if(res.data&&res.data.length>0){
        self.data.remarkData.push.apply(self.data.remarkData,res.data);
        self.setData({
          web_remarkData:self.data.remarkData,
        });
      }else{
        self.data.isLoadAll = true;
        self.setData({
          web_isLoadAll:self.data.isLoadAll
        })
        //api.showToast('没有评论了','fail')
      }
    };
    api.remarkList(postData,callback);

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

  // checkPhone(){
  //   const self = this;
  //   const postData = {};
  //   postData.token = wx.getStorageSync('token');
  //   const callback=(data)=>{
  //     if(data){
  //       //self.intoInfo();
  //       self.Pay();

  //     }else{
  //       self.setData({
  //         hiddenModal: false
  //       }) 
  //     }
  //   }
  //   api.checkPhone(postData,callback);
  // },

  // toPersonnalInfo(){
  //     wx.navigateTo({
  //       url:'/pages/mine/phone/phone'
  //     })
  // },


  // listenerCancel(){
  //   this.setData({
  //     hiddenModal: true
  //   })
  // },

  
})  