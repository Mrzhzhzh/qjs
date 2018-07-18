/**
 * Created by jimmy-jiang on 2016/11/21.
 */

import { Token } from 'token.js';
//var token = new Token();
var WxParse = require('../wxParse/wxParse.js');

class Base extends Token{
   
    //http 请求类, 当noRefech为true时，不做未授权重试机制
    request(params) {
        var that = this;
        var baseRestUrl = 'https://www.funnyfit.cn/public/index.php/api/v1/';
        var url=baseRestUrl + params.url;
        
        
        
        wx.request({
            url: url,
            data: params.data,
            method:params.type,
            /*header: {
                'content-type': 'application/json',
                'token': wx.getStorageSync('token')
            },*/
            success: function (res) {
                    
                // 判断以2（2xx)开头的状态码为正确
                // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
                var code = res.data.solely_code;
                if (res.data.solely_code == '200000') {
                    const callback = (data)=>{
                        that.request(data);
                    };
                    that.getUserInfo(params,callback);
                    
                    
                } else {
                    params.sCallback && params.sCallback(res.data);
                }
            },
            fail: function (err) {
                console.log(err)
                //wx.hideNavigationBarLoading();
                //that._processError(err);
                // params.eCallback && params.eCallback(err);
                wx.showToast({
                    title:'网络故障',
                    icon:'fail',
                    duration:2000,
                    mask:true,
                });
            }
        });

       
        
    }

    _processError(err){
        console.log(err);
    }

    _refetch(param) {
        var token = new Token();
        /*token.getTokenFromServer((token) => {
            this.request(param, true);
        });*/
    }

    /*获得元素上的绑定的值*/
    getDataSet(event, key) {
        return event.currentTarget.dataset[key];
    };


    /*wxParse插件返回函数*/
    wxParseReturn(data){
        return WxParse.wxParse('article', 'html', data, this);
    };
    // 1.bindName绑定的数据名(必填)2.type可以为html或者md(必填)3.data为传入的具体数据(必填)4.target为Page对象,一般为this(必填)

    cloneForm(form){
        var res =  JSON.parse(JSON.stringify(form));   
        return res;           
    };

    fillForm(form,pform){
        var res =  JSON.parse(JSON.stringify(form));
        for( var key in form){
            if(pform[key]){
                form[key] = pform[key];
            }
            
        };   
        return form;           
    };

    dealRes(res){
        if(res.solely_code == 100000){
            
            wx.showToast({
                title: res.msg,
                icon: 'succes',
                duration: 1000,
                mask:true
            });
            return true;

        }else{
            
            wx.showToast({
                title: res.msg,
                icon: 'fail',
                duration: 1000,
                mask:true
            });
            return false;
        }      
    };

    getToday(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate;
        return currentdate;
    };

    getJsonLength(json){
        var length = 0;
        for(var item in json ){
            length++ 
        };
        return length;
    };

    jsonToArray(obj,type) {
        
        const result = [];
        for (let key in obj) {
            //result.push(key);
            if(type=='push'){
                result.push(obj[key]);
            }

            if(type=='unshift'){
                result.unshift(obj[key]);
            }
            
            
        }
        return result;
    };

    footOne(res,name,limit,objName,salt){
        const self = this;
        //首先判断微信缓存中是否存在名称为objName的数据
        if(wx.getStorageSync(objName)){
        //若存在，命名为history。
          var history = wx.getStorageSync(objName);
        //用limitSum表示Json的长度。
          var limitSum = self.getJsonLength(history);
        //判断histor中有name属性的数据是否存在。
          if(history[res[name]+salt]){
        //若存在，将它等于res，并设置缓存。
            history[res[name]+salt] = res;
            wx.setStorageSync(objName,history);
          }else{
        //若不存在name，先判断Json长度是否小于限制长度Limit，若符合，。
            if(limitSum < limit){
              history[res[name]+salt] = res;
            }else{
        //若不存在name，且长度已大于Json限制长度，将json转数组添加到数组尾部（push方法）。
              const historyArray = self.jsonToArray(history,'push');
              historyArray.splice(0,1);//删除数组第0个元素
              historyArray.push(res);//push res数据
        //命名history空对象，遍历数组，获得每一条数据。
              var history = {};
              for(var i=0;i<historyArray.length;i++){
                history[historyArray[i][name]+salt] = historyArray[i];
              };
        //最终都添加至名为objName的缓存、
            }
            wx.setStorageSync(objName,history);
          }
        
        }else{
        //若不存在objName数据，命名history为空对象，将res数据存入history,并设置名为objName的缓存。
          var history = {};
          history[res[name]+salt] = res;
          wx.setStorageSync(objName,history);
        }

    };

