// pages/food/food_list/food_details.js
import {Api} from '../../../../utils/api.js';
const api = new Api();

Page({

  data: {

    mainData:[],
    
    searchItem:{
      thirdapp_id:getApp().globalData.thirdapp_id,
      
    },

    sort:{
      sortby:'',
      sort:''
    },
    
    isLoadAll:false,
    
  },
  

  onLoad(options){

    const self = this;
    self.data.id = options.id;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
   

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
      api.clearPageIndex(self);
    };
    const postData = {};
    postData.thirdapp_id= getApp().globalData.thirdapp_id;
    postData.id = self.data.id;
    const callback = (res)=>{
      console.log(res);
      if(res.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      self.setData({
        web_mainData:self.data.mainData,
      });

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

  
})  
