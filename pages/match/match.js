//index.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({

  data: {
    sliderData:[],
    mainData:[],
    
    searchItem:{
      thirdapp_id:getApp().globalData.thirdapp_id,
      
    },
    isLoadAll:false,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
  },
  

  onLoad(){

    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getSliderData()
   

  },

  onReachBottom() {

    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };

  },

  getSliderData(){
    const self = this;
    const postData = {};
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    postData.menu_id = 24;
    const callback = (res)=>{
      console.log(res);
      self.data.sliderData = res.banner;
      self.setData({
          web_sliderData:self.data.sliderData,
        });
    };
    api.menuOne(postData,callback);

  },


  
  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);
    };
    const postData = api.cloneForm(self.data.paginate);
    postData.thirdapp_id= getApp().globalData.thirdapp_id;
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
    api.challengeList(postData,callback);
  },


  intoPath(e){

    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');

  },


  
})  


