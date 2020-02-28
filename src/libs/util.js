import axios from 'axios';
import config from '../config/config';
import CryptoJS  from 'crypto-js'
import {
  iview
} from 'iview';
import {
  formatDate,
  parseDate
} from './date';
import _ from 'lodash';

// 引入--访问前缀--组件
import globlURLPrefix from "./globlURLPrefix";

//自定义组件
// import uploadFile from '../components/common/uploadFile.vue';
 import modalHeader from '../components/common/modalHeader.vue';
// import loadBtn from '../components/common/loadBtn.vue';
// import remove from '../components/common/remove.vue';
// import operate from '../components/common/operate.vue';
// import layoutTree from '../components/common/layoutTree.vue';
// import leftTree from '../components/common/leftTree.vue';
// import selectUser from '../components/common/selectUser.vue';
// import dateGroup from '../components/common/dateGroup.vue';
// import searchSelect from '../components/common/searchSelect.vue';
// import selectOption from '../components/common/selectOption.vue';
// import major from '../components/common/major/major.vue';
// import dictionarySelect from '../components/common/dictionarySelect.vue';
// import xlsx from '../components/common/vue-xlsx-table.vue';
// import derive from '../components/common/derive.vue';
// import abTableSearch from '../components/common/layout/ab_table_search';
// import searchForm from '../components/common/searchForm/elform'
// import searchFormTable from '../components/common/searchFormTable/searchFormTable/main'
// import studentOption from '../components/common/studentSourceOption';

let ajaxconfig = config.ajaxconfig;
let util = {};

//添加一个请求拦截器
const myInterceptor = axios.interceptors.request.use(function (config) {
  //在请求发送之前做一些事
  return config;
}, function (error) {
  //当出现请求错误是做一些事
  return Promise.reject(error);
});

var instance = axios.create(ajaxconfig);
// axios.defaults.headers.post['Content-Type'] = 'application/json';

//设置UI组件
util.iview = iview;
//设置默认分页参数
util.pageInitPrams = config.pageInitPrams;

//请求列表数据
/* axios 请求方式
 axios.request(config)

 axios.get(url[, config])

 axios.delete(url[, config])

 axios.head(url[, config])

 axios.post(url[, data[, config]])

 axios.put(url[, data[, config]])

 axios.patch(url[, data[, config]])
 */
let queCount = 0;
const kAppKey = 'AmBuf_product'; //url签名 固定死的

util.queryData = function (options) {
  //必须基本设置请求参数
  let url = options.url || '';
  let method = options.method || ajaxconfig.method; //"get" "post"  "put" ，默认请求get

  let isParseStringJSON = options['jsonString'];

  //扩展基本配置项
  let myConfig = options.baseConfing || {}; //{}

  let config = _.defaultsDeep({}, myConfig);
  config.method = method;
  var timeStamp = new Date().getTime(); // 时间戳
  //获取服务端数据
  if (method == 'post' || method == 'put' || method == 'patch') {

    //POST提交数据时必选参数
    let potsData = options.data || {}; //{firstName: 'Fred',lastName: 'FlintStone'}
    potsData.timeStamp = timeStamp

    if (_.isObject(potsData)) {
      if (typeof isParseStringJSON != 'undefined') {
        util.setAjaxQuestHeader('Content-Type', 'application/json');
        let signJsonStr = "&timeStamp="+timeStamp;
        let sign =  util.paramsStrSort(signJsonStr,url);
        potsData.sign = sign
        potsData = JSON.stringify(potsData);
      } else {
        util.setAjaxQuestHeader('Content-Type', 'application/x-www-form-urlencoded');
        potsData = util.serializeParams(potsData);
        potsData = potsData + '&sign=' + util.paramsStrSort(potsData,url);
      }
    }
    return instance[method].bind(instance, url, potsData, config);
  } else {
    //GET提交数据时必选参数
    let myParams = options.params || {}; //{params: {ID: 12345}} || '/user?ID=12345'
    if( options.url.indexOf('?') > -1){
      myParams = options.url.substring(options.url.indexOf('?')+1)
      url=url.substring(0,url.indexOf('?'))
    }
    if(typeof myParams =='string'){
      myParams = myParams+ "&timeStamp=" + timeStamp;
      myParams =  util.serializeParams(myParams,'JSON')
    }else {
      myParams.timeStamp = timeStamp
    }
    myParams = Object.assign({}, myParams, {
      // mathRand: Math.random() * 100000000000000000,
      sign: util.paramsStrSort(util.serializeParams(myParams),url) //url签名
    });
    config.params = myParams;

    return instance[method].bind(instance, url, config);
  }
};
util.formatParam = function(paramsStr){
  let newStr = '';
  if(paramsStr.length > 0 && paramsStr.substring(0,1)!="&"){
    paramsStr= '&'+paramsStr
  }
  let splitStr= paramsStr.split("&")
  for (let i =0; i<splitStr.length;i++){
    let t = splitStr[i].split("=");
      if (t.length > 1 && t[1] !='') {
        newStr += '&' + t[0]+'='+ t[1]
    }
  }
  if(newStr.length > 1){
    newStr = newStr.substring(1)
  }
  return newStr
}

