webpackJsonp([11],{UmiO:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),o=a.n(r),n=a("exGp"),l=a.n(n),i=a("SQnW"),s=a("dw4X"),c=a("1h8J"),p=a("HBZn"),u={data:function(){return{mainData:[],tableDataCoupon:[],tableDataCustomerCard:[],dialogFormVisible:!1,userId:"",formLabelWidth:"120px",paginate:{count:0,currentPage:1,pagesize:10,is_page:!0},paginateCoupon:{count:0,currentPage:1,pagesize:10,is_page:!0},paginateCustomerCard:{count:0,currentPage:1,pagesize:10,is_page:!0},searchItem:{},searchForm:{phone:"",username:""},imglimit:2,Form:{},standardForm:{},sForm:{},passForm:{password:""},scoreForm:{trade_type:"",trade_info:"",score:"",type:""},dialogType:"main",userKey:this.$store.getters.getUserInfo.username,token:this.$store.getters.getUserInfo.token,thirdapp_id:this.$store.getters.getUserInfo.thirdapp_id}},created:function(){this.initMainData()},components:{editor:i.a,imgup:s.a},methods:{initMainData:function(){var e=this;return l()(o.a.mark(function t(){var a,r,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return(a=e).mainData=[],(r=a.paginate).token=a.token,a.searchItem&&(r.searchItem=Object(p.a)(a.searchItem)),t.prev=6,t.next=9,Object(c.L)(r);case 9:n=t.sent,t.next=16;break;case 12:t.prev=12,t.t0=t.catch(6),console.log(t.t0),Object(p.f)("网络故障","error");case 16:n&&(a.paginate.count=n.data.total,a.mainData=n.data.data);case 19:case"end":return t.stop()}},t,e,[[6,12]])}))()},initCouponData:function(){var e=this;return l()(o.a.mark(function t(){var a,r,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return(a=e).tableDataCoupon=[],(r=a.paginateCoupon).token=a.token,r.id=a.userId,t.prev=5,t.next=8,Object(c.m)(r);case 8:n=t.sent,a.dialogFormVisible=!0,t.next=16;break;case 12:t.prev=12,t.t0=t.catch(5),console.log(t.t0),Object(p.f)("网络故障","error");case 16:n&&(a.paginateCoupon.count=n.data.total,a.tableDataCoupon=n.data.data);case 19:case"end":return t.stop()}},t,e,[[5,12]])}))()},initCustomerCardData:function(){var e=this;return l()(o.a.mark(function t(){var a,r,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return(a=e).tableDataCoupon=[],(r=a.paginateCustomerCard).token=a.token,r.id=a.userId,t.prev=5,t.next=8,Object(c.l)(r);case 8:n=t.sent,a.dialogFormVisible=!0,t.next=16;break;case 12:t.prev=12,t.t0=t.catch(5),console.log(t.t0),Object(p.f)("网络故障","error");case 16:n&&(a.paginateCustomerCard.count=n.data.total,a.tableDataCustomerCard=n.data.data);case 19:case"end":return t.stop()}},t,e,[[5,12]])}))()},findCoupon:function(e){this.dialogType="coupon",this.userId=e.id,this.initCouponData()},findCard:function(e){this.dialogType="card",this.userId=e.id,this.initCustomerCardData()},handleEdit:function(e){this.dialogType="main",this.Form=Object(p.a)(e),this.sForm={},this.sForm.id=e.id,this.sForm.token=this.token,this.sForm.type="edit",this.dialogFormVisible=!0},handleScoreAndBalance:function(e){this.dialogType="scoreAndBalance",this.Form=Object(p.a)(this.scoreForm),this.sForm={},this.sForm.user_id=e.id,this.sForm.token=this.token,this.dialogFormVisible=!0},onSubmit:function(){var e=this;return l()(o.a.mark(function t(){var a,r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if("edit"!=(a=e).sForm.type){t.next=17;break}return delete a.sForm.type,t.prev=3,t.next=6,Object(c.K)(a.sForm);case 6:r=t.sent,t.next=13;break;case 9:t.prev=9,t.t0=t.catch(3),console.log(t.t0),Object(p.f)("网络故障","error");case 13:a.sForm.type="edit",t.next=47;break;case 17:if("score"!=a.sForm.type){t.next=33;break}return delete a.sForm.type,t.prev=19,t.next=22,scoreAdd(a.sForm);case 22:r=t.sent,t.next=29;break;case 25:t.prev=25,t.t1=t.catch(19),console.log(t.t1),Object(p.f)("网络故障","error");case 29:a.sForm.type="score",t.next=47;break;case 33:if("balance"!=a.sForm.type){t.next=47;break}return delete a.sForm.type,t.prev=35,t.next=38,balanceAdd(a.sForm);case 38:r=t.sent,t.next=45;break;case 41:t.prev=41,t.t2=t.catch(35),console.log(t.t2),Object(p.f)("网络故障","error");case 45:a.sForm.type="balance";case 47:r&&"success"==Object(p.g)(r)&&(a.dialogFormVisible=!1,a.initMainData());case 50:case"end":return t.stop()}},t,e,[[3,9],[19,25],[35,41]])}))()}}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-container",[a("el-header",[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入电话号码",clearable:""},on:{blur:function(t){t.target._value?e.searchItem.phone=t.target._value:delete e.searchItem.phone,e.initMainData()}},model:{value:e.searchForm.phone,callback:function(t){e.$set(e.searchForm,"phone",t)},expression:"searchForm.phone"}}),e._v(" "),a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入真实姓名",clearable:""},on:{blur:function(t){t.target._value?e.searchItem.username=t.target._value:delete e.searchItem.username,e.initMainData()}},model:{value:e.searchForm.username,callback:function(t){e.$set(e.searchForm,"username",t)},expression:"searchForm.username"}})],1),e._v(" "),a("el-main",{staticStyle:{height:"700px",border:"2px solid #eee"}},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.mainData}},[a("el-table-column",{attrs:{label:"用户ID",prop:"id"}}),e._v(" "),a("el-table-column",{attrs:{label:"用户昵称",prop:"nickname"}}),e._v(" "),a("el-table-column",{attrs:{label:"真实姓名",prop:"username"}}),e._v(" "),a("el-table-column",{attrs:{label:"手机号",prop:"phone"}}),e._v(" "),a("el-table-column",{attrs:{label:"用户头像",width:"180"},scopedSlots:e._u([{key:"default",fn:function(t){return[t.row.headimgurl?a("div",[a("img",{staticStyle:{width:"60px","border-radius":"50%"},attrs:{src:t.row.headimgurl[0].url}})]):e._e()]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"邮箱",prop:"email"}}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",prop:"create_time"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"350"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small"},on:{click:function(a){e.findCoupon(t.row)}}},[e._v("\n          优惠券列表\n          ")]),e._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(a){e.findCard(t.row)}}},[e._v("\n          会员卡列表\n          ")]),e._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(a){e.handleEdit(t.row)}}},[e._v("\n          编辑\n          ")]),e._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(a){e.handleScoreAndBalance(t.row)}}},[e._v("\n          处理积分以及余额\n          ")])]}}])})],1),e._v(" "),a("el-dialog",{attrs:{title:"修改用户信息",visible:e.dialogFormVisible,id:"dialog"},on:{"update:visible":function(t){e.dialogFormVisible=t}}},["coupon"==e.dialogType?a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableDataCoupon}},[a("el-table-column",{attrs:{prop:"",label:"优惠券名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"",label:"优惠券内容"}}),e._v(" "),a("el-table-column",{attrs:{prop:"receive_time",label:"优惠券领取时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"deadline",label:"有效期"}}),e._v(" "),a("el-table-column",{attrs:{prop:"use_time",label:"使用时间"}}),e._v(" "),a("el-table-column",{attrs:{label:"优惠券状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[0==t.row.coupon_status?a("span",[e._v("未使用")]):e._e(),e._v(" "),1==t.row.coupon_status?a("span",[e._v("已使用")]):e._e(),e._v(" "),-1==t.row.coupon_status?a("span",[e._v("已失效")]):e._e()]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.paginateCoupon.currentPage,"page-sizes":[10,50,70,100],"page-size":e.paginateCoupon.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.paginateCoupon.count},on:{"size-change":function(t){e.paginateCoupon.pagesize=t,e.initMainData()},"current-change":function(t){e.paginateCoupon.currentPage=t,e.initMainData()}}})],1):e._e(),e._v(" "),"card"==e.dialogType?a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableDataCustomerCard}},[a("el-table-column",{attrs:{prop:"card.name",label:"会员卡名称"}}),e._v(" "),a("el-table-column",{attrs:{prop:"card.cardLevel",label:"会员卡等级"}}),e._v(" "),a("el-table-column",{attrs:{prop:"card.description",label:"会员卡内容"}}),e._v(" "),a("el-table-column",{attrs:{prop:"card.price",label:"会员卡价格"}}),e._v(" "),a("el-table-column",{attrs:{prop:"pay_time",label:"会员卡购买时间"}}),e._v(" "),a("el-table-column",{attrs:{prop:"deadline",label:"有效期"}}),e._v(" "),a("el-table-column",{attrs:{prop:"score",label:"积分"}}),e._v(" "),a("el-table-column",{attrs:{label:"会员卡类型"},scopedSlots:e._u([{key:"default",fn:function(t){return[1==t.row.cardType?a("span",[e._v("分值卡")]):e._e(),e._v(" "),2==t.row.cardType?a("span",[e._v("时间卡")]):e._e(),e._v(" "),3==t.row.cardType?a("span",[e._v("单次卡")]):e._e()]}}])})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.paginateCoupon.currentPage,"page-sizes":[10,50,70,100],"page-size":e.paginateCoupon.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.paginateCoupon.count},on:{"size-change":function(t){e.paginateCoupon.pagesize=t,e.initMainData()},"current-change":function(t){e.paginateCoupon.currentPage=t,e.initMainData()}}})],1):e._e(),e._v(" "),"main"==e.dialogType?a("div",[a("el-form",{ref:"Form",attrs:{model:e.Form}},[a("el-form-item",{attrs:{label:"真实姓名","label-width":e.formLabelWidth,prop:"username"}},[a("el-input",{attrs:{"auto-complete":"off"},on:{input:function(t){e.sForm.username=arguments[0]}},model:{value:e.Form.username,callback:function(t){e.$set(e.Form,"username",t)},expression:"Form.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"手机号","label-width":e.formLabelWidth,prop:"phone"}},[a("el-input",{attrs:{"auto-complete":"off"},on:{change:function(t){e.sForm.phone=e.Form.phone}},model:{value:e.Form.phone,callback:function(t){e.$set(e.Form,"phone",t)},expression:"Form.phone"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.onSubmit()}}},[e._v("确 定")])],1)],1):e._e(),e._v(" "),"scoreAndBalance"==e.dialogType?a("div",[a("el-form",{ref:"Form",attrs:{model:e.Form}},[a("el-form-item",{attrs:{label:"修改内容","label-width":e.formLabelWidth}},[a("el-select",{on:{change:function(t){e.sForm.type=e.Form.type}},model:{value:e.Form.type,callback:function(t){e.$set(e.Form,"type",t)},expression:"Form.type"}},[a("el-option",{attrs:{value:"score",label:"积分"}}),e._v(" "),a("el-option",{attrs:{value:"balance",label:"佣金"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"类型","label-width":e.formLabelWidth}},[a("el-select",{on:{change:function(t){e.sForm.trade_type=e.Form.trade_type}},model:{value:e.Form.trade_type,callback:function(t){e.$set(e.Form,"trade_type",t)},expression:"Form.trade_type"}},[a("el-option",{attrs:{value:"1",label:"增加"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"减少"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"变动值","label-width":e.formLabelWidth,prop:"score"}},[a("el-input",{attrs:{"auto-complete":"off"},on:{change:function(t){e.sForm.score=e.Form.score}},model:{value:e.Form.score,callback:function(t){e.$set(e.Form,"score",t)},expression:"Form.score"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"变动原因","label-width":e.formLabelWidth,prop:"trade_info"}},[a("el-input",{attrs:{"auto-complete":"off"},on:{change:function(t){e.sForm.trade_info=e.Form.trade_info}},model:{value:e.Form.trade_info,callback:function(t){e.$set(e.Form,"trade_info",t)},expression:"Form.trade_info"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.onSubmit()}}},[e._v("确 定")])],1)],1):e._e()])],1),e._v(" "),a("el-footer",[a("el-pagination",{attrs:{"current-page":e.paginate.currentPage,"page-sizes":[10,50,70,100],"page-size":e.paginate.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.paginate.count},on:{"size-change":function(t){e.paginate.pagesize=t,e.initMainData()},"current-change":function(t){e.paginate.currentPage=t,e.initMainData()}}})],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(u,m,!1,function(e){a("bIFK")},null,null);t.default=d.exports},bIFK:function(e,t){}});
//# sourceMappingURL=11.ec37643bd3e0774a0219.js.map