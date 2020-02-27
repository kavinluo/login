import _ from "lodash";
/**************************************** 变量模版 *****************************/
// 课程计划
const planDtoItem = {
  id: "",
  no: "", // 第几节课 int 数字
  duration: "", // 课时(几小时)   int 数字
  content: "", // 教学内容
  remark: "", // 详细介绍
  realia: "", // 所需教具
  wareDtoList: {
    "before": [],
    "inProgress": [],
    "after": []
  }, // 课件对象集合
  // wareDtoListTemp: { // 课件对象集合（操作使用）
  //   before: [], // 课前
  //   in_progress: [], // 课中
  //   after: [], // 课后
  // },
  // testingDtoList: [], // 测评对象集合
  // testingDtoListTemp: { // 测评对象集合（操作使用）
  testingDtoList: {
    before: { // 课前
      "expiredTime": "", //截止时间
      "validityScore": '', //有效分数
      "totalScore": '', //总分
      "validitySubmits": '', //有效提交次数
      "totalSubmits": '' //总提交次数
    },
    inProgress: { // 课中
      "expiredTime": "", //截止时间
      "validityScore": '', //有效分数
      "totalScore": '', //总分
      "validitySubmits": '', //有效提交次数
      "totalSubmits": '' //总提交次数
    },
    after: { // 课后
      "expiredTime": "", //截止时间
      "validityScore": '', //有效分数
      "totalScore": '', //总分
      "validitySubmits": '', //有效提交次数
      "totalSubmits": '' //总提交次数
    },
  },
};

const state = {
  // course: {}, // 课程基本信息
  // planDtoList: [], // 课程计划
  // evaluate: {}, // 教学质量评价对象
};

const mutations = {
  /**************************** 初始化 *******************************/
  init: state => {
    state.course = {
      "id": "",
      "title": "", //课程名称
      "direction": "", //应用方向说明
      "logo": "", //课程LOGO图
      "remark": "", //课程简介
      "outline": "", //教学大纲
    };
    state.evaluate = {
      studentWeight: '', //权重：学生评价
      peersWeight: '', //权重：同行评价
      superiorsWeight: '', //权重：上级评价
      studentEvaluateId: 0, //学生评价表ID，由于选择评价表功能暂不实现。赋值0.
      peersEvaluateId: 0, //同行评价表ID，由于选择评价表功能暂不实现。赋值0.
      superiorsEvaluateId: 0, //上级评价表ID，由于选择评价表功能暂不实现。赋值0.
      studentEvaluate: [], // 学生评价项集合
      peersEvaluate: [], // 同行评价项集合
      superiorsEvaluate: [], // 上级评价项集合
    };
    state.planDtoList = [
      _.defaultsDeep({}, planDtoItem)
    ];
  },
  /**************************** 更新值 *******************************/
  /**
   * 更新数据
   * dataObj Object ajax请求到的数据集
   */
  updateData: (state, dataObj) => {
    // 更新课程基本信息
    _.mapKeys(state.course, (val, key) => dataObj[key] && (state.course[key] = dataObj[key]));
    // 更新教学质量评价
    _.mapKeys(state.evaluate, (val, key) => state.evaluate[key] && (state.evaluate[key] = dataObj.evaluate[key]));
    /* 更新课程计划 */
    // state.planDtoList.length = 0;
    state.planDtoList = dataObj.planDtoList;
    // state.planDtoList.length = 0;
    // dataObj.planDtoList.map(item => {
    //   // 课件
    //   item.wareDtoListTemp = {
    //     before: [],
    //     in_progress: [],
    //     after: [],
    //   };
    // // 更新测评对象集合
    // item.testingDtoListTemp = {
    //   before: {},
    //   in_progress: {},
    //   after: {},
    // };
    // item.wareDtoList.map(wareItem => item.wareDtoListTemp[wareItem.type.toLocaleLowerCase()].push(wareItem));
    // item.testingDtoList.map(testItem => item.testingDtoListTemp[testItem.type.toLocaleLowerCase()] = testItem);
    // 初始化
    // item.wareDtoList = [];
    // item.testingDtoList = [];
    // state.planDtoList.push(item);
    // })
  },
  /**************************** 销毁值 *******************************/
  destroy: state => {
    state.course = null;
    state.evaluate = null;
    state.planDtoList = null;
  },
};

export {
  state,
  mutations
}
