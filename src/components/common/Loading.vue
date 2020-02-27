
<template>
  <div class="loading">
    <!--<div class="spinner-grow">
      <span class="sr-only">Loading...</span>
    </div>-->
    <div><i class="el-icon-loading"></i> 加载中...</div>
  </div>
</template>
<style>
  .ivu-loading-bar .ivu-loading-bar-inner{
    background: #20a0ff;
  }
</style>
<script>
  import {mapState} from "vuex";
  export default {
    data () {
      return {

      }
    },

  }
</script>

<style scoped>
  .loading{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1999;
    text-align: center;
    padding-top: 10px;
    background: rgba(0, 0, 0, .02);
    color: #5cadff;
    font-size: 16px;
  }
  .loading div{
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 10;
    width: 100%;
  }
  .loading i{
    font-size: 28px;
    /*font-weight: bold;*/
    color: #5cadff;
  }

  @keyframes spinner-grow {
    0% {
      transform: scale(0);
    }
    50% {
      opacity: 1;
    }
  }

</style>