util.paramsStrSort= function(paramsStr,urls) {
  let token = util.getCookie('Token')
  if(!token){
    token = ''
  }
  if(urls.indexOf('?') > -1){
    urls = urls.substring(0,urls.indexOf('?'))
  }
  paramsStr = util.formatParam(paramsStr)
  var url = paramsStr + "&token="+ token;
  var orderParamsStr = url.split("&").sort().join("&");
  var newUrl ='/api' + urls + orderParamsStr+"&appKey=" + kAppKey;
  return CryptoJS.MD5(newUrl).toString();
}

util.ajaxconfig = ajaxconfig;
util.axios = axios;

//转换数据格式   应用场景:当后台数据格式发生变化时可
util.foramteData = function (options) {
  let type = options.type || 'list';
  let data = options.data;
  switch (type) {
    case 'list':
      break;
    case 'user':
      break;
    case 'leftmenus':
      break;
    default:

  }
  return data;
};

//通过开始和结束时间计算周期单位为周或者月
util.calculationCycle = function (start, end, ts) {
  let startStamp = new Date(start).getTime()
  let endStamp = new Date(end).getTime()
  let timeDifference = (endStamp - startStamp) / (1000 * 60 * 60 * 24) + 1 //时间差
  let calculation = Math.round(timeDifference / 7);
  return calculation != ts ? '月' : "周"
};
// 轮转时间
// util.RotationTime = function(options={tartTime:''}){

//   let startTime = options.startTime && (typeof options.startTime === 'string' ?
//   this.parseDate(options.startTime, 'yyyy-MM-dd').getTime() : options.startTime.getTime()) ;
//   let rtm = this.$store.state.envPath;
//   let currentTime = time.getTime();
//   let currentDate = time.getDate() //保存当前时间
//   let rtmHalfMonthStartDate = +rtm.businessInfoConfig.rtmHalfMonthStartDate - 1; //11
//   var rtmWholeMonthStartDate;
//   rtmWholeMonthStartDate = +rtm.businessInfoConfig.rtmWholeMonthStartDate;
//   if (rtmWholeMonthStartDate == 1) {
//     rtmWholeMonthStartDate = new Date(time.setMonth(time.getMonth() + 1, 0)).getDate() //改变时间,获取最后一天
//   } else {
//     rtmWholeMonthStartDate = +rtm.businessInfoConfig.rtmWholeMonthStartDate - 1; //1
//   }
//   return startTime ? (currentTime < startTime || currentDate !== rtmHalfMonthStartDate &&
//     currentDate !== rtmWholeMonthStartDate) : (currentDate !== rtmHalfMonthStartDate && currentDate !==
//     rtmWholeMonthStartDate)
// }

// disabledDate: (time) => {
//   let startTime = this.formValidate.rotaryEndTime && (typeof this.formValidate.rotaryEndTime === 'string' ?
//     this.parseDate(this.formValidate.rotaryEndTime, 'yyyy-MM-dd').getTime() : this.formValidate.rotaryEndTime
//     .getTime());
//   let rtm = this.$store.state.envPath;
//   let currentTime = time.getTime();
//   let currentDate = time.getDate() //保存当前时间
//   let rtmHalfMonthStartDate = +rtm.businessInfoConfig.rtmHalfMonthStartDate - 1; //11
//   var rtmWholeMonthStartDate;
//   rtmWholeMonthStartDate = +rtm.businessInfoConfig.rtmWholeMonthStartDate;
//   if (rtmWholeMonthStartDate == 1) {
//     rtmWholeMonthStartDate = new Date(time.setMonth(time.getMonth() + 1, 0)).getDate() //改变时间,获取最后一天
//   } else {
//     rtmWholeMonthStartDate = +rtm.businessInfoConfig.rtmWholeMonthStartDate - 1; //1
//   }
//   return startTime ? (currentTime < startTime || currentDate !== rtmHalfMonthStartDate &&
//     currentDate !== rtmWholeMonthStartDate) : (currentDate !== rtmHalfMonthStartDate && currentDate !==
//     rtmWholeMonthStartDate)
// },
//ajax请求的错误信息处理
util.handleAjaxError = function ($vue, status, mess) {
  let flag = false;
  switch (status) {
    case '1':
      flag = true;
      $vue.errorMess(mess + '!');
      break;
    case '2':
      flag = true;
      $vue.errorMess(mess + '!');
      break;
    case '17':
      flag = true;
      $vue.errorMess(mess + '!');
      break;
    case '19':
      flag = true;
      $vue.errorMess(mess + '!');
      break;
    case '38':
      flag = true;
      $vue.errorMess('所有时间段的课程类别必须全部设置!');
      break;

    case '-1':
      flag = true;
      $vue.errorMess(mess + '!');
      // $vue.$store.commit('setIndexUrl', '');
      $vue.$router.push('/setCode');
      break;
    case '4':
      //token验证失败
      flag = true;
      if (util.isLegalToken()) {
        $vue.errorMess('登录超时!');
      } else {
        $vue.errorMess('非法登录!');
      }
      $vue.$cookie.delete('Token');
      $vue.$store.commit('setIndexUrl', '');
      $vue.$router.push('/login');
      break;

    case '404':
      flag = true;
      $vue.errorMess('未找到页面');
      break;
    case '500':
      flag = true;
      $vue.errorMess('服务器异常');
      break;
    case '504':
      flag = true;
      $vue.errorMess('服务器网络异常(网关超时）!');
      break;
    case '11006':
      flag = false;
      //      $vue.errorMess(mess + '!');
      break;
    default:
      if (mess != '') {
        flag = true;
        $vue.errorMess(mess + '!');
      }
  }
  return flag;
};

