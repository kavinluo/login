import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import rules from '../config/formRules';
// 引入--访问前缀--组件
import globlURLPrefix from "../common/globlURLPrefix";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token:false,
    client:'web',
    fullLoading:true,
    "leftMainMenus": {"first":[0,1,2],"second":[0]},
    "subLeftMeuns": [],
    rules:_.defaultsDeep({},rules),
    userInfo:{}
  },
  mutations: {
    setMenusStatus (state,setObj) {
      let first = state["leftMainMenus"]["first"];
      let second = state["leftMainMenus"]["second"];
      first = setObj["first"];
      second = setObj["second"];
    },
    setInitRules(state){
      state["rules"] = _.defaultsDeep({},rules);
    },

    setToken(state,token){
      state.token = token;
      if(!state.token){
        state["userInfo"] = null;
      }
    },
    setFullLoading(state){
      state.fullLoading = !state.fullLoading;
    },
    setUserInfo(state,$vue){
      let options = {
        ajaxSuccess:(res)=>{
          state["userInfo"] = res.data;
        },
        errorTitle:'获取用户信息失败!',
        ajaxParams:{
          url:globlURLPrefix.passport + '/user/getUserInfo'
        }
      };
     $vue.ajax(options);
    },
  },
  getters:{
    getMenusStatus: state => {
      return state["leftMainMenus"]
    },
    getToken:state=>{
      return state.token;
    },
    getClient: state => {
      return state.client;
    },
    getUserInfo: state => {
      return state.userInfo;
    },
  }
})
