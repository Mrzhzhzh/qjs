// pages/match/match_details.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({

  data: {

    mainData:[],
    remarkData:[],
    searchItem:{
     challenge_id:''
     
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
    self.data.id = options.id;
    self.data.searchItem.challenge_id = options.id; 
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getRemarkData()
    self.setData({
      web_starArray:self.data.starArray,
    })
  },

  

  Clock(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    postData.id = self.data.id;
    const callback = (res)=>{
      api.dealRes(res);      
    };
    api.userClock(postData,callback);
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
          title:'该挑战赛已被删除',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }
    };
    api.challengeOne(postData,callback);
  },



  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },



  
  getRemarkData(){
    const self = this;
    const postData =api.cloneForm(self.data.paginate);
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

        });
      }
    };
    api.remarkList(postData,callback);
  },




  onReachBottom: function () {
    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getRemarkData();
    };
  },


  
  
})