//跳转登录页面
// util.gotoLoginPage = function (router) {
//   //location.href= location.hostname+"/index";
// };

//反格式化日期
util.deformatterDate = function (d) {
  return new Date(d).getTime() - 1000 * 60 * 60 * 24;
};

//添加监听事件
util.events = {
  addHandler: function (oElement, sEvent, fnHandler) {
    oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : oElement.attachEvent('on' + sEvent, fnHandler);
  },
  removeHandler: function (oElement, sEvent, fnHandler) {
    oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent('on' + sEvent, fnHandler);
  }
};

//检测元素是否存在该事件
util.detectEventSupport = function (eventName) {
  var tempElement = document.createElement('div'),
    isSupported;
  eventName = 'on' + eventName;
  isSupported = (eventName in tempElement); // 使用第一种方式
  // 如果第一种方式行不通，那就来看看它是不是已知事件类型
  if (!isSupported) {
    tempElement.setAttribute(eventName, 'xxx');
    isSupported = typeof tempElement[eventName] === 'function';
  }
  // 清除掉动态创建的元素，以便内存回收
  tempElement = null;
  // 返回检测结果
  return isSupported;
};

util._ = _;

//JSON序列化传入参数形式
util.serializeParams = function (params, type) {
  if (!params)return;
  let obj = {};
  if (type == 'JSON') {
    if (!_.isString(params)) return;
    if (params.indexOf('&') > -1) {
      let splits = params.split('&');
      splits.forEach(function (v, k) {
        let key = v.split('=')[0] || k;
        let val = v.split('=')[1] || undefined;
        obj[key] = val;
      });
      return obj;
    }
  } else {
    if (!_.isObject(params)) {
      if (!_.isObject(JSON.parse(params))) {
        return;
      } else {
        params = JSON.parse(params);
        console.log('params',params)

      }
    }
    obj = [];
    _.forEach(params, function (v, k) {
      v = !v ? '' : v;
      let val = k + '=' + v;
      obj.push(val);
    });
    return obj.join('&');
  }
};

//判断object 是否为空
util.isEmptyObject = function (e) {
  var t;
  for (t in e) return !1;
  return !0;
};

//消息提示
let success = util.success = function (mes) {
  this.$message({
    message: mes,
    type: 'success'
  });
};
let error = util.error = function (mes) {
  this.$message.error(mes);
};
let info = util.info = function (mes) {
  this.$message(mes);
};

//存取cookie方法
util.setCookie = function (name, value, days) {
    this.$cookie.set(name, value, days);
  },

  /*util.getCookie= function (name,ckObj) {
    if(typeof ckObj!="undefined"){
      ckObj.get(name);
    }else{
      this.$cookie.get(name);
    }
  },*/

  util.deleteCookie = function (name) {
    this.$cookie.delete(name);
  };

//请求前改变请求头源参数
util.setAjaxQuestHeader = function (key, v) {
  ajaxconfig['headers'][key] = v;
  instance = axios.create(ajaxconfig);
};

//登录后存储cookie: token
util.setAjaxPostToken = function () {
  let token = '';
  if (util.getCookie('Token')) {
    token = util.getCookie('Token');
  }
  util.setAjaxQuestHeader('Token', token);
  instance = axios.create(ajaxconfig);
};

//获取浏览器中原始的cookie
util.getCookie = function (name) {
  var arr, reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
};

//验证token是否合法
util.isLegalToken = function () {
  let flag = false;
  if (ajaxconfig['headers']['Token'] != '') {
    flag = true;
  }
  return flag;
};

//验证是否登录
util.isLogin = function () {
  return util.getCookie('Token');
};

util.loginOut = function ($vue, goTo = '/login') {
  if ($vue.$cookie.get('Token') == null) {
    $vue.$router.push(goTo);
    return;
  }
  $vue.$cookie.delete('Token');

  let loginOutTitle = {
    ajaxSuccess: () => {
      $vue.successMess('退出成功!');
      $vue.$store.commit('setToken');
      $vue.$router.push(goTo);
    },
    ajaxParams: {
      url: globlURLPrefix.passport + '/logout',
      method: 'delete'
    }
  };

  $vue.ajax(loginOutTitle);
};

/**
 * [getFormData 处理提交数据 对象合并]
 * @param  {...Object} objs [需合并的对象，（单个或多个对象）]
 * @return {Object}         [去重合并之后的对象]
 */
util.getFormData = function (...objs) {
  return _.defaultsDeep({}, ...objs);
};

