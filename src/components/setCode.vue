<template>
  <div class="tip-content">
  <div class="tip-detail">
    <div class="tip-title">提示 - 教学综合管理平台V7.2.1</div>
    <div class="tips-content" style="position: relative">

      <p class="angeltreatment"><span class="iconfont icon-tishi-tishi"
                                      style="color: rgb(248, 181, 81);font-size: 40px;margin-right: 10px"></span>系统病了 : ( 需要白衣天使的救治！</p>
      <p style="color: #434343">授权码过期，权限受限！</p>
      <div style="color: #434343"><p style="float: left">请把下方</p> <p style="float: left;color: #fe4a5d">机器码</p><p style="float: left">报给众恒志信，获取</p>
        <p style="float: left;color: #fe4a5d">授权码</p><p>！</p></div>
      <div class="machinecode">机器码：<strong>{{hardwareCode}}</strong></div>
      <input type="text" placeholder="请输入授权码" v-model="regCode"><br>
      <button @click="submitForm">获取授权</button>
      </div>
    <div class="tip-inscription">
      <span class="company">北京众恒志信科技开发股份有限公司</span>
      <span class="servicetelephone">客服电话：010-62011627</span>
    </div>
  </div>
  </div>
</template>

<script>
  let Util;
  export default {
    data() {
      return {
        endTime: '', //string 有效日期 ,
        hardwareCode: '23456789', // string, optional): 机器码 ,
        regCode: '', // (string, optional): 授权注册码
        code: ''
      };
    },
    created() {
      Util = this.$util;
      this.init();
    },
    methods: {
      init() {
        this.ajax({
          ajaxLoading: false,
          ajaxSuccess: res => {
            this.hardwareCode = res.data.hardwareCode;
            this.endTime = res.data.endTime;
            this.regCode = res.data.regCode;
            this.code = res.status.code
          },
          ajaxParams: {
            url: this.$globlURLPrefix.getRegCode,
            method: "get",
            params: {}
          }
        });
      },

      submitForm() {
        this.ajax({
          ajaxLoading: false,
          ajaxSuccess: "goLogin",
          ajaxParams: {
            url: "/saveSysCode",
            method: "post",
            data: {
              code: this.regCode
            }
          }
        });
      },
      goLogin() {
        //去登录
        let index = "/";
        if (this.regCode == "" || this.code != 0) {
          this.errorMess('请输入机器授权码!');
          return;
        }
        console.log(this.$router);
        this.$router.push(index);

      }
    }
  };

</script>
<style>
  body {
    /* padding: 50px; */
    width: 100%;
    height: 100%;
    position: relative;
  }

  .tip-content {
    width: 600px;
    height: 440px;

    left: 50%;
    top: 50%;
    background-color: #eee;
    border-radius: 10px;
    position: absolute;
    transform: translate(-50%, -50%);
    box-shadow: -2px 10px 14px 2px rgba(0, 0, 0, 0.21);
  }

  .tips {
    text-align: center;
    line-height: 2.5;
    font-size: 14px;
    padding: 30px;
  }

  .tips h2 {
    text-align: center;
    font-size: 26px;
    font-weight: normal;
    margin-bottom: 0;
  }

  .tips p {
    line-height: 2;
  }

  .frome-data input {
    display: block;
    width: 400px;
    height: 40px;
    margin: 15px auto;
    text-align: center;
    border-radius: 3px;
    border: 1px solid #335bc9;
    font-weight: 600;
    letter-spacing: 1px;
    margin-bottom: 35px;
  }

  .tips button {
    background: #335bc9;
    color: #fff;
    border: none;
    border-radius: 3px;
    padding: 5px 35px;
    cursor: pointer;
    letter-spacing: 1px
  }


  .tip-detail {
    /*width: 500px;
    height: 340px;
    border-radius: 3px;*/
  }
  .tip-detail .tip-title {
    width: 100%;
    height: 30px;
    background-color: #3db5e6;
    font-size: 14px;
    line-height: 30px;
    color: #ffffff;
    padding-left: 10px;
  }
  .tip-detail .tips-content {
    width: 330px;
    /*height: 280px;*/
    /*padding-left: 100px;*/
    margin: 0 auto;
  }

  .tip-detail .tips-content .angeltreatment {
    font-family: MicrosoftYaHei;
    font-size: 18px;
    letter-spacing: 0px;
    color: #2a2e34;
    margin-top: 41px;
    margin-bottom: 20px;
  }
  .tip-detail .tips-content .machinecode {
    width: 330px;
    height: 30px;
    background-color: rgb(255, 219, 223);
    border: solid 1px rgba(254, 74, 93, 0.5);
    line-height: 30px;
    font-size: 14px;
    margin: 20px auto 10px;
  }
  .tip-detail .tips-content input {
    width: 330px;
    height: 36px;
    background-color: #ffffff;
    border-radius: 3px;
    border: solid 1px #cdd4d9;
    margin: 0 auto;
  }
  .tip-detail .tips-content button {
    width: 330px;
    height: 36px;
    background-color: #008cf8;
    border-radius: 3px;
    margin-top: 10px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    color: #ffffff;
    outline: 0;
    border: 1px solid #008cf8;
    margin-bottom: 36px;
    margin:10px auto
  }
  .tip-detail .tip-inscription {
    width: 100%;
    height: 30px;
    background-color: #eff3f7;
    color: #838991;
    font-family: MicrosoftYaHei;
    line-height: 30px;
    padding: 0 8px 0 10px;
    text-align: center;
    position: absolute;
    bottom: 0;


  }
  /*.tip-detail .tip-inscription .company {*/
    /*float: left;*/
  /*}*/
  /*.tip-detail .tip-inscription .servicetelephone {*/
    /*float: right;*/
  /*}*/
</style>
