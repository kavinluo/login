<template>
  <div class="loginMain"
       v-loading.fullscreen.lock="isLogin">
    <el-row style="background-color: #fff;height:100%">
      <el-col :span="12"
              align="center"
              v-if="imgshow"
                class="h-full">
        <div class="loginbg">
          <div class="firstchild">打造培养卓越医生的生态体系</div>
          <div class="lastchild">真正落地好用的医学教育管理平台</div>
        </div>
      </el-col>
      <el-col :span="colnumber"
              align="center"
              style="position:relative;height:100%">
        <div class="login-form">
          <div class="login-logo">
            <img src="/static/image/logo.png"
                 alt=""
                 style="height:100px;">
            <div class="logo-text">{{hospitalName}} {{chinaName}} <span
              style="font-size: 12px;color:#333;">{{version }}</span></div>
          </div>
          <div style="width: 60%;border-bottom: 1px dashed  #cdd4d9;    position: relative;">
            <el-form :model="ruleForm"
                     :rules="rules"
                     ref="ruleForm"
                     label-width="70px"
                     class="demo-ruleForm noinputleft">
              <el-form-item label=""
                            prop="username"
                            style="margin-bottom: 0">
                <div class="username"><span class="iconfont icon-zhanghu"></span>
                  <el-input v-model="ruleForm.username"
                            @keyup.enter.native="submitForm('ruleForm')"
                            :class="{'blueborder':nameonfocus,'cccborder':!nameonfocus}"
                            @focus="namefocus"
                            @blur="nameblur"
                            placeholder="用户名"></el-input>
                </div>
              </el-form-item>
              <el-form-item label=""
                            prop="password">
                <div class="password"><span class="iconfont icon-mima"></span>
                  <el-input type="password"
                            @keyup.enter.native="submitForm('ruleForm')"
                            style="outline: 0;border:none"
                            @focus="passfocus"
                            @blur="passblur"
                            class="passonfocus"
                            v-model="ruleForm.password"
                            placeholder="密    码"></el-input>
                </div>
              </el-form-item>
              <el-form-item style="text-align: left"
                            prop="reCode" v-if="haveReCode">
                <div class="recode">
                  <el-input name="reCode"
                            type="text"
                            v-model="ruleForm.reCode"
                            class="cccborder"
                            @focus="recodefocus"
                            @blur="recodeblur"
                            @keyup.enter.native="submitForm('ruleForm')"
                            placeholder="验证码"></el-input>
                  <img :src="imgSrc"
                       alt=""
                       class="login-img"
                       style="width: 80px;height: 40px;float: left;margin-right: 5px">
                  <a href="#"
                     class="login-re"
                     @click="getCode()"
                     style="float: left">刷新</a>
                </div>
              </el-form-item>
              <el-form-item style="text-align: left;margin-top: 20px;margin-bottom: 0">
                <el-checkbox style="border-radius: 50%"
                             v-model="checked">记住密码</el-checkbox>
              
              </el-form-item>
              <el-form-item style="text-align: center;margin-bottom: 50px"
                            label-width="0">
                <div class="signin">
                  <el-button class="btn"
                             type="primary"
                             @click="submitForm('ruleForm')">登录</el-button>
                </div>
              </el-form-item>
              <el-form-item style="text-align: center;margin-bottom: 47px"
                            label-width="0">
                <div><span>忘记密码了？</span><span style="color: #008cf8;cursor: pointer"
                        @click="retrievethepassword">找回密码</span></div>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="copy">{{copyright}}</div>
      </el-col>
    </el-row>
    <!-- 上报 -->
    <Modal close-on-click-modal="false"
           height="200"
           v-model="reportModal"
           class-name="vertical-center-modal"
           :width="500">
      <modal-header slot="header"
                    :content="reportId"></modal-header>
      <div>
        <p class="remove"
           align="center" style="font-size:16px;margin-top:15px">请联系系统管理员重置密码</p>
        <div align="center" style="margin-top:30px">
          <el-button type="primary" size='small'
                     @click="reportCall">确定</el-button>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  let Util;
  export default {
    data() {
      return {
        reportModal: false,
        reportId: {
          id: "reportId",
          title: "找回密码"
        },
        hospitalName: '北京众恒志信',
        chinaName: '教学管理系统',
        version: '1.0',
        isLogin: false,
        loginUrl: '',
        checked: true,
        haveReCode: true, // 是否需要显示验证码
        routerPath: {},
        imgSrc:"../static/image/verification.png",
        ruleForm: {
          name: '',
          password: '',
          reCode:'',
          key:'',
        },
        rules: {
          username: [{
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          reCode: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }]
        },
        //获取菜单
        getMenusData: {
          ajaxSuccess: 'setMeusData',
          ajaxParams: {
            url: this.$globlURLPrefix.passport + '/menu/query-tree-by-user',
            params: {}
          }
        },
        //获取验证码
        getrecode: {
          ajaxSuccess: 'getrecodeSuccess',
          ajaxParams: {
            url: this.$globlURLPrefix.passport + '/getDynamicVerifyCode',
            method: 'post',
            data: {}
          }
        },
        nameonfocus: false, // 是否聚焦
        passonfocus: false,
        // failuretimes: 3,
        screenWidth: document.body.clientWidth,
        imgshow: true,
        colnumber: 12,
        copyright:''
      };

    },
    watch: {
      screenWidth(val) {
        this.screenWidth = val
        let that = this
        setTimeout(function () {
          // 打印screenWidth变化的值
          if (that.screenWidth < 983) {
            that.imgshow = false
            that.colnumber = 24
          } else {
            that.imgshow = true
            that.colnumber = 12
          }
        }, 400)
      }
    },
    mounted() {
      this.$util.getCookie("userName")
      const that = this
      window.onresize = () => {
        return (() => {
          window.screenWidth = document.body.clientWidth
          that.screenWidth = window.screenWidth
        })()

      }
    },
    created() {
      Util = this.$util;
      // let index = '/manage/workbench/work';
      let index = this.$store.getters.getIndexUrl;

      if (this.$cookie.get('Token') != null) {
        if (index != '') {
          this.$router.push(index);
        } else {
          this.isLogin = true;
          console.log(1)
          this.myPromise();
        }
      } else {
        console.log(2)
        this.getHospitalName();
      }
      this.ruleForm.username = this.$util.getCookie("codeNumber")
      this.ruleForm.password = this.$util.getCookie("passWord")
      let failuretimes = JSON.parse(localStorage.getItem('failuretimes'));
      if (failuretimes != null && failuretimes <= 0) {
        this.failuretimes = failuretimes
      }
      if (this.screenWidth < 983) {
        this.imgshow = false
        this.colnumber = 24
      } else {
        this.imgshow = true
        this.colnumber = 12
      }
      //  获取验证码
       this.ajax(this.getrecode);
    },
    methods: {
      setMeusData(responseData) {
        let data = responseData.data || [];
        if (data.length > 0) {
          data = data[0].children;
        }

        data.unshift({
          expand: true,
          icon: '',
          id: -100,
          leaf: true,
          modName: 'work',
          name: '工作台',
          url: '',
          children: [{
            expand: true,
            icon: '',
            id: -101,
            leaf: true,
            modName: 'workbench',
            name: '工作台',
            url: '',
            children: [{
              expand: true,
              icon: '',
              id: -102,
              leaf: true,
              modName: 'work',
              name: '工作台',
              url: ''
            }]
          }]
        });

        //将设置完成的structureIndex赋值给 navs
        let index = '/manage',
          myData = data[0].children || [];
        for (var i = 0; i < myData.length;) {
          if (typeof myData[i].children != 'undefined') {
            index += '/' + myData[i]['modName'];
            myData = myData[i].children;
          } else {
            index += '/' + myData[i]['modName'];
            break;
          }
        }

        this.setRouterPath(data, true);
        this.$store.commit('setIndexUrl', index);
        this.$store.commit('setRouterPath', this.routerPath);
        this.$router.push(index);
      },
      loginSuccess(responseData) {
        let token = responseData.data;
        this.$cookie.set('Token', token, 1);
        this.$store.commit('setToken', true);
        Util.setAjaxPostToken();
        // setTimeout(() => { // 登录成功后需要第一时间拿到存储的数据，所以去掉定时
          this.$store.commit('setUserInfo', this);
          this.$store.commit('setEnvPath', this);
        // }, 500);

        // setTimeout(() => {
          this.myPromise();
        // }, 10);
      },
      myPromise() {
        let that = this;
        let myPromise = Util.queryData({
          url: this.$globlURLPrefix.passport + '/menu/query-tree-by-user',
          method: 'get'
        })();
        myPromise.then(function (res) {
          console.log('res', res)
          let responseData = res.data;
          that.isLogin = false;
          if (Util._.isObject(responseData['status']) && responseData['status']['code'] == 0) {
            that.setMeusData(responseData);
          } else {
            that.errorMess('获取数据失败!');
          }
        }).catch(function (response) {
          if (response instanceof Error) {
            that.errorMess(response.message);
          } else {
            that.errorMess(response.status + '错误!');
          }
          that.isLogin = false;
        });
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          let userName = Util._.trim(this.ruleForm.username);
          if (valid) {
            // 如果勾选了记住密码
            if (this.checked == true) {
              this.$cookie.set('passWord', this.ruleForm.password, 7);
              this.$cookie.set('codeNumber', this.ruleForm.username, 7);
            } else {
              this.$cookie.delete('codeNumber');
              this.$cookie.delete('passWord');
            }

            let that = this;
            let myPromise = Util.queryData({
              url: this.$globlURLPrefix.passport + '/login',
              method: 'post',
              data: {
                username:userName,
                // password: Util.encrypt(this.ruleForm.password),// 密码加密
                password:this.ruleForm.password,
                reCode: this.ruleForm.reCode,
                key: this.ruleForm.key
              }
            })();
            myPromise.then(function (res) {
              console.log('res', res)
              let responseData = res.data;
              if (Util._.isObject(responseData['status']) && responseData['status']['code'] == 0) {
                that.loginSuccess(responseData);
              } else {
                that.errorMess(responseData['status']['msg']);
                setTimeout(()=>{
                  that.getCode()
                },)
              }
              if (Util._.isObject(responseData['status']) && responseData['status']['code'] == 2) {
                that.failuretimes = parseInt(responseData.data)
                localStorage.setItem('failuretimes', JSON.stringify(that.failuretimes));

              }
            }).catch(function (response) {
              if (response instanceof Error) {
                that.errorMess(response.message);
              } else {
                that.errorMess(response.status + '错误!');
              }
              that.isLogin = false;
            });
          }
        })
      },

     
      getCode() {
        this.ajax(this.getrecode)
      },
      getrecodeSuccess(res) {
        this.imgSrc = res.data.base64Img
        this.ruleForm.key = res.data.key;
      },
      // 获取焦点，改变边框颜色
      passfocus() {
        this.passonfocus = true
      },
      passblur() {
        this.passonfocus = false
      },
      namefocus() {
        this.nameonfocus = true
      },
      nameblur() {
        this.nameonfocus = false
      },
      recodefocus() {
        this.recodeonfocus = true
      },
      recodeblur() {
        this.recodeonfocus = false
      },
      /**
       * 获取所有后台配置的路由地址
       * @param data
       * @param first
       * @param parItem
       */
      setRouterPath(data, first, parItem) {
        for (var i = 0, item; i < data.length; i++) {
          item = data[i];
          if (first) {
            item['path'] = '/manage';
            item['level'] = 1;
          } else {
            if (parItem['path'] == -1) {
              item['path'] = parItem['modName'] + '/' + item.modName;
            } else {
              item['path'] = parItem['path'] + '/' + item.modName;
            }
            item['level'] = parItem['level'] + 1;
          }
          this.routerPath[item['path']] = item['path'];
          if (typeof item.children != 'undefined' && item.children.length > 0) {
            this.setRouterPath(item.children, false, item);
          }
        }
      },
      // 动态获取结构名称
      getHospitalName() {
        let options = {
          ajaxSuccess: (res) => {
            this.hospitalName = res.data.hospitalName != null ? res.data.hospitalName : '';
            this.version = res.data.version != null ? res.data.version : '';
            this.chinaName = res.data.chinaName != null ? res.data.chinaName : '';
            this.copyright = res.data.copyright != null ? res.data.copyright : '';
            let haveReCode = res.data.businessInfoConfig.haveReCode
            console.log("haveReCode",haveReCode);
            haveReCode == "Y" || haveReCode == null ? this.haveReCode = true : this.haveReCode = false
          },
          ajaxParams: {
            url: '/envs'
          }
        };
        console.log('options',options)
        this.ajax(options);
      },
      // 找回密码
      retrievethepassword() {
        this.reportModal = true
      },
      reportCall() {
        this.reportModal = false
      },
    },
  };

