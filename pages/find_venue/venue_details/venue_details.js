// pages/find_venue/venue_details.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({

  data: {
    num:'1',
    classData:[],
    cardData:[],
    remarkData:[],
    mainData:[],
    id:'',

    searchItem:{
     merchant_id:'',
    },

    searchItem1:{
     category_id:3,
     passage1:''
    },

    searchItem2:{
      category_id:6,
      passage1:''
    },
    searchItem3:{
      category_id:5,
      passage1:''
    },



    starArray:[1,2,3,4,5],
    score:1,
    isLoadAll:false,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    
    
  },
  

  onLoad(options){
    const self = this;
    console.log(options);
    self.data.id = options.id;
    self.data.searchItem.merchant_id = options.id;
    self.data.searchItem1.passage1 = options.id;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.data.searchItem2.passage1 = options.id;
    
    self.data.searchItem3.passage1 = options.id;
  
    self.getMainData();
    self.getCardData();
    self.getRemarkData();
    self.getClassData();
    self.getcoachData();
    self.setData({
      web_starArray:self.data.starArray,
    })
       
    

    if(wx.getStorageSync('collectData')[self.data.id]){
      self.setData({
        url: '/images/favor_ic_1.png',
      });
    }else{
      self.setData({
        url: '/images/favor_ic.png',
      });
    };
  },

  collect(){
    const self = this;
    const id = self.data.id;

    if(wx.getStorageSync('collectData')&&wx.getStorageSync('collectData')[id]){

      console.log(1)
      api.deleteFootOne(id,'collectData','salt');
      self.setData({
        url: '/images/favor_ic.png',
      });
    }else{
      api.footOne(self.data.mainData,'id',100,'collectData','salt');
      
      self.setData({
        url: '/images/favor_ic_1.png',
      });
    };
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
       
        self.setData({
          web_mainData:self.data.mainData,
        });
      }else{
        wx.showToast({
          title:'该场馆已被删除',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }

    };
    api.merchantOne(postData,callback);
  },


  
   getRemarkData(){
    const self = this;
    const postData = api.cloneForm(self.data.paginate);
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    postData.searchItem = self.data.searchItem;
    const callback = (res)=>{
      
     if(res.data&&res.data.length>0){
        self.data.remarkData.push.apply(self.data.remarkData,res.data);
        self.setData({
          web_remarkData:self.data.remarkData,
          web_remarkData_total:res.total,
        });
      }else{
        self.data.isLoadAll = true;
        self.setData({
          web_isLoadAll:self.data.isLoadAll,
          web_remarkData_total:res.total,

        })
        //api.showToast('没有评论了','fail')
      }
    };
    api.remarkList(postData,callback);

  },



  getCardData(){
    const self = this;
    const postData = api.cloneForm(self.data.paginate);
    postData.thirdapp_id= getApp().globalData.thirdapp_id;
    postData.searchItem = api.cloneForm(self.data.searchItem1); 
    const callback = (res)=>{
      self.data.cardData = res;
     
      self.setData({
        web_cardData:self.data.cardData,
      });
    };
    api.productList(postData,callback);
  },


  getClassData(){
    const self = this;
    const postData = api.cloneForm(self.data.paginate);
    postData.thirdapp_id= getApp().globalData.thirdapp_id;
    postData.searchItem = api.cloneForm(self.data.searchItem2); 
    const callback = (res)=>{ 
      self.data.classData = res;
      console.log(res)
      self.setData({
        web_classData:self.data.classData,
      });

    };
    api.productList(postData,callback);
  },

  getcoachData(){
    const self = this;
     const postData = api.cloneForm(self.data.paginate);
    postData.thirdapp_id= getApp().globalData.thirdapp_id;
    postData.searchItem = api.cloneForm(self.data.searchItem3); 
    const callback = (res)=>{ 
      self.data.coachData = res;
      
      
      self.setData({
        web_coachData:self.data.coachData,
      });

    };
    api.productList(postData,callback);
  },


  intoPath(e){

    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');

  },

  onReachBottom() {

    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getRemarkData();
    };

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
      self.data.searchItem.transport_status = '2';
      self.data.searchItem.order_step = '0';
      self.data.searchItem.remark_status = 'false';
    }else if(num=='5'){
      self.data.searchItem.order_step = '1';
    };

    self.setData({
      web_mainData:[],
    });
    self.getMainData(true);

  },

})