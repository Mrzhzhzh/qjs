  // pages/mine/change/change_details.js
import {Api} from '../../../../utils/api.js';
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
    self.data.id = options.id;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData()
    if(options.type=='1'){
      self.data.id = options.id;
      self.getMainData();
      wx.setNavigationBarTitle({
        title: '活动详情'
      })
    }else if(options.type=='2'){
      self.data.id = options.id;
      self.getMenuData();
      wx.setNavigationBarTitle({
        title: '积分兑换详情'
      })
    }else{
      api.showToast('参数有误','fail')
    }
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
        self.data.mainData.content = api.wxParseReturn(res.article_content.content).nodes;
        self.setData({
          web_mainData:self.data.mainData,
        });
      }else{
        wx.showToast({
          title:'该活动已被删除',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }

    };
    api.articleOne(postData,callback);
  },



  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },
})