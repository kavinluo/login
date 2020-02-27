import _ from "lodash";
/**************************************** 变量模版 *****************************/
// 课程计划
const planDtoItem = {
  no: "", // 第几节课 int 数字
  duration: "", // 课时(几小时)   int 数字
  content: "", // 教学内容
  remark: "", // 详细介绍
  realia: "", // 所需教具
  wareDtoList: [], // 课件对象集合
  wareDtoListTemp: { // 课件对象集合（操作使用）
    before: [], // 课前
    in_progress: [], // 课中
    after: [], // 课后
  },
  testingDtoList: [], // 测评对象集合
  testingDtoListTemp: { // 测评对象集合（操作使用）
    before: { // 课前
      score: '0', // 达标分数
      type: "BEFORE",
      questionsDtoList: [], // 测评试题对象集合
    },
    in_progress: { // 课中
      score: '0', // 达标分数
      type: "IN_PROGRESS",
      questionsDtoList: [], // 测评试题对象集合
    },
    after: { // 课后
      score: '0', // 达标分数
      type: "AFTER",
      questionsDtoList: [], // 测评试题对象集合
    },
  },
};
// 课件
const wareDtoItem = { //课前 课件
  title: "", // 课件显示名称
  fileId: "", // 文件ID
  fileName: "", //文件名称
  filePath: "", // 文件路径
  fileType: "", //文件类型
  fileSize: "", //文件大小
  resourceId: "", // 资源主键id
  resourceType: "", // 资源类型
  type: "", // 类型
};
// 试题
const questionsDtoItem = { //测评试题对象集合
  "theId": 0, // 唯一标识
  "types": "RADIO", //题型：RADIO单选题、CHECKBOX多选题、JUDGMENT判断题、ANSWER问答题
  "subject": "", //题干
  "optionScore": "", // 该项分数
  "options": "", //正确答案（多选题，多个正确答案|隔开。问答题，该项赋值null）
  "answerExplain": "", //正确答案解析
  "optionsDtoList": [], // 单选、多选、判断题，该项不能为空，必须有值。
  "keyWords": null //单选、多选、判断题，该项赋值null。问答题该项参见下面格式
};
// 评价项
let evaluateItem = {
  "title": "", //考核项目
  "remark": "", //考核内容
  "great": "", //优 int
  "good": "", //良 int
  "avg": "", //中 int
  "bad": "" //查  int
};
// 教学计划
const teach = {
  "criterionId": null, //所选择的标准课程ID，如果没选标准课程，赋值null
  // "typeId": "", //选择的分类
  "teacherType": "IN", // 本院IN/外院 OUT
  "teacherId": "", //当teacherType选择的是本院IN，赋值所选择的本院老师ID
  "teacher": "", //老师姓名，本院为所选姓名，外院为输入。
  "teachType": "ALL", //授课对象类型：ALL所有人、PART部分人、ROLE指定角色
  "teachTypeId": '', //授课人，当teachType选择ALL所有人，该项传值[]空数组。当teachType选择PART部分人，该项传值所选的部分人员ID。当teachType选择ROLE指定角色，该项传值所选角色ID。
  "teachTimeRemark": "", // 授课时间,
  "userList": [], // 人员列表
}

const state = {
  // course: {}, // 课程基本信息
  // planDtoList: [], // 课程计划
  // evaluate: {}, // 教学质量评价对象
};

