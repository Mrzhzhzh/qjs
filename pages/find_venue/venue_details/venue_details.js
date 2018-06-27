// pages/find_venue/venue_details.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({

  data: {

    mainData:[],
    
    searchItem:{
      thirdapp_id:getApp().globalData.thirdapp_id,
      
    },

   
    
    isLoadAll:false,
    
  },
  

  onLoad(options){
    const self = this;
    console.log(options);
    self.data.id = options.id;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData()
  },

  


  
  getMainData(id){
    const self = this;
   
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
          title:'该场馆已被删除',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }

    };
    api.merchantOne(postData,callback);
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

  }

})