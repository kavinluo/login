import Vue from 'vue';
import Router from 'vue-router';

/**
 *
 * 登录
 *
 * */
import Login from '../components/login';

//
import SetCode from '../components/setCode';



/*
 * 404页面配置
 * */
// import NotFoundComponent from '../components/common/404'

Vue.use(Router);


//配置子路由
const routes = [
  //osceTheoryExamine, // 技能中心理论考核
  //系统打的默认首页
  {
    path: '/manage',
    redirect: '/login'
  },
  {
    path: '/manage.html',
    redirect: '/login'
  },
  {
    path: '/manage',
    name: 'manage',
    meta: {
      requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
    },
    
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/setCode',
    name: 'setcode',
    component: SetCode
  },
  {
    path: '*',
    redirect: '/login',
    // redirect: '/setCode'
  },
];
//实例化路由
let router = new Router({
  mode: 'history',
  routes: routes
});

export default router;
