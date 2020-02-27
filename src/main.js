import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store';
import router from './router';
import iView from 'iview';
import ElementUI from 'element-ui';
import VueCookie from 'vue-cookie';

import Util from './libs/util';
import Filters from './libs/filters';
import Directives from './libs/directives';
import globlURLPrefix from "./libs/globlURLPrefix";
import {
  utils
} from './libs/util';

Vue.config.productionTip = false
Vue.prototype.$globlURLPrefix = globlURLPrefix;


import 'iview/dist/styles/iview.css';
import 'element-ui/lib/theme-chalk/index.css';

Filters(Vue);
Directives(Vue);
Vue.use(iView);
Vue.use(VueCookie);
Vue.use(Util);
Vue.use(ElementUI)

//路由拦截配置
router.beforeEach((to, from, next) => {
 
  utils.setAjaxPostToken();
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (to.fullPath == '/login') {
      next();
    } else if (utils.getCookie('Token')) { // 通过vuex state获取当前的token是否存在
      //store.dispatch("onLoading",true);
      next({
        path: from.query.redirect || to.query.redirect
      });
    } else {
      next({
        path: globlURLPrefix.passport + '/login'
      });
    }
  } else {
    store.dispatch('onLoading', true);
    iView.LoadingBar.start();
    next();
  
  }
});

// 这里为了让效果明显一些加了延时
router.afterEach((to, from) => {
  store.dispatch('onLoading', false);
  iView.LoadingBar.finish();
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  data: {
    Bus: new Vue(),
  },
  template: '<App />',
  components: {
    App
  },
  created() {
    //    let userInfo = this.$store.getters.getUserInfo;
    //console.log(userInfo);
    this.$forceUpdate()
  },
  mounted() {
    this.$forceUpdate()
  }
});


// new Vue({
//   render: h => h(App),
// }).$mount('#app')
