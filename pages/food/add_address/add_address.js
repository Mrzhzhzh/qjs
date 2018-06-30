import {Api} from '../../../utils/api.js';
const api = new Api();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['陕西省', '西安市', '雁塔区'],
    sForm:{
      name:'',
      province:'陕西省',
      city:'西安市',
      country:'雁塔区',
      phone:'',
      detail:'',
      gender:'',
      passage1:'',
      passage2:'',
      
    }
  },

  onLoad: function (options) {
    const self=this;
    if(options.id){
      self.data.id = options.id
      self.getMainData(self.data.id);
      
    }else{
      self.setData({
        web_region:self.data.region
      })
    }
    
  },

  getMainData(id){
    const self = this;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    const postData = api.cloneForm(self.data.paginate);
    postData.searchItem = {};
    postData.searchItem.id = id;
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      console.log(res);
      self.data.sForm = res.data[0];
      const newRegion = [];
      newRegion.push(res.data[0].province);
      newRegion.push(res.data[0].city);
      newRegion.push(res.data[0].country);
      self.data.region = newRegion;
      console.log(self.data.region)
      self.setData({
        web_mainData:self.data.sForm,
        web_region:self.data.region
      })
    };
    api.addressList(postData,callback);
  },


  inputChange(e){
    const self = this;
    const key = api.getDataSet(e,"key");
    const value = e.detail.value;
    self.data.sForm[key] = value;
    console.log(self.data.sForm);
  },

  bindRegionChange: function (e) {
    const self = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    self.data.sForm.province = e.detail.value[0];
    self.data.sForm.city = e.detail.value[1];
    self.data.sForm.country = e.detail.value[2];
    this.setData({
      web_region: e.detail.value
    })
  },

  submit(){

    const self = this;
    const postData = api.cloneForm(self.data.sForm);
    postData.token = wx.getStorageSync('token');
    const callback = (res)=>{
      const resType = api.dealRes(res);
      if(resType){
        api.pathTo('/pages/mine/addres/addres','redi')
      };
    };
    if(self.data.id){
      postData.id = self.data.id;
      api.addressEdit(postData,callback);
    }else{
      api.addressAdd(postData,callback);
    }
    
  },



  chooseLocation:function(e){
    console.log(e)
    var self = this;
    wx.chooseLocation({
          success: function(res){
            // success
            console.log(res);
            
            self.data.sForm.detail = res.address,
            self.data.sForm.passage1 = res.longitude,
            self.data.sForm.passage2 = res.latitude,
            self .setData({
              hasLocation:true,
              location:{
                longitude:res.longitude,
                latitude:res.latitude
              },
              web_mainData:self.data.sForm,
              web_name:res.name,
            })
          },
          fail: function() {
            // fail
          },
          complete: function() {
            // complete
          }
        })
  }
})