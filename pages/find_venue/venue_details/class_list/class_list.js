// pages/find_venue/class_list.js
import {Api} from '../../../../utils/api.js';
const api = new Api();

Page({

  data: {

    mainData:[],
    
    searchItem:{
      menu_id:9,
      thirdapp_id:'',
      passage1:''
    },
    
    isLoadAll:false,
    
  },
  

  onLoad(options){
    const self = this;
    self.data.searchItem.thirdapp_id = getApp().globalData.thirdapp_id;
    self.data.paginate = api.cloneForm(getApp().globalData.paginate);
    self.data.searchItem.passage1 = options.id;
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
    postData.searchItem = api.cloneForm(self.data.searchItem);
    const callback = (res)=>{ 
      console.log(res)
      if(res){
        self.data.mainData.push.apply(self.data.mainData,res.data);
      }else{
        self.data.isLoadAll = true;
        api.showToast('没有更多了','fail');
      };
      self.setData({
        web_mainData:self.data.mainData,
      });

    };
    api.articleList(postData,callback);
  },




  intoPath(e){

    const self = this;
    api.pathTo(api.getDataSet(e,'path'),'nav');

  }


})