    updateFootOne(name,objName,fieldName,field){
        const self = this;
    //首先判断微信缓存中是否存在名称为objName的数据。
        if(wx.getStorageSync(objName)){
    //若存在，命名为history。
          var history = wx.getStorageSync(objName);
    ////判断histor中有name属性的数据是否存在，若存在，将其中fieldName属性更新为新的field，存入objName缓存。
          if(history[name]){
           history[[name]][fieldName] = field;
            wx.setStorageSync(objName,history);
          };
        }else{
    //若不存在objName，返回错误。
          return false;
        };
    };

    deleteFootOne(name,objName){
        const self = this;
        
    //首先判断微信缓存中是否存在名称为objName的数据。
        if(wx.getStorageSync(objName)){
    //若存在，命名为history。
          var history = wx.getStorageSync(objName);
    
    //判断histor中有name属性的数据是否存在，若存在，删除这条数据。    
          if(history[name]){
            
            delete history[name]; 
    //设置新的objName。
            wx.setStorageSync(objName,history);
          };
        }else{
     //若不存在objName，返回错误。
          return false;
        }

    };

    footTwo(res,limit,objName,salt){
        const self = this;
        //首先判断微信缓存中是否存在名称为objName的数据。
        if(wx.getStorageSync(objName)){
        //若存在，命名为history。
            var history = wx.getStorageSync(objName);
        //命名limitSum表示history的长度。
            var limitSum = history.length;
        //判断长度是否小于限制长度Limit，若符合，将res数据添加至history的开头。
            if(limitSum < limit){
                history.unshift(res);
        //若长度已大于限制长度，删除history最后一个元素，将res数据添加至history的开头（unshift方法）。
            }else{
                history.splice(limitSum-1,1);
                history.unshift(res);
            };
        //最终都添加至名为objName的缓存、
            wx.setStorageSync(objName,history);
        }else{
        //若不存在objName数据，命名一个history空数据，将res添加至数组，并添加至名为objName的缓存。
          var history = [];
          history.unshift(res);
          wx.setStorageSync(objName,history);
        }
    };


    clearPageIndex(self){
        self.data.paginate.currentPage = 1;
        self.data.isLoadAll = false;
        self.data.mainData = [];
        
    };


    fillChange(e,self,name){      
        const key = this.getDataSet(e,"key");
        const value = e.detail.value;
        self.data[name][key] = value;

    };


    checkComplete(obj){
        
        var pass = true;
        for(var key in obj){
          if(!obj[key]){
            pass = false;
          };
        };
        return pass;
        console.log(pass);
    };


    showToast(title,type,func){
        wx.showToast({
            title:title,
            icon:type,
            duration:1000,
            mask:true,
            complete:func
        })
    };

    pathTo(path,type){

        if(type=='nav'){
            wx.navigateTo({
                url:path
            });
        }else if(type=='tab'){
            wx.switchTab({
                url:path
            });
        }else if(type=='redi'){
            wx.redirectTo({
                url:path
            });
        }else if(type=='rela'){
            wx.reLaunch({
                url:path
            });
        }
    };

    arrayByItem(field,fieldName,array){

        for(var i=0;i<array.length;i++){
            if(array[i][fieldName] == field){
                return array[i];
            }
        }
    };

    getAuthSetting(callback){
        //获取用户当前设置。
        wx.getSetting({
        //setting表示调用成功的返回数据。
            success: setting => {
        //判断返回值scope为false，隐藏loading提示框，showToast接口调用失败（授权失败）。
              if(!setting.authSetting['scope.userInfo']){
                wx.hideLoading();
                this.showToast('授权请点击同意','fail');
        //若返回值为true，获取用户信息，成功后将用户信息回调给主函数。
              }else{
                wx.getUserInfo({
                    success: function(user) {
                        callback&&callback(user.userInfo,setting);  
                    }
                });
                
              };
            }
        });
    };



};

export {Base};
