import {Api} from '../../../../utils/api.js';
const api = new Api();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    mainData:{},
    sForm:{
      content:''
    }
  },

  onLoad(options){
    const self = this;
    wx.showLoading();
    self.getMainData(options.art_id);
    if(options.art_id){
      self.data.art_id = options.art_id;
    };
    if(options.model_id){
      self.data.model_id = options.model_id; 
    };
  },
  
  getMainData(id){
    const self = this;
    const postData = {};
    postData.id = id;
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      if(res.solely_code){
        wx.showToast({
          title:'评价的商品无',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }else{
        self.data.mainData = res;
        self.data.mainData.content = api.wxParseReturn(res.content);
        self.setData({
          web_mainData:self.data.mainData,
        });
        wx.hideLoading();
      }
    };
    api.orderOne(postData,callback);

  },



  fillChange(e){
    const self = this;
    self.data.isALL=false;
    api.fillChange(e,self,'sForm');
    console.log(self.data.isALL);
  },

  sendRemark(model_id,order_id){
    const self = this;
    const postData = api.cloneForm(self.data.sForm);
    postData.model_id = self.data.model_id;
    postData.order_id = self.data.order_id;
    postData.token = wx.getStorageSync('token');
    postData.remarkScore = self.data.score;
    const callback = (res)=>{
      const resType = api.dealRes(res);
      if(resType){
        
        wx.navigateBack({
          delta: 1
        })
      }
    };
    api.remarkAdd(postData,callback);
  },


  checkComplete(){
    const self = this;
    console.log(self.data.sForm.content);
    setTimeout(function(){
      if(!self.data.sForm.content){
        api.showToast('请输入评论','fail');
      }else{
        self.sendRemark();
      };
    },300);
    
  },


})