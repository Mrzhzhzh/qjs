//logs.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({

  data: {

    mainData:[],
    
    searchItem:{
      
      type:2
    },
    isLoadAll:false,
    
  },
  

  onLoad(){

    const self = this;
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
    const postData = api.cloneForm(self.data.paginate);
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    postData.searchItem= api.cloneForm(self.data.searchItem);
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
    api.merchantList(postData,callback);
  },


  intoPath(e){

    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');

  },


  
})  