</script>

<style>
  .loginMain {
    width: 100%;
    height: 100%;
    position: relative;
    background: #fff;
  }

  .loginBox {
    height: 410px;
    width: 310px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin: -177px 0 0 -155px;
  }

  .loginBox h2 {
    text-align: center;
  }

  .loginLeft {
    background-image: url(../assets/ambuf/images/logoBG.jpg);
    background-position: center center;
    background-repeat: repeat-x;
    width: 100%;
    height: 100%;
    position: relative;
    background-size: cover
  }

  .loginLeft .login {
    background-image: url(../assets/ambuf/images/transparentBG.png);
    background-position: center center;
    background-repeat: no-repeat;
    width: 430px;
    height: 524px;
    margin: -262px 0 0 -215px;
    position: absolute;
    top: 50%;
    left: 50%;
  }

  .loginLeft .login .logo-text {
    color: #fff;
    text-align: center;
  }

  .loginLeft .logo-ambuf {
    position: relative;
    top: -23px;
  }

  .loginLeft .login .logo-button {
    display: inline-block;
    height: 51px;
    width: 100%;
    font-size: 15px;
    margin-top: 10px;
  }

  .h-full {
    height: 100% !important;
    background-image: url(/static/image/bg.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    position: relative
  }

  .loginMain .loginbg {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%
  }

  .loginMain .loginbg .firstchild {
    font-family: PingFang-SC-Heavy;
    font-size: 36px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }

  .loginMain .loginbg .lastchild {
    margin-top: 26px;
    font-family: PingFang-SC-Regular;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ffffff;
  }

  .loginMain .username {
    position: relative;
    margin-top: 35px;
    margin-bottom: 0;
  }

  .loginMain .username span {
    position: absolute;
    top: 4px;
    right: 12px;
    z-index: 1;
    color: rgb(205, 212, 217);
  }

  .loginMain .username input {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    padding-left: 17px;
    outline: 0;
    /*border: 1px solid #e2e5e8;*/
    color: #434343;
    background-color: #fff !important;
  }

  .loginMain .username .el-input__inner {
    border: none;
    background-color: #fff !important;
  }

  .loginMain .username .blueborder {
    border: 1px solid #008cf8 !important;
    border-radius: 20px !important;
  }

  /*cccborder*/
  .loginMain .username .cccborder {
    border: 1px solid #e2e5e8;
    border-radius: 20px !important;
    float: left;
    margin-right: 5px

  }

  .loginMain .password {
    position: relative;
    margin-top: 30px
  }

  .loginMain .recode {
    margin-top: 20px
  }

  .loginMain .recode .el-input {
    width: 70% !important;
    float:left;
    margin-right: 10px
  }

  .loginMain .recode input {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    padding-left: 17px;
    outline: 0;
    border: 1px solid #e2e5e8;
    color: #434343;
  }

  .loginMain .password span {
    position: absolute;
    top: 4px;
    right: 12px;
    z-index: 1;
    color: rgb(205, 212, 217);
  }

  .loginMain .password input {
    width: 100%;
    height: 40px;
    border-radius: 20px;
    padding-left: 17px;
    outline: 0;
    border: 1px solid #e2e5e8;
    color: #434343;
  }

  .loginMain .password .blueborder {
    border: 1px solid #008cf8;
    border-radius: 20px !important;
  }

  .loginMain .password .cccborder {
    border: 1px solid #e2e5e8;
    border-radius: 20px !important;
  }

  .loginMain .recode .blueborder {
    border: 1px solid #008cf8;
    border-radius: 20px !important;
  }

  .loginMain .signin {
    position: relative;
    margin-top: 20px;
    cursor: pointer
  }

  .loginMain .signin .btn {
    width: 100%;
    height: 40px;
    border-radius: 30px;
    background-color: #008cf8;
    color: #fff;
    font-size: 14px;
    outline: 0;
    border: 1px solid #008cf8;
    right: 0;
  }


  .loginMain .noinputleft .el-form-item__content {
    margin-left: 0 !important;
  }

  .loginMain .username input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #434343;
  }

  .login-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    width: 100%
  }

  .login-logo {
    position: relative;
  }

  .loginMain .password input::-webkit-input-placeholder {
    /* placeholder颜色  */
    color: #434343;
  }

  .copy {
    position: absolute;
    bottom: 20px;
    width: 100%
  }

  .logo-text {
    text-align: center;
    position:relative;
    /*left: 50%;*/
    /*-webkit-transform: translate(-41%, -64%);*/
    /*transform: translate(-41%, -64%);*/
    font-size: 16px;
    letter-spacing: 2px;
    white-space: nowrap;
  }

</style>
