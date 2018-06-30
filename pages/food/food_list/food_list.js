// pages/food/food_list.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({

  data: {
    
    mainData:[],
    num:'1',
    searchItem:{
      category_id:4,
      passage1:''
    },

    sort:{
      sortby:'',
      sort:''
    },
    
    isLoadAll:false,
    
  },
  

  onLoad(options){

    const self = this;
    console.log(options);
    self.data.id = options.id;
    self.data.searchItem.passage1 = options.id;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.getMainData();
   

  },

  onReachBottom() {

    const self = this;
    if(!self.data.isLoadAll){
      self.data.paginate.currentPage++;
      self.getMainData();
    };

  },

  

  
 


getMainData(isNew){
    const self = this;
    if(isNew){
      api.clearPageIndex(self);
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
    self.getMainData(true);
  },

  
})  
