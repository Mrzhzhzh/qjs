import {Api} from '../../../../utils/api.js';
const api = new Api();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    challenge_id:'',
    challengeData:{},
    mainData:{},
    sForm:{
      content:''
    },
    starArray:[1,2,3,4,5],
    score:1
  },

  onLoad(options){
    const self = this;
    wx.showLoading();
    console.log(options);
    if(options.model_id&&options.order_id){
      self.data.model_id = options.model_id; 
      self.data.order_id =options.order_id;
      self.setData({
          web_mainData:self.data.mainData,
          web_starArray:self.data.starArray,
          web_score:self.data.score,
        
        });
      self.getMainData(options.order_id);
      }else{
      self.data.challenge_id = options.challenge_id
      self.setData({
       web_challengeData:self.data.challengeData,
       web_starArray:self.data.starArray,
       web_score:self.data.score,
      })
      self.getChallengeData(options.challenge_id);
      
    }
  },
    
    
  
  
  getMainData(id){
    const self = this;
    const postData = {};
    postData.id = id;
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      console.log(res);
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
          web_starArray:self.data.starArray,
          web_score:self.data.score
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

  sendRemark(){
    const self = this;
    const postData = api.cloneForm(self.data.sForm);
    postData.model_id =self.data.model_id;
    postData.order_id = self.data.order_id;
    postData.challenge_id=self.data.challenge_id;
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

  chooseStar(e){
    const self = this;
    self.data.score = api.getDataSet(e,'key');
    self.setData({
      web_score:self.data.score
    });
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

  getChallengeData(){
    const self = this;
    
    const postData = {};
    postData.thirdapp_id= getApp().globalData.thirdapp_id;
    postData.id = self.data.challenge_id;
       const callback = (res)=>{
     console.log(res);
      if(res.solely_code){
        wx.showToast({
          title:'评价的商品无',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }else{
        self.data.challenge = res;
        self.data.challenge.content = api.wxParseReturn(res.content);
        self.setData({
          web_challenge:self.data.challenge,
          web_starArray:self.data.starArray,
          web_score:self.data.score
        });
        wx.hideLoading();
      }
    };
    api.challengeOne(postData,callback);
  },

  


})