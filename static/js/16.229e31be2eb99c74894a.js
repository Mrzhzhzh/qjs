webpackJsonp([16],{"9IRr":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),n=a.n(r),l=a("exGp"),o=a.n(l),s=a("1h8J"),i=a("HBZn"),c=a("dw4X"),p=a("SQnW"),u={watch:{filterText:function(e){this.$refs.tree.filter(e)}},created:function(){this.initMainData()},components:{imgup:c.a,editor:p.a},data:function(){return{tableData:[],dialogScoreVisible:!1,Form:{},standardForm:{},statusOptions:[{value:"false",label:"未处理"},{value:"true",label:"已处理"}],copyStandardForm:{menu_array:[]},recStandardForm:{theme_array:[],mainImg:[],name:"",description:""},sForm:{},imglimit:10,formLabelWidth:"120px",token:this.$store.getters.getUserInfo.token,searchItem:{},options:[],PosOptions:[],searchForm:{is_visit:"",is_deal:""},paginate:{count:0,currentPage:1,pagesize:10,is_page:!0},defaultProps:{children:"child",label:"title",value:"id"}}},methods:{initMainData:function(){var e=this;return o()(n.a.mark(function t(){var a,r,l;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return(a=e).tableData=[],(r=e.paginate).searchItem=Object(i.a)(a.searchItem),r.token=a.token,t.prev=5,t.next=8,Object(s._3)(r);case 8:l=t.sent,t.next=15;break;case 11:t.prev=11,t.t0=t.catch(5),console.log(t.t0),Object(i.f)("网络故障","error");case 15:l&&(a.paginate.count=l.data.total,a.tableData=l.data.data);case 18:case"end":return t.stop()}},t,e,[[5,11]])}))()},handleDel:function(e){var t=this;return o()(n.a.mark(function a(){var r;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:(r=t).sForm={},r.sForm.id=e.id,r.sForm.token=r.token,r.sForm.type="del",r.onSubmit();case 6:case"end":return a.stop()}},a,t)}))()},handleDeal:function(e){var t=this;return o()(n.a.mark(function a(){var r;return n.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:(r=t).sForm={},r.sForm.id=e.id,r.sForm.token=r.token,r.sForm.type="deal",r.onSubmit();case 6:case"end":return a.stop()}},a,t)}))()},onSubmit:function(){var e=this;return o()(n.a.mark(function t(){var a,r;return n.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if("del"!=(a=e).sForm.type){t.next=17;break}return delete a.sForm.type,t.prev=3,t.next=6,Object(s._2)(a.sForm);case 6:r=t.sent,t.next=13;break;case 9:t.prev=9,t.t0=t.catch(3),console.log(t.t0),Object(i.f)("网络故障","error");case 13:a.sForm.type="del",t.next=31;break;case 17:if("deal"!=a.sForm.type){t.next=31;break}return delete a.sForm.type,t.prev=19,t.next=22,Object(s._1)(a.sForm);case 22:r=t.sent,t.next=29;break;case 25:t.prev=25,t.t1=t.catch(19),console.log(t.t1),Object(i.f)("网络故障","error");case 29:a.sForm.type="deal";case 31:r&&"success"==Object(i.g)(r)&&a.initMainData();case 33:case"end":return t.stop()}},t,e,[[3,9],[19,25]])}))()},formatDate:function(e){var t=new Date(1e3*e);return Object(i.b)(t,"yyyy-MM-dd")}}},m={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-container",[a("el-header",[a("div",[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入name",clearable:""},on:{blur:function(t){t.target.value?e.searchItem.name=t.target.value:delete e.searchItem.name,e.initMainData()}}}),e._v(" "),a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入phone",clearable:""},on:{blur:function(t){t.target.value?e.searchItem.phone=t.target.value:delete e.searchItem.phone,e.initMainData()}}}),e._v(" "),a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入passage1",clearable:""},on:{blur:function(t){t.target.value?e.searchItem.passage1=t.target.value:delete e.searchItem.passage1,e.initMainData()}}}),e._v(" "),a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入passage2",clearable:""},on:{blur:function(t){t.target.value?e.searchItem.passage2=t.target.value:delete e.searchItem.passage2,e.initMainData()}}}),e._v(" "),a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入passage3",clearable:""},on:{blur:function(t){t.target.value?e.searchItem.passage3=t.target.value:delete e.searchItem.passage3,e.initMainData()}}}),e._v(" "),a("el-select",{attrs:{placeholder:"请选择状态",clearable:""},on:{change:function(t){t?e.searchItem.is_deal=t:delete e.searchItem.is_deal,e.initMainData()}},model:{value:e.searchForm.is_deal,callback:function(t){e.$set(e.searchForm,"is_deal",t)},expression:"searchForm.is_deal"}},e._l(e.statusOptions,function(e){return a("el-option",{attrs:{label:e.label,value:e.value}})}))],1)]),e._v(" "),a("el-main",{staticStyle:{height:"600px",border:"2px solid #eee"}},[a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[a("el-table-column",{attrs:{label:"姓名",prop:"name"}}),e._v(" "),a("el-table-column",{attrs:{label:"联系方式",prop:"phone"}}),e._v(" "),a("el-table-column",{attrs:{label:"passage1",prop:"passage1"}}),e._v(" "),a("el-table-column",{attrs:{label:"passage2",prop:"passage2"}}),e._v(" "),a("el-table-column",{attrs:{label:"passage3",prop:"passage3"}}),e._v(" "),a("el-table-column",{attrs:{label:"content",prop:"content"}}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",prop:"create_time"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"350"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small"},on:{click:function(a){e.handleDel(t.row)}}},[e._v("删除")]),e._v(" "),a("el-button",{attrs:{size:"small"},on:{click:function(a){e.handleDeal(t.row)}}},[e._v("处理")])]}}])})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"编辑积分或佣金",visible:e.dialogScoreVisible,id:"dialog"},on:{"update:visible":function(t){e.dialogScoreVisible=t}}},[a("el-form",{ref:"Form",attrs:{model:e.Form}},[a("el-form-item",{attrs:{label:"修改内容","label-width":e.formLabelWidth}},[a("el-select",{on:{change:function(t){e.sForm.type=e.Form.type}},model:{value:e.Form.type,callback:function(t){e.$set(e.Form,"type",t)},expression:"Form.type"}},[a("el-option",{attrs:{value:"score",label:"积分"}}),e._v(" "),a("el-option",{attrs:{value:"balance",label:"佣金"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"类型","label-width":e.formLabelWidth}},[a("el-select",{on:{change:function(t){e.sForm.trade_type=e.Form.trade_type}},model:{value:e.Form.trade_type,callback:function(t){e.$set(e.Form,"trade_type",t)},expression:"Form.trade_type"}},[a("el-option",{attrs:{value:"1",label:"增加"}}),e._v(" "),a("el-option",{attrs:{value:"2",label:"减少"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"变动值","label-width":e.formLabelWidth,prop:"score"}},[a("el-input",{attrs:{"auto-complete":"off"},on:{change:function(t){e.sForm.score=e.Form.score}},model:{value:e.Form.score,callback:function(t){e.$set(e.Form,"score",t)},expression:"Form.score"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"变动原因","label-width":e.formLabelWidth,prop:"trade_info"}},[a("el-input",{attrs:{"auto-complete":"off"},on:{change:function(t){e.sForm.trade_info=e.Form.trade_info}},model:{value:e.Form.trade_info,callback:function(t){e.$set(e.Form,"trade_info",t)},expression:"Form.trade_info"}})],1),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.onSubmit()}}},[e._v("确 定")])],1)],1)],1),e._v(" "),a("el-footer",{staticStyle:{"margin-top":"20px"}},[a("div",[a("el-pagination",{attrs:{"current-page":e.paginate.currentPage,"page-sizes":[10,50,70,100],"page-size":e.paginate.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.paginate.count},on:{"size-change":function(t){e.paginate.pagesize=t,e.initMainData()},"current-change":function(t){e.paginate.currentPage=t,e.initMainData()}}})],1)])],1)],1)},staticRenderFns:[]},d=a("VU/8")(u,m,!1,null,null,null);t.default=d.exports}});
//# sourceMappingURL=16.229e31be2eb99c74894a.js.map