/**
 * 存储localStorage
 */
util.setLocalStorage = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
};

/**
 * 获取localStorage
 */
util.getLocalStorage = name => {
  if (!name) return;
  let val = window.localStorage.getItem(name);
  return val ? JSON.parse(val) : val;
};

/**
 * 删除localStorage
 */
util.removeLocalStorage = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
};

//传输加密
util.encrypt = (word, keyStr)=>{
  keyStr = keyStr ? keyStr : 'AmBuf01062011627';
  var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
  var srcs = CryptoJS.enc.Utf8.parse(word);
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  // return encrypted.toString();
  return encrypted.ciphertext.toString().toUpperCase();
};
//传输解密 HEX 16进制
util.decrypt= (word, keyStr)=>{
  keyStr = keyStr ? keyStr : 'AmBuf01062011627';
  let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
  var key  = CryptoJS.enc.Utf8.parse(keyStr);//
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  var decrypt = CryptoJS.AES.decrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
};

//传输解密Base64
util.decrypt64= (word, keyStr)=>{
  keyStr = keyStr ? keyStr : 'AmBuf01062011627';
  var key  = CryptoJS.enc.Utf8.parse(keyStr);//Latin1 w8m31+Yy/Nw6thPsMpO5fg==
  var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
};

export default {
  install(Vue) {
    Vue.prototype.$util = util;
    //导入所有接口前缀
    // Vue.prototype.$globlURLPrefix = globlURLPrefix;
    Vue.mixin({
      data() {

        return {
          //时间
          starTimes: '', // 开始时间
          starTimesEnd: '', // 开始时间终止日期
          endTimes: '', // 结束时间
          endTimesEnd: '', // 结束时间终止日期
          pickerOptions0: {
            //选择开始时间后设置结束日期的限制
            disabledDate: (time) => {

              let end = this.endTimes ? time.getTime() >= this.endTimes : false;
              end = this.endTimesEnd ? end || time.getTime() <= this.endTimesEnd : end;
              let start = this.starTimes ? time.getTime() <= this.starTimes : false;
              start = this.starTimesEnd ? start || time.getTime() >= this.starTimesEnd : start;
              return (this.endTimesEnd ? start : false) || end;
            }
          },
          pickerOptions1: {
            //选择结束时间后设置开始日期的限制
            disabledDate: (time) => {

              let end = this.starTimes ? time.getTime() <= this.starTimes : false;
              end = this.starTimesEnd ? end || time.getTime() >= this.starTimesEnd : end;
              let start = this.endTimes ? time.getTime() >= this.endTimes : false;
              start = this.endTimesEnd ? start || time.getTime() <= this.endTimesEnd : start;
              return (this.starTimesEnd ? start : false) || end;
            }
          },
          zyy: true,
          sxs: true,
          bks: true,
          jxs: true,
          yjs: true,
          skillCentre: true,
          value1: '',
          value2: '',
          myPages: '',
          //弹窗
          addModal: false, //添加模态窗体
          editModal: false, //修改模态窗体
          showModal: false, //显示模态窗体
          removeModal: false, //删除模态窗体
          auditModal: false, //审核模态窗体
          allotPersonModal: false, //分配人员
          allotJurisdictionModal: false, //分配权限
          isShowMoreSearch: false, // 是否显示高级查询项
          selectUserModal: false, //选择人员
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          //tree
          filterText: '',
          //总页数
          listTotal: 0
        };
      },
      methods: {
        //显示更多查询项
        showMoreSearch() {
          this.isShowMoreSearch = !this.isShowMoreSearch;
          setTimeout(() => {
            this.setTableDynHeight();
          }, 0);
        },
        //时间
        deformatterDate(d) {
          return new Date(d).getTime() - 1000 * 60 * 60 * 24;
        },
        handleStartTime(d) {
          this.starTimes = this.deformatterDate(d);
        },
        handleEndTime(d) {
          this.endTimes = this.deformatterDate(d);
        },
        initStartEndTime(end, start) {
          this.endTimesEnd = end && this.deformatterDate(end) || '';
          this.starTimesEnd = start && (new Date(start).getTime()) || '';
        },
        //改变页码
        changePageSize(n) {
          let pageSize = this.queryQptions.params && (this.queryQptions.params.pageSize = n) || (this.queryQptions.pageSize = n);
          pageSize = n;
          this.setTableData();
        },
        changePage(n) {
          // 这里直接更改了模拟的数据，真实使用场景应该从服务端获取数据
          let curPage = (this.queryQptions.params && (this.queryQptions.params.curPage = n) || (this.queryQptions.curPage = n));
          this.setTableData();
        },
        successMess: success,
        errorMess: error,
        showMess: info,
        //列表页添加序号 arr=>arr  依赖:页数,页条数
        addIndex(data) {
          let arr = [];
          for (let i = 0, length = data.length; i < length; i++) {
            data[i].index = ((this.queryQptions.curPage || this.queryQptions.params.curPage) - 1) * (this.queryQptions.pageSize || this.queryQptions.params.pageSize) + i + 1;
            arr.push(data[i]);
          }
          return arr;
        },

        /*ajax(Promise)函数*/
        //通过传递发送的url信息和data，调用封装的axios （需要接受什么参数，请查看util.queryData方法）返回promise
        Promise(options) {
          let that = this;
          let myPromise = this.$util.queryData(options)();
          return myPromise;
        },

        /*ajax成功的消息,默认成功事件（ajaxSuccess）（可自定义成功事件） (obj,obj,fun)=>false
         *@param responseData obj|array  当前行索引
         *@param messTitle     obj       传到ajax函数的数据（自定义数据）
         *@param [isLoadingFun]  function  如果是 自定义按钮组件 点击提交事件 则会传回操作按钮是否显示loading函数,已在conductSuccess函数处理，可做扩展用
         */
        ajaxSuccess(responseData, messTitle, isLoadingFun) {
          this.$emit(messTitle.type, messTitle.type, messTitle.successTitle);
        },
        /*判断返回数据是否成功  obj=>boolean
         * @param response     obj      成功返回的信息，包含data，status
         * */

        verifyAjaxResponse(response) {
          let flag = false;
          let responseData = response.data;
          if (this.$util._.isObject(responseData['status']) && responseData['status']['code'] == 0) {
            flag = true;
          }
          return flag;
        },

        /*对传入ajax成功函数进行处理 (obj,fun)=>fun
         * @param messTitle     obj       传到ajax函数的数据（自定义数据）
         * @param isLoadingFun  function  如果是 自定义按钮组件 点击提交事件 则会传回操作按钮是否显示loading函数（true取消loading）
         * */
        conductSuccess(messTitle, ajaxLoading, isLoadingFun) {
          if (!isLoadingFun) isLoadingFun = function () {};
          let ajaxSuccess = messTitle['ajaxSuccess'] || 'ajaxSuccess';
          let error = messTitle['error'];
          let ajaxCall = messTitle['ajaxCall'] || false;
          let errorTitle = messTitle.errorTitle || '数据请求异常!';
          if (messTitle['allowError'] === undefined) {
            messTitle['allowError'] = true;
          }
          return (res) => {
            if (ajaxCall) { // ajaxCall拦截自定义的ajax处理
              if (ajaxLoading) {
                queCount--;
                if (!queCount) {
                  this.ajaxCreateLoading(false);
                }
              }
              if (typeof ajaxCall == 'function') {
                isLoadingFun(false);
                ajaxCall(res.data);
              } else {
                this[ajaxCall].call(this, res.data, messTitle, isLoadingFun);
              }
              return;
            }
            let isSuccess = this.verifyAjaxResponse(res);
            let responseData = res.data;
            if (isSuccess) {
              if (typeof ajaxSuccess == 'function') {
                ajaxSuccess(res.data);
              } else {
                this[ajaxSuccess].call(this, responseData, messTitle, isLoadingFun);
              }
            } else {
              let flag = messTitle['allowError'] ? util.handleAjaxError(this, responseData['status']['code'], responseData['status']['msg']) : messTitle['allowError'];
              if (!flag) {
                if (error) {
                  if (typeof error == 'function') {
                    error(responseData, ajaxLoading, isLoadingFun);
                  } else {
                    this[error].call(this, responseData, messTitle, isLoadingFun);
                  }
                } else {
                  this.errorMess(errorTitle);
                }
              }
            }

            isLoadingFun(false);
            if (ajaxLoading) {
              queCount--;
              if (!queCount) {
                this.ajaxCreateLoading(false);
              }
            }
          };
        },

        /*ajax失败的消息（发送的信息有误）,默认失败事件（ajaxError）fun=>fun
         *
         * */
        ajaxError(res, ajaxLoading, isLoadingFun) {
          if (!isLoadingFun) isLoadingFun = function () {};
          return (error) => {
            if (error.response) {
              isLoadingFun(false);
              if (ajaxLoading) {
                queCount--;
                if (!queCount) {
                  this.ajaxCreateLoading(false);
                }
              }
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              util.handleAjaxError(this, error.response.status + '');

              // console.log(error.response.status);
              // console.log(error.response.headers);
            } else if (error.request) {
              isLoadingFun(false);
              if (ajaxLoading) {
                queCount--;
                if (!queCount) {
                  this.ajaxCreateLoading(false);
                }
              }
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              //this.errorMess(error.request);
              console.error(error.request);
            } else {
              isLoadingFun(false);
              if (ajaxLoading) {
                queCount--;
                if (!queCount) {
                  this.ajaxCreateLoading(false);
                }
              }
              console.error(error);
            }
          };
        },

        /*核心ajax处理事件 (fun,fun)=>obj
         * @params params obj    自定义数据包含一些自定义信息 如{paramsData:'listUrl',ajaxSuccess:'updateListData',ajaxParams:{url:globlURLPrefix.passport + '/role/list?name=&identify=&type=',}}
         *  @param isLoadingFun  function  如果是 自定义按钮组件 点击提交事件 则会传回操作按钮是否显示loading函数（true取消loading）
         * */
        ajax(params, isLoadingFun) {
          params = this.getParams(params);
          if (params.ajaxLoading) {
            if (queCount == 0) {
              this.ajaxCreateLoading(true);
            }
            queCount++;
          }

          let {
            ajaxParams,
            messTitle,
            ajaxError,
            ajaxLoading
          } = params;
          let that = this;
          let myPromise = that.Promise(ajaxParams)
          .then(that.conductSuccess(messTitle, ajaxLoading, isLoadingFun))
          .catch(ajaxError({}, ajaxLoading, isLoadingFun));
          return myPromise;
        },

        //处理将要发送的ajax数据和可变数据
        getParams(messTitle) {
          return {
            allowError: messTitle.allowError !== undefined ? messTitle.allowError : false, // 是否允许错误（调用页面处理）（默认不允许）
            ajaxLoading: messTitle.ajaxLoading !== undefined ? messTitle.ajaxLoading : true, // 是否显示ajax加载动画
            ajaxParams: messTitle.ajaxParams,
            messTitle: messTitle,
            ajaxError: messTitle.ajaxError && this[messTitle.ajaxError] || this.ajaxError || (() => {}),
            ajaxCall: messTitle.ajaxCall !== undefined ? messTitle.ajaxCall : false // 拦截ajax的请求后的回调进行自己处理
          };
        },

        //为ajax异步请求加载添加loading
        ajaxCreateLoading(flag) {
          this.$store.dispatch('onLoading', flag);
          if (flag) {
            this.$Loading.start();
          } else {
            this.$Loading.finish();
          }
        },

        /*
         * 对表单数据的时间进行转换
         * @params  data    obj|array  需要转换的数据源
         * @parans fn        fun||string  操作的方法或字符串模板，yyyy-mm
         * @parans targer   array  需要操作的对象的名
         * */
        formDate(data, targer, fn) {
          let length = targer.length;
          let that = this;
          let isObject = this.valDataType(data, 'Object');
          if (isObject) {
            for (let i = 0; i < length; i++) {
              if (typeof fn == 'string') {
                data[targer[i]] = this.conductDate(data[targer[i]], fn);
              } else {
                fn = fn || this.yearMonthData || function () {};
                data[targer[i]] = fn(data[targer[i]]);
              }
            }
            return data;
          }
          this.$util._.forEach(data, function (value) {
            for (let i = 0; i < length; i++) {
              if (typeof fn == 'string') {
                value[targer[i]] = that.conductDate(value[targer[i]], fn);
              } else {
                fn = fn || that.yearMonthData || function () {};
                value[targer[i]] = fn(value[targer[i]]);
              }
            }
          });
          return data;
        },

        /*
         * 将字符串时间转换为时间戳
         * @param date  {String}  例如:201-08-01
         * */
        parseTimestamp(date) {
          let timestamp;
          if (navigator.userAgent.indexOf('Firefox') > 0) { //解决火狐兼容性问题
            date && (date = date + 'T09:00:00');
            timestamp = date ? Date.parse(date) : new Date().getTime();
          } else {
            timestamp = date ? new Date(date).getTime() : new Date().getTime();
          }
          return timestamp;
        },

        /*//如果传过来的为字符串模板，则使用此函数处理
         * @params    date    obj||string
         * @params    format    string        yyyy-MM-dd HH:mm:ss.SSS
         *
         *
         * */
        parseDate(date, format) {

          return parseDate(date, format);
        },
        conductDate(date, format) {

          // if(typeof date =='string'){
          //   date =  parseDate(date,format)
          // }else {
          date = formatDate(date, format);
          // }
          return date;
        },

        /*
         * 对表单数据的时间进行转换
         * @parans date   string|obj  操作的方法
         * @return 199-02-12格式的时间
         * */
        yearMonthData(date) {
          if (typeof date != 'object') return date;

          let datetime = new Date(date);
          let year = datetime.getFullYear();
          let month = datetime.getMonth() + 1;
          let D = date.getDate() + '';
          if (month < 10) {
            month = '0' + month;
          }
          if (D < 10) {
            D = '0' + D;
          }
          return year + '-' + month + '-' + D;
        },

        /*
         * 对表单数据的时间进行转换
         * @parans date   string|obj  操作的方法
         * @return 19902格式的时间
         * */
        yearMonth(date) {
          if (!date) return '';
          if (typeof date != 'object') {
            if (typeof date == 'number') {
              date = date + '';
              let year = date.substring(0, 4);
              let month = date.substring(date.length - 2, date.length);
              date = year + '-' + month;
            } else {
              date = date.split('-');
              date = date[0] + date[1];
            }
            return date;
          } else {
            let datetime = new Date(date);
            let year = datetime.getFullYear();
            let month = datetime.getMonth() + 1;
            if (month < 10) {
              month = '0' + month;
            }
            return +(year + '' + month);
          }
        },

        /*
           * 点击提交按钮 监听是否验证通过
           * @param formName string  form表单v-model数据对象名称
           * @return flag boolean   form表单验证是否通过
        * */
        submitForm (formName) {
          let flag = false;
          this.$refs[formName].validate(valid => {
            if (valid) {
              flag = true;
            }
          });
          return flag;
        },

        /*
         * 列表查询方法
         * @param string 查询from的id
         *        errorTip string 错误提示的内容
         * */
        handleSubmit (name, errorTip) {
          let flag = false;
          this.$refs[name].validate((valid) => {
            if (valid) {
              flag = true;
            } else {
              this.$Message.error(errorTip);
            }
          });
          return flag;
        },
        /*
         * 判断数据类型
         * @param obj  {}||[]  各种数据类型
         * @param type string  例如: Object String Array等数据类型
         * @return flag boolean 是否为要验证的数据类型
         * */
        valDataType(obj, type) {
          let flag = false;
          switch (type) {
            case 'String':
              obj.constructor == String ? flag = true : flag = false;
              break;
            case 'Array':
              obj.constructor == Array ? flag = true : flag = false;
              break;
            case 'Boolean':
              obj.constructor == Boolean ? flag = true : flag = false;
              break;
            case 'Date':
              obj.constructor == Date ? flag = true : flag = false;
              break;
            case 'Object':
              obj.constructor == Object ? flag = true : flag = false;
              break;
            default:
              alert(type + ':不支持的数据类型验证');
              break;
          }
          return flag;
        },

        //从获取的Res中挑选出需要的名值对
        getFormValidate(data, res) {
          let length = arguments.length;
          var arr = Array.prototype.slice.call(arguments, 2);

          if (length < 2) return data;
          var obj = {};
          this.$util._.forEach(data, function (val, key) {
            obj[key] = res[key];
          });

          if (length >= 3) obj = this.getFormValidate.apply(this, [].concat(obj, arr));
          return obj;

        },



        /*
         * 验证对象所有的值是否为空
         * @param obj {}  需要验证的对象
         * @param arr []  需要过滤的值
         * @return boolean
         * */
        objValIsEmpty(obj, arr) {
          let flag = false;
          let count = 0;
          let isObject = this.valDataType(obj, 'Object');
          let len = arr.length;
          if (isObject) {
            for (let i = 0; i < len; i++) {
              if (obj[arr[i]] == '' || typeof obj[arr[i]] == 'undefined') {
                count++;
              }
            }
          }
          if (arr.length == count) {
            flag = true;
          }
          return flag;
        },

        //导入验证
        //  validate = {
        //   no: [{validate: this.require, message: "房间号必填"}, {validate: this.integer, message: "房间号"}],
        //   sex: [{validate: this.require, message: "房间类别必填"}, {validate: this.roomSex, message: "房间性别只能输入男和女"}],
        //   bedNum: [{validate: this.require, message: "床位数必填"}, {validate: this.integer, message: "床位数"}],
        // };
        /**
         * 导入验证
         * @param {Array} data 源数据
         * @param {object} validate 验证规则
         * */
        _Gvalidate: function (data, validate) {

          let errorData = [];
          let flag = false;
          for (let i = 0; i < data.length; i++) {
            let item = data[i]; //一行数据
            let errObj = {
              seq: i,
              errorMsgList: []
            };
            for (let key in validate) { //获取对象的每一项数据
              if (!validate[key]) continue; //没有进行验证则下一项
              let isValid = true; //当前验证是否通过
              for (let l = 0; l < validate[key].length; l++) {
                if (!isValid) break;
                let valid = validate[key][l]; //每一项验证
                valid.validate(item[key], (mes) => {
                  if (mes) {
                    flag = true;
                    isValid = false;
                    errObj.errorMsgList.push(mes);
                  }
                }, valid.message); //进项验证
              }
            }
            if (errObj.errorMsgList != 0) {
              errorData.push(errObj);
            }
          }
          if (flag) {
            return errorData;
          } else {
            return;
          }
        },

        /**
         * 平常js数组验证
         * @param {Array} data 源数据
         * @param {object} validate 验证规则
         * @return {boolean | null}
         * */
        _ArrayValidate: function (data, validate) {
          let flag = false;
          for (let i = 0; i < data.length; i++) {
            if (flag) {
              return false;
            } //验证是否通过 。不通过则返回
            let item = data[i]; //一行数据
            for (let key in validate) { //获取对象的每一项数据
              if (flag) {
                return false;
              } //验证是否通过 。不通过则返回
              if (!validate[key]) continue; //没有进行验证则下一项
              for (let l = 0; l < validate[key].length; l++) {
                if (flag) {
                  return false;
                } //验证是否通过 。不通过则返回
                let valid = validate[key][l]; //每一项验证
                valid.validate(item[key], (mes) => {
                  if (mes) {
                    flag = true;
                    this.errorMess(`第${i + 1}行：${mes}`);
                  }
                }, valid.message); //进项验证
              }
            }
          }
          if (flag) {
            return false;
          } //验证是否通过 。不通过则返回
          return true;
        },

        /**
         * 平常js对象验证
         * @param {object} data 源数据
         * @param {object} validate 验证规则
         * @return {boolean | null}
         * */
        _objValidate: function (data, validate) {
          let flag = false;
          if (flag) {
            return false;
          } //验证是否通过 。不通过则返回
          let item = data; //一行数据
          for (let key in validate) { //获取对象的每一项数据
            if (flag) {
              return false;
            } //验证是否通过 。不通过则返回
            if (!validate[key]) continue; //没有进行验证则下一项
            for (let l = 0; l < validate[key].length; l++) {
              if (flag) {
                return false;
              } //验证是否通过 。不通过则返回
              let valid = validate[key][l]; //每一项验证
              valid.validate(item[key], (mes) => {
                if (mes) {
                  flag = true;
                  this.errorMess(`${mes}`);
                }
              }, valid.message); //进项验证
            }
          }
          if (flag) {
            return false;
          } //验证是否通过 。不通过则返回
          return true;
        },

        /*
         * 将对象的所有值或指定key设置为空
         * @param obj {}  需要设置的对象
         * @param arr []  需要清空的对象中的key值
         * @return obj
         * */
        setObjValEmpty(obj, arr) {
          let isObject = this.valDataType(obj, 'Object');
          if (isObject) {
            if (arr) {
              if (!this.valDataType(obj, 'Array')) return;
              for (var i = 0; i < arr.length; i++) {
                obj[arr[i]] = '';
              }
            } else {
              _.forEach(obj, function (v, key) {
                obj[key] = '';
              });
            }
          }
          return obj;
        },
        // 使用搜索组件时，点击查询函数,当查询对象是formValidate
        searchHandler(){
          this.formOptions.forms.map(item=>{
            if(item.prop){
              this.formValidate[item.prop] = item.value
            }
          })
          this.setTableData();
        },
        // 使用搜索组件时，点击查询函数，当查询对象是searchObj
        searchHandlers(){
          this.formOptions.forms.map(item=>{
            if(item.prop){
              this.searchObj[item.prop] = item.value
            }
          })
          this.setTableData();
        },
        // 使用表格搜索组件时，点击查询函数,如果对查询参数不做处理 用公用方法，如果有处理，在本页面请求
        searchProcedure(){
          let obj = {}
          this.formOptions.forms.map(item=>{
            if(item.prop){
              obj[item.prop] = item.value
            }
          })
          this.$refs.searchForm.fetchHandler(obj)
        },
        // 使用表格搜索组件时，对返回结果不做其他处理，用公用方法，如果有处理，在本页面处理
        getListSuccess(res){
          let data = []
          if(res.data || res.data == []){
            data = res.data
          }else {
            data = []
          }
          this.$refs.searchForm.getListSuccess(data)
        },
        // list页面公共回调函数
        subCallback(target,title,updata){
          this.cancel(target);
          if(title){
            this.successMess(title);
          }
          if(!updata){
            this.$refs.searchForm.fetchHandler();
          }
        },
        /*
      * 打开指定的模态窗体
      * @param options string 当前指定的模态:"add"、"edit"
      * */
        openModel(options) {
          this[options + 'Modal'] = true;
        },
        // 取消
        cancel(targer) {
          this[targer + 'Modal'] = false;
        },
        /*
         * 列表数据只能选择一个
         * @param isOnly true  是否只选择一个
         */
        isSelected(isOnly) {
          let len = this.multipleSelection.length;
          let flag = true;
          if (len == 0) {
            this.showMess('请选择数据!');
            flag = false;
          }
          if (len > 1 && isOnly) {
            this.showMess('只能选择一条数据!');
            flag = false;
          }
          return flag;
        },
        // 使用搜索组件时，显示高级查询时，重新计算页面高度
        // 高级搜索按钮展开搜索表单并重新计算表格高度
        showSearchMore() {
          // this.searchMore = !this.searchMore;
          this.$nextTick(function () {
            this.setTableDynHeight()
          })
        },
        // 获取菜单权限
        getMunsHasControl() {
          let leftmenus = JSON.parse(sessionStorage.getItem('leftmenus'));
          let obj = [];
          leftmenus.map(item => {
            obj.push(item.modName)
          })
          if (obj.includes('ZYY')) {
            this.zyy = true;
          } else {
            this.zyy = false;
          }
          if (obj.includes('JXS')) { //进修生
            this.jxs = true;
          } else {
            this.jxs = false;
          }
          if (obj.includes('YJS')) {
            this.yjs = true;
          } else {
            this.yjs = false;
          }
          if (obj.includes('SXS')) {
            this.sxs = true;
          } else {
            this.sxs = false;
          }
          if (obj.includes('BKS')) {
            this.bks = true;
          } else {
            this.bks = false;
          }
          if(obj.includes('skillCentre')){
            this.skillCentre = true;
          }else {
            this.skillCentre = false
          }
        },
        // 获取菜单权限
      },

      beforeDestroy() {
        this.$util.events.removeHandler(window, 'resize', this.getContentHeight || this.setTableDynHeight);
      },

      components: {
         modalHeader,
        // loadBtn,
        // remove,
        // uploadFile,
        // operate,
        // layoutTree,
        // leftTree,
        // selectUser,
        // dateGroup,
        // searchSelect,
        // selectOption,
        // studentOption,
        // major,
        // xlsx,
        // derive,
        // dictionarySelect,
        // abTableSearch,
        // searchForm,
        // searchFormTable
      }
    });
  }

};
console.log('util-info',util);
export let utils = util;
