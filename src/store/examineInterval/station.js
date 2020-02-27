/**
 * 考核场次 --- 考核基本信息
 */
let state = {
  info: {},
  edit: true // 是否可编辑
};

const mutations = {
    /************************* 初始化 ************************/
    initInfo: state => state.info = { // 考站信息
      sceneName: '', // 考站名称
      sceneType: '', // 考核类型
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      setupTime: '', // 时间表生成时间
      restNum: '', // 中场休息数
      restTime: '', // 中场休息时间
      moveTime: '', // 换站时间
      basicsTime: 1, // 考试时间基数,
      isSpMove: 'NO', // 是否SP轮转
      examineeNum: '', // 考核人数
      stationNum: '', // 考站数量
      scoringMethod: 'SCORE', // 评分方式('SCORE'得分制,'DEDUCTION'扣分制)
      step: '1', // 步长
      isRest: 'NO', // 是否休息(YES，NO)(规范考核才有)
      status: 'NOARRANGED', // 考核状态
      remindTime: '', // 结束前几分钟提醒时间（为0则不提醒）
      hasRemind: false // 为true是remindTime必须大于0的数字
    },
  // 考站信息是否可编辑
  initEdit: state => state.edit = true,
    /************************** 赋值 *********************/
    // 设置考站基本信息
    setInfo: (state, infoData) => {
      Object.keys(infoData).map(key => {
        state.info[key] = infoData[key];
      });
      // 考核结束、考核中、暂停都不能修改
      if (['FINISH', 'ONGOING', 'SUSPEND'].includes(infoData.status)) {
        state.edit = false;
      } else {
        state.edit = true;
      }
    },
  // 设置编辑状态
  setEdit: (state, b) => state.edit = b,
  /******************************************* 销毁值 ******************************************/
  destroy: state => state.info = null
};

let getters = {
  // 是否可编辑
  edit: state => state.edit
};

export {
  state,
  mutations,
  getters
};
