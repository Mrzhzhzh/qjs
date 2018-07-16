// pages/food/food_list/food_details.js
import {Api} from '../../../../utils/api.js';
const api = new Api();

Page({

  data: {

    mainData:[],
    remarkData:[],
    searchItem:{
      
      product_id:''
    },

    starArray:[1,2,3,4,5],
    score:1,
    isLoadAll:false,
    
  },
  

  onLoad(options){

    const self = this;
    console.log(options)
    self.data.id = options.id,
    self.data.searchItem.product_id = options.id;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getRemarkData();
     if(wx.getStorageSync('collectProductData')[self.data.id]){
      self.setData({
        url: '/images/favor_ic_1.png',
      });
    }else{
      self.setData({
        url: '/images/favor_ic.png',
      });
    };

    self.setData({
      web_starArray:self.data.starArray,
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


  intoPath(e){

    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');

  },

  onReachBottom: function () {
    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getRemarkData();
    };
  },

  getRemarkData(){
    const self = this;
    const postData = api.cloneForm(self.data.paginate);
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    postData.searchItem = self.data.searchItem;
    const callback = (res)=>{
      console.log(res);
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

        });
        //api.showToast('没有评论了','fail')
      }
    };
    api.remarkList(postData,callback);

  },

  collect(){
    const self = this;
    const id = self.data.id;
    if(wx.getStorageSync('collectProductData')&&wx.getStorageSync('collectProductData')[id]){
      
      api.deleteFootOne(id,'collectProductData','salt');
      self.setData({
        url: '/images/favor_ic.png',
      });
    }else{
      api.footOne(self.data.mainData,'id',100,'collectProductData','salt');
      self.setData({
        url: '/images/favor_ic_1.png',
      });
    };
  },

  
})  
