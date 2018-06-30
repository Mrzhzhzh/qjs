//logs.js
import {Api} from '../../utils/api.js';
const api = new Api();

Page({

  data: {

    mainData:[],
    menuData:[],
    searchItem:{
      thirdapp_id:getApp().globalData.thirdapp_id,
    
      type:1,
    
      
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
    self.getMenuData();
    self.getMainData();
  },

  onReachBottom() {

    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };

  },

  onPullDownRefresh:function(){
    const self = this;
    wx.showNavigationBarLoading(); //在标题栏中显示加载
    delete self.data.searchItem.passage1;
    delete self.data.searchItem.passage2;
    self.data.searchItem = ({
      thirdapp_id:getApp().globalData.thirdapp_id,
      type:1,
      
    });
    self.getMainData(true);
  },

  


  getMenuData(){

    const self = this;
    const postData = {};
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    postData.searchItem = {
      parentid:7
    };
    const callback = (res)=>{
      console.log(res);
      if(res.length>0){
        self.data.menuData.push.apply(self.data.menuData,res);
        self.setData({
          web_menuData:self.data.menuData,
        });
      }else{
        api.showToast('没有类别','fail');
      };
    };
    api.menuTree(postData,callback);

  },

  




  getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);
      console.log(self.data.mainData  )
    };
    const postData = api.cloneForm(self.data.paginate);
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    postData.searchItem = api.cloneForm(self.data.searchItem);
    
    const callback = (res)=>{
      console.log(res)
      if(res.data.length>0){
        console.log(self.data.mainData)
        self.data.mainData.push.apply(self.data.mainData,res.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };

      console.log(self.data.mainData)
      self.setData({
        web_mainData:self.data.mainData,
      });

      setTimeout(function()
      {
        wx.hideNavigationBarLoading();
        wx.stopPullDownRefresh();
      },500);
      wx.hideLoading();
      wx.stopPullDownRefresh();
      wx.hideNavigationBarLoading();
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


  pickerChange(e){
    const self = this;
    self.data.searchItem[api.getDataSet(e,'type')] = self.data.menuData[api.getDataSet(e,'index')].child[e.detail.value].id;
    self.getMainData(true);
    self.setData({
      [api.getDataSet(e,'type')]:e.detail.value,
    });

  },


  
})  
