// pages/food/food_list.js
import {Api} from '../../../utils/api.js';
const api = new Api();

Page({

  data: {

    mainData:[],
    
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


  
  getMainData(){
    const self = this;
   
    const postData = api.cloneForm(self.data.paginate);
    postData.thirdapp_id= getApp().globalData.thirdapp_id;
    postData.searchItem = api.cloneForm(self.data.searchItem);
    
    const callback = (res)=>{
      
      if(res.data.length>0){
        self.data.mainData.push.apply(self.data.mainData,res.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      self.setData({
        web_mainData:self.data.mainData,
      });

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
  
  },


  
})  
