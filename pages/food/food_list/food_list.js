// pages/food/food_list.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({

  data: {
    merchantData:[],
    mainData:[],
    num:'1',
    searchItem:{
      
      passage1:''
    },

    sort:{
      sortby:'',
      sort:''
    },
    
    isLoadAll:false,
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    
  },
  

  onLoad(options){

    const self = this;
    console.log(options);
    self.data.id = options.id;
    self.data.searchItem.passage1 = options.id;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
    self.getmerchantData();
   

  },

  onReachBottom() {

    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };

  },


getmerchantData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);
    };
    const postData = {};
    postData.thirdapp_id= getApp().globalData.thirdapp_id;
    postData.id = self.data.id;
    const callback = (res)=>{
      if(res){
        self.data.merchantData = res;
        self.data.merchantData.content = api.wxParseReturn(res.content).nodes;
        console.log(self.data.merchantData)
        self.setData({
          web_merchantData:self.data.merchantData,
        });
      }else{
        wx.showToast({
          title:'该商家已被删除',
          icon:'fail',
          duration:1000,
          mask:true
        })
      }

    };
    api.merchantOne(postData,callback);
  },
  

  
 


getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);
      self.setData({
        web_mainData:self.data.mainData
      });
    };
    const postData = api.cloneForm(self.data.paginate);
    postData.thirdapp_id = getApp().globalData.thirdapp_id;
    postData.searchItem = api.cloneForm(self.data.searchItem);
    if(self.data.sort.sortby){
      postData.sortby = self.data.sort.sortby;
    };
    if(self.data.sort.sort){
      postData.sort = self.data.sort.sort;
    };
    console.log(postData);

    const callback = (data)=>{
        if(data.data.length>0){
            self.data.mainData.push.apply(self.data.mainData,data.data);
            self.setData({
                web_mainData: self.data.mainData,
                cssName:"origin-a"
            });
        }else{
            self.data.isLoadAll = true;
            wx.showToast({
                title: '没有更多了',
                icon: 'fail',
                duration: 1000,
                mask:true
            });
        };
    };
    api.productList(postData,callback);
  },


  intoPath(e){

    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');

  },

  changeSort(e){
    const self = this;
    const sortby = api.getDataSet(e,'sortby');
    if(self.data.sort.sortby == sortby){
      if(self.data.sort.sort == 'asc'){
        self.data.sort.sort = 'desc'
      }else if(self.data.sort.sort == 'desc'){
        self.data.sort.sort = 'normal'
      }else if(self.data.sort.sort == 'normal'){
        self.data.sort.sort = 'asc'
      }
    }else{
      self.data.sort.sortby = sortby;
      self.data.sort.sort = 'asc';
    };
    self.setData({
      web_sort:self.data.sort
    });
    if(self.data.sort.sort == 'normal'){
      self.data.sort = {}
    };
    self.getMainData(true);
  },

  
})  
