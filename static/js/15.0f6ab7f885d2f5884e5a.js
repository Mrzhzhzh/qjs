webpackJsonp([15],{R6lz:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Xxa5"),o=a.n(r),n=a("exGp"),i=a.n(n),l=a("bOdI"),s=a.n(l),c=a("1h8J"),m=a("HBZn"),u=a("dw4X"),d=a("SQnW"),p={watch:{filterText:function(e){this.$refs.tree.filter(e)}},created:function(){this.initMainData()},components:{imgup:u.a,editor:d.a},data:function(){var e;return{filterText:"",menudata:[],themeData:[],tableData:[],dialogFormVisible:!1,recDialogFormVisible:!1,copyDialogFormVisible:!1,Form:{},standardForm:(e={title:"",small_title:"",description:"",keywords:""},s()(e,"small_title",""),s()(e,"content",""),s()(e,"listorder",""),s()(e,"img",[]),s()(e,"bannerImg",[]),s()(e,"contactPhone",""),s()(e,"menu_array",[]),e),copyStandardForm:{menu_array:[]},recStandardForm:{theme_array:[],mainImg:[],name:"",description:""},sForm:{},imglimit:10,formLabelWidth:"120px",token:this.$store.getters.getUserInfo.token,searchItem:{},options:[],PosOptions:[],searchForm:{},paginate:{count:0,currentPage:1,pagesize:10,is_page:!0},defaultProps:{children:"child",label:"name",value:"id"},dialogType:"main"}},methods:{initThemeData:function(){var e=this;return i()(o.a.mark(function t(){var a,r,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return(r=(a=e).paginate).token=a.token,t.prev=3,t.next=6,Object(c.J)(r);case 6:n=t.sent,t.next=13;break;case 9:t.prev=9,t.t0=t.catch(3),console.log(t.t0),Object(m.f)("网络故障","error");case 13:n&&(a.themeData=n.data,console.log(a.themeData));case 16:case"end":return t.stop()}},t,e,[[3,9]])}))()},initMainData:function(){var e=this;return i()(o.a.mark(function t(){var a,r,n;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return(a=e).tableData=[],(r=e.paginate).searchItem=Object(m.a)(a.searchItem),r.token=a.token,t.prev=5,t.next=8,Object(c._8)(r);case 8:n=t.sent,t.next=15;break;case 11:t.prev=11,t.t0=t.catch(5),console.log(t.t0),Object(m.f)("网络故障","error");case 15:n&&(a.paginate.count=n.data.total,a.tableData=n.data.data);case 18:case"end":return t.stop()}},t,e,[[5,11]])}))()},handleAdd:function(){this.dialogType="main",this.Form=Object(m.a)(this.standardForm),this.sForm={},this.sForm.type="add",this.sForm.token=this.token,this.dialogFormVisible=!0},handleEdit:function(e){this.dialogType="main",this.Form=Object(m.a)(e),this.sForm={},this.Form.content=e.article_content.content,this.sForm.id=e.id,this.sForm.token=this.token,this.sForm.type="edit";var t=[];Object(m.d)(this.menudata,this.Form.menu_id,t),t.push(this.Form.menu_id),this.Form.menu_array=t,this.dialogFormVisible=!0},handleDel:function(e){var t=this;return i()(o.a.mark(function a(){var r;return o.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:(r=t).sForm={},r.sForm.id=e.id,r.sForm.token=r.token,r.sForm.type="del",r.onSubmit();case 6:case"end":return a.stop()}},a,t)}))()},handleCopy:function(e){this.dialogType="copy",this.sForm=Object(m.a)(e),this.Form=Object(m.a)(this.copyStandardForm),delete this.sForm.id,delete this.sForm.create_time,delete this.sForm.delete_time,delete this.sForm.menu_id,delete this.sForm.thirdapp_id,delete this.sForm.update_time,delete this.sForm.view_count,delete this.sForm.status,delete this.sForm.article_content,this.sForm.content=e.article_content.content,this.sForm.type="add",this.sForm.token=this.token,this.dialogFormVisible=!0},handleRec:function(e){this.dialogType="rec",this.sForm={},this.Form=Object(m.a)(this.recStandardForm),this.sForm.relation_id=e.id,this.sForm.token=this.token,this.sForm.type="Rec",this.dialogFormVisible=!0},onSubmit:function(){var e=this;return i()(o.a.mark(function t(){var a,r;return o.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if("edit"!=(a=e).sForm.type){t.next=17;break}return delete a.sForm.type,t.prev=3,t.next=6,Object(c._15)(a.sForm);case 6:r=t.sent,t.next=13;break;case 9:t.prev=9,t.t0=t.catch(3),console.log(t.t0),Object(m.f)("网络故障","error");case 13:a.sForm.type="edit",t.next=68;break;case 17:if("add"!=a.sForm.type){t.next=38;break}if(delete a.sForm.type,!("menu_id"in a.sForm)){t.next=33;break}return t.prev=20,t.next=23,Object(c._9)(a.sForm);case 23:r=t.sent,t.next=30;break;case 26:t.prev=26,t.t1=t.catch(20),console.log(t.t1),Object(m.f)("网络故障","error");case 30:t.next=34;break;case 33:Object(m.f)("请选择类别","error");case 34:a.sForm.type="add",t.next=68;break;case 38:if("del"!=a.sForm.type){t.next=54;break}return delete a.sForm.type,t.prev=40,t.next=43,Object(c.scoreCheck)(a.sForm);case 43:r=t.sent,t.next=50;break;case 46:t.prev=46,t.t2=t.catch(40),console.log(t.t2),Object(m.f)("网络故障","error");case 50:a.sForm.type="del",t.next=68;break;case 54:if("Rec"!=a.sForm.type){t.next=68;break}return delete a.sForm.type,t.prev=56,t.next=59,Object(c.D)(a.sForm);case 59:r=t.sent,t.next=66;break;case 62:t.prev=62,t.t3=t.catch(56),console.log(t.t3),Object(m.f)("网络故障","error");case 66:a.sForm.type="Rec";case 68:r&&"success"==Object(m.g)(r)&&(a.dialogFormVisible=!1,a.initMainData());case 71:case"end":return t.stop()}},t,e,[[3,9],[20,26],[40,46],[56,62]])}))()},imgchange:function(e,t,a){return Object(m.e)(this,e,t,a)}}},h={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-container",[a("el-header",[a("div",[a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"支付方ID",clearable:""},on:{blur:function(t){t.target._value?e.searchItem.pay_user=t.target._value:delete e.searchItem.pay_user,e.initMainData()}},model:{value:e.searchForm.pay_user,callback:function(t){e.$set(e.searchForm,"pay_user",t)},expression:"searchForm.pay_user"}}),e._v(" "),a("el-input",{staticStyle:{width:"200px"},attrs:{placeholder:"收款方ID",clearable:""},on:{blur:function(t){t.target._value?e.searchItem.charge_user=t.target._value:delete e.searchItem.charge_user,e.initMainData()}},model:{value:e.searchForm.charge_user,callback:function(t){e.$set(e.searchForm,"charge_user",t)},expression:"searchForm.charge_user"}}),e._v(" "),a("el-select",{attrs:{placeholder:"请选择是否核销",clearable:""},on:{change:function(t){t?e.searchItem.ischeck=t:delete e.searchItem.ischeck,e.initMainData()}},model:{value:e.searchForm.ischeck,callback:function(t){e.$set(e.searchForm,"ischeck",t)},expression:"searchForm.ischeck"}},[a("el-option",{attrs:{label:"是",value:"true"}}),e._v(" "),a("el-option",{attrs:{label:"否",value:"false"}})],1),e._v(" "),a("el-select",{attrs:{placeholder:"请选择变动类型",clearable:""},on:{change:function(t){t?e.searchItem.order_type=t:delete e.searchItem.order_type,e.initMainData()}},model:{value:e.searchForm.order_type,callback:function(t){e.$set(e.searchForm,"order_type",t)},expression:"searchForm.order_type"}},[a("el-option",{attrs:{label:"system",value:"system"}}),e._v(" "),a("el-option",{attrs:{label:"consume",value:"consume"}})],1)],1)]),e._v(" "),a("el-main",{staticStyle:{height:"600px",border:"2px solid #eee"}},[a("div",[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.tableData}},[a("el-table-column",{attrs:{label:"流水ID",prop:"id"}}),e._v(" "),a("el-table-column",{attrs:{label:"支付方ID",prop:"pay_user"}}),e._v(" "),a("el-table-column",{attrs:{label:"支付方名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(0!=t.row.pay_user&&t.row.puser?t.row.puser.username:"平台")+"\n            ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"收款方ID",prop:"charge_user"}}),e._v(" "),a("el-table-column",{attrs:{label:"收款方名称"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s(0!=t.row.charge_user&&t.row.cuser?t.row.cuser.username:"平台")+"\n            ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"积分数量",prop:"scoreAmount"}}),e._v(" "),a("el-table-column",{attrs:{label:"变动类型",prop:"order_type"}}),e._v(" "),a("el-table-column",{attrs:{label:"变动说明",prop:"trade_info"}}),e._v(" "),a("el-table-column",{attrs:{label:"是否核销"},scopedSlots:e._u([{key:"default",fn:function(t){return[e._v("\n              "+e._s("true"==t.row.ischeck?"已核销":"未核销")+"\n            ")]}}])}),e._v(" "),a("el-table-column",{attrs:{label:"创建时间",prop:"create_time"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{size:"small"},on:{click:function(a){e.handleDel(t.row)}}},[e._v("核销")])]}}])})],1)],1),e._v(" "),a("el-dialog",{attrs:{title:"文章信息",visible:e.dialogFormVisible},on:{"update:visible":function(t){e.dialogFormVisible=t}}},[a("el-form",{attrs:{autocomplete:"off"}},["main"==e.dialogType?a("div",[a("el-form-item",{attrs:{label:"主标题","label-width":e.formLabelWidth}},[a("el-input",{on:{input:function(t){e.sForm.title=arguments[0]}},model:{value:e.Form.title,callback:function(t){e.$set(e.Form,"title",t)},expression:"Form.title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"副标题","label-width":e.formLabelWidth}},[a("el-input",{on:{input:function(t){e.sForm.small_title=arguments[0]}},model:{value:e.Form.small_title,callback:function(t){e.$set(e.Form,"small_title",t)},expression:"Form.small_title"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"排序","label-width":e.formLabelWidth}},[a("el-input",{attrs:{"auto-complete":"off"},on:{input:function(t){e.sForm.listorder=arguments[0]}},model:{value:e.Form.listorder,callback:function(t){e.$set(e.Form,"listorder",t)},expression:"Form.listorder"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"所属菜单","label-width":e.formLabelWidth}},[a("el-cascader",{attrs:{options:e.menudata,props:e.defaultProps,"change-on-select":"",clearable:""},on:{change:function(t){e.sForm.menu_id=t[t.length-1]}},model:{value:e.Form.menu_array,callback:function(t){e.$set(e.Form,"menu_array",t)},expression:"Form.menu_array"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"描述","label-width":e.formLabelWidth}},[a("el-input",{on:{input:function(t){e.sForm.description=arguments[0]}},model:{value:e.Form.description,callback:function(t){e.$set(e.Form,"description",t)},expression:"Form.description"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"关键词","label-width":e.formLabelWidth}},[a("el-input",{on:{input:function(t){e.sForm.keywords=arguments[0]}},model:{value:e.Form.keywords,callback:function(t){e.$set(e.Form,"keywords",t)},expression:"Form.keywords"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"内容电话（特有）","label-width":e.formLabelWidth}},[a("el-input",{on:{input:function(t){e.sForm.contactPhone=arguments[0]}},model:{value:e.Form.contactPhone,callback:function(t){e.$set(e.Form,"contactPhone",t)},expression:"Form.contactPhone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"封面图片上传"}},[a("imgup",{attrs:{imglist:e.Form.img,imglimit:e.imglimit},on:{imgchange:function(t){e.imgchange(t,"sForm","img")}}})],1),e._v(" "),a("el-form-item",{attrs:{label:"内容多图上传"}},[a("imgup",{attrs:{imglist:e.Form.bannerImg,imglimit:e.imglimit},on:{imgchange:function(t){e.imgchange(t,"sForm","bannerImg")}}})],1),e._v(" "),a("el-form-item",{attrs:{label:"图文编辑"}},[a("editor",{attrs:{defaultcontent:e.Form.content},on:{contentsave:function(t){e.sForm.content=t,e.Form.content=t}}})],1)],1):e._e(),e._v(" "),"copy"==e.dialogType?a("div",[a("el-form-item",{attrs:{label:"菜单名称","label-width":e.formLabelWidth}},[a("el-cascader",{attrs:{options:e.menudata,props:e.defaultProps,"change-on-select":"",clearable:""},on:{change:function(t){e.sForm.menu_id=t[t.length-1]}},model:{value:e.Form.menu_array,callback:function(t){e.$set(e.Form,"menu_array",t)},expression:"Form.menu_array"}})],1)],1):e._e(),e._v(" "),"rec"==e.dialogType?a("div",[a("el-form-item",{attrs:{label:"名称","label-width":e.formLabelWidth}},[a("el-input",{on:{input:function(t){e.sForm.name=arguments[0]}},model:{value:e.Form.name,callback:function(t){e.$set(e.Form,"name",t)},expression:"Form.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"描述","label-width":e.formLabelWidth}},[a("el-input",{on:{input:function(t){e.sForm.description=arguments[0]}},model:{value:e.Form.description,callback:function(t){e.$set(e.Form,"description",t)},expression:"Form.description"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"主图片上传"}},[a("imgup",{attrs:{imglist:e.Form.mainImg,imglimit:e.imglimit},on:{imgchange:e.imgchange}})],1),e._v(" "),a("el-form-item",{attrs:{label:"推送推荐位名称","label-width":e.formLabelWidth}},[a("el-cascader",{attrs:{options:e.themeData,props:e.defaultProps,"change-on-select":"",clearable:""},on:{change:function(t){e.sForm.theme_id=t[t.length-1]}},model:{value:e.Form.theme_array,callback:function(t){e.$set(e.Form,"theme_array",t)},expression:"Form.theme_array"}})],1)],1):e._e(),e._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(t){e.onSubmit()}}},[e._v("确 定")])],1)],1)],1),e._v(" "),a("el-footer",{staticStyle:{"margin-top":"20px"}},[a("div",[a("el-pagination",{attrs:{"current-page":e.paginate.currentPage,"page-sizes":[10,50,70,100],"page-size":e.paginate.pagesize,layout:"total, sizes, prev, pager, next, jumper",total:e.paginate.count},on:{"size-change":function(t){e.paginate.pagesize=t,e.initMainData()},"current-change":function(t){e.paginate.currentPage=t,e.initMainData()}}})],1)])],1)],1)},staticRenderFns:[]},b=a("VU/8")(p,h,!1,null,null,null);t.default=b.exports}});
//# sourceMappingURL=15.0f6ab7f885d2f5884e5a.js.map