const mutations = {
  /**************************** 初始化 *******************************/
  init: state => {
    state.course = {
      typeId: "", //所选的类型ID
      typeName: "", //所选的类型名称
      title: "", //课程名称
      tags: "", //标签，多个|分割
      direction: "", //应用方向说明
      logo: "", //缩略图
      remark: "", //课程简介
      outline: "", //教学大纲
      status: "DXD", // 课程状态  DXD带修订、TESTRUN试运行、DSH待审核、RUN在运行、EXIT已退出、BH驳回、TG通过
      operator: "", // 创建人
      createTime: "", // 创建时间
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
  initTeach: state => _.assign(state.course, _.defaultsDeep({}, teach)),
  /**************************** 添加值 *******************************/
  // 添加课程计划
  addPlanDto: state => {
    state.planDtoList.push(_.defaultsDeep({}, planDtoItem))
  },
  /**
   * 添加课件
   *                  课前    课中        课后    课索引        追加的附件数组
   * wareObj { type: 'before|in_progress|after', planIndex:0, list:[] }
   */
  addWareDto: (state, wareObj) => state.planDtoList[wareObj.planIndex].wareDtoListTemp[wareObj.type].push(...wareObj.list),
  /**
   * 添加试题
   *                  课前    课中        课后    计划索引
   * testObj { type: 'before|in_progress|after', planIndex:0 }
   */
  addTestingDto: (state, testObj) => {
    let questionsDtoList = state.planDtoList[testObj.planIndex].testingDtoListTemp[testObj.type].questionsDtoList;
    let theId = questionsDtoList.length + 1;
    questionsDtoItem.theId = theId; // 唯一标识
    questionsDtoItem.type = testObj.type.toUpperCase();
    questionsDtoList.push(_.defaultsDeep({}, questionsDtoItem))
  },
  /**
   * 添加评价项
   * type String student|peers|superiors
   */
  addEvaluate: (state, type) => state.evaluate[type + 'Evaluate'].push(_.defaultsDeep({}, evaluateItem)),
  /**************************** 更新值 *******************************/
  /**
   * 更新数据
   * dataObj Object ajax请求到的数据集
   */
  updateData: (state, dataObj) => {
    // 更新课程基本信息
    _.mapKeys(state.course, (val, key) => dataObj[key] && (state.course[key] = dataObj[key]));
    // 更新教学质量评价
    _.mapKeys(state.evaluate, (val, key) => state.evaluate[key] = dataObj.evaluate[key]);
    /* 更新课程计划 */
    state.planDtoList.length = 0;
    dataObj.planDtoList.map(item => {
      // 更新课件对象集合
      // let {
      //   before,
      //   inProgress: in_progress,
      //   after,
      // } = item.wareDtoList;
      // item.wareDtoListTemp = { // 课件对象集合（操作使用）
      //   before, // 课前
      //   in_progress, // 课中
      //   after // 课后
      // };
      // // 更新测评对象集合
      // item.testingDtoList.in_progress = _.defaultsDeep({}, item.testingDtoList.inProgress);
      // delete(item.testingDtoList.inProgress);
      // item.testingDtoListTemp = _.defaultsDeep({}, item.testingDtoList);
      // 课件
      item.wareDtoListTemp = {
        before: [],
        in_progress: [],
        after: [],
      };
      // 更新测评对象集合
      item.testingDtoListTemp = {
        before: {},
        in_progress: {},
        after: {},
      };
      item.wareDtoList.map(wareItem => item.wareDtoListTemp[wareItem.type.toLocaleLowerCase()].push(wareItem));
      item.testingDtoList.map(testItem => item.testingDtoListTemp[testItem.type.toLocaleLowerCase()] = testItem);
      // 初始化
      item.wareDtoList = [];
      item.testingDtoList = [];
      state.planDtoList.push(item);
    })
  },
  /**
   * 更新课程基本信息
   * course Object {key:value}
   */
  updateCourse: (state, course) => {
    // for (let item in course) {
    //   state.course[item] = course[item]
    // }
    _.mapKeys(course, (val, key) => {
      state.course[key] = val
    })
  },
  /**
   * 更新课程计划
   * planList Array []
   */
  updatePlanDto: (state, planList = []) => state.planDtoList = planList,
  /**
   * 更新教学质量评价对象
   * course Object {key:value}
   */
  updateEvaluate: (state, course = {}) => {
    for (let item in course) {
      state.evaluate[item] = course[item]
    }
  },
  /**************************** 删除值 *******************************/
  /**
   * 删除课程计划
   * index 删除索引
   */
  removePlanDto: (state, index) => state.planDtoList.splice(index, 1),
  /**
   * 删除课件
   * delWareObj {type:'课件类型',planIndex:'第几节课索引',delIndex:'需要删除的索引'}
   */
  removeWareDtoList: (state, delWareObj) => state.planDtoList[delWareObj.planIndex].wareDtoListTemp[delWareObj.type].splice(delWareObj.delIndex, 1),
  /**
   * 删除试题
   * delTestObj {type:'课件类型',planIndex:'第几节课索引',delTheId:['需要删除的索引']}
   */
  removeQuestionsDtoList: (state, delTestObj) => {
    let optionsDtoListTemp = [];
    state.planDtoList[delTestObj.planIndex].testingDtoListTemp[delTestObj.type].questionsDtoList.map(item => {
      if (delTestObj.delTheId.indexOf(item.theId) < 0) {
        optionsDtoListTemp.push(item)
      }
    })
    state.planDtoList[delTestObj.planIndex].testingDtoListTemp[delTestObj.type].questionsDtoList = optionsDtoListTemp;
  },
  /**
   * 删除评价项
   * delEltObj {type:"student|peers|superiors", delIndex:"删除索引"}
   */
  removeEvaluate: (state, delEltObj) => state.evaluate[delEltObj.type + 'Evaluate'].splice(delEltObj.delIndex, 1),
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
