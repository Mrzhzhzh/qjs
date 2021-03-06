// pages/find_venue/venue_details/evaluate/vipcard.js
import {Api} from '../../../../utils/api.js';
const api = new Api();

Page({

  data: {
    
    mainData:[], 
    searchItem:{
      category_id:3,
      passage1:''
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
    self.data.searchItem.passage1 = options.id;
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


  
  getMainData(){
    const self = this;   
    const postData = api.cloneForm(self.data.paginate);
    postData.thirdapp_id= getApp().globalData.thirdapp_id;
    postData.searchItem = api.cloneForm(self.data.searchItem);    
    const callback = (res)=>{
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
    api.productList(postData,callback);
  },




  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },
})