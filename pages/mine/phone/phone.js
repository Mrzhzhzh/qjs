import {Api} from '../../../utils/api.js';
const api = new Api();
Page({
  data: {
    sForm:{
      phone:'',
    },
  

  },


  onLoad(){
    const self = this;
    self.getMainData();

  },

  getMainData(){
    const self = this;
    const postData = {};
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      self.data.sForm.phone = res.phone;
      self.setData({
        web_sForm:self.data.sForm,
      });
      wx.hideLoading();
    };
    api.userOne(postData,callback);
  },

  changeBind(e){
    const self = this;
    api.fillChange(e,self,'sForm');
    self.setData({
      web_sForm:self.data.sForm,
    });
    console.log(self.data.sForm)
  },

  intoPath(e){
    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');
  },

  edit(user){
    const self = this;
    const postData = api.cloneForm(self.data.sForm);
    postData.username = self.data.sForm.username;
    postData.token = wx.getStorageSync('token');
    const callback = (data)=>{
      wx.hideLoading();
      api.dealRes(data);
    };
    api.userEdit(postData,callback);
  },

  submit(){
    const self = this;
    const pass = api.checkComplete(self.data.sForm);
    if(pass){
      wx.showLoading();
      const callback = (user,res) =>{
        self.edit(user);
      };
      
       api.getAuthSetting(callback);
    }else{
      api.showToast('请填写手机号','fail');
    };
  },

  

})