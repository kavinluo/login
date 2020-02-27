<template>
  <div id="app">
    <Loading v-if="isLoading"></Loading>
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
  html,
  body,
  #app {
    height: 100%;
  }
</style>
<script>
  import Loading from './components/common/Loading.vue';
  import {
    mapState
  } from 'vuex';

  export default {
    name: 'app',
    created() {
      if (this.$cookie.get('Token') != null) {
        this.$store.commit('setUserInfo', this);
        this.$store.commit('setEnvPath', this);
      }
      // 解决后台多次刷新后store数据丢失问题
      //在页面加载时读取sessionStorage里的状态信息
      if (sessionStorage.getItem("store") ) {
        this.$store.replaceState(Object.assign({}, this.$store.state,JSON.parse(sessionStorage.getItem("store"))))
      }
      //在页面刷新时将vuex里的信息保存到sessionStorage里
      window.addEventListener("beforeunload",()=>{
        sessionStorage.setItem("store",JSON.stringify(this.$store.state))
      })
    },

    computed: {
      ...mapState([
        'isLoading'
      ])
    },
    components: {
      Loading
    }
  }
</script>
