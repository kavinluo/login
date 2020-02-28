/**
 * 考核场次 --- 考站信息缓存（不保存则不做更新原信息）
 */
import _ from 'lodash';

let paperContentItem = { // 测评试题对象集合
  'theId': 0, // 唯一标识
  'types': 'RADIO', //题型：RADIO单选题、CHECKBOX多选题、JUDGMENT判断题、ANSWER问答题
  'subject': '', //题干
  'optionScore': '', // 该项分数
  'options': '', //正确答案（多选题，多个正确答案|隔开。问答题，该项赋值null）
  'answerExplain': '', //正确答案解析
  'optionsDtoList': [], // 单选、多选、判断题，该项不能为空，必须有值。
  'keyWords': null //单选、多选、判断题，该项赋值null。问答题该项参见下面格式
};

let state = {
  info: {}, // 基本共用信息
  room: {}, // 该站房间信息
  teacher: [], // 监考老师信息
  unSelectRoom: [], // 禁选房间id集合
  unSelectUser: {} // 不允许选择的人员
};

let mutations = {
  // 初始化数据
  initData: (state, infoData) => {
    infoData = _.defaultsDeep({}, infoData);
    state.info = infoData.info;
    state.room = infoData.room;
    // 
    // if (infoData.room.specialty && typeof (infoData.room.specialty) == 'string') {
    //   state.room.specialty = infoData.room.specialty.split(',')
    // }
    state.teacher = infoData.teacher;
    state.unSelectRoom = infoData.unSelectRoom;
    state.unSelectUser = infoData.unSelectUser;
  },
  // 初始化老师
  initTeacher: (state, teacherArr) => state.teacher = teacherArr || [],
  /**
   * 初始化隐藏考站
   * @param state
   */
  initUnSelectRoom: (state) => state.unSelectRoom = [],
  // 添加老师
  addTeacher: (state, teacherObj) => state.teacher.push(teacherObj),
  /**
   * [添加考站考核内容]
   * @param  {Object} state 无需传参
   */
  addStationContentList: (state) => {
    let stationContentList = state.info.stationContentList;
    let _id = stationContentList.length ? (stationContentList[stationContentList.length - 1]._id + 1) : 0;
    state.info.stationContentList.push({
      _id, // 关系主键
      // 站点考核内容列表
      contentName: '',
      scoreTableIds: '', // 评分表ids
      scoreTableList: [ // 多个评分表
        //        {
        //          'scoreTableId': '1', // 教师评分表id
        //          'scoreTableName': '小儿麻醉评分表', // 教师评分表名称 （del）
        //        },
      ],
      spScoreTableId: '', // SP评分表id
      spScoreTableName: '', // SP评分表名称 （del）
      caseId: '', // 病例id
      caseName: '', // 病例名称 （del）
      scriptId: '', // 剧本id
      scriptName: '', // 剧本名称 （del）
      timeCount: 1, // 考核时间基数倍数
      paperContentList: [] // 试题集合（仅理论考核才使用）
    });
  },
  /**
   * [不允许选择的房间]
   * @param  {[type]} state  [description]
   * @param  {[type]} roomId [description]
   * @return {[type]}        [description]
   */
  addUnSelectRoom: (state, roomId) => {
    if (!state.unSelectRoom.indexOf(+roomId) > -1) {
      state.unSelectRoom.push(+roomId);
    }
  },
  /**
   * 增加不可选择人员
   * userArrObj { manager:[] } || { sp: 1,user: [1,2] }
   */
  addUnSelectUser: (state, userArrObj) => {
    Object.keys(userArrObj).map(key => {
      if (state.unSelectUser[key] instanceof Array) {
        state.unSelectUser[key] = state.unSelectUser[key].concat(userArrObj[key]);
      } else {
        state.unSelectUser[key].push(userArrObj[key]);
      }
    });
  },
  /**
   * [更新考核指定内容]
   * @param  {[type]} state [description]
   * @param  {[type]} data  [数据对象] { index: '当前更新索引', value: { key:value } }
   */
  updateStationContentList: (state, data) => {
    if (typeof data.index !== 'number') { // 未传索引则不做任何修改操作
      return;
    }
    Object.keys(data.value).map(key => {
      state.info.stationContentList[data.index][key] = data.value[key];
    });
  },
  /**
   * [更新监考老师指定内容]
   * @param  {[type]} state [description]
   * @param  {[type]} data  [数据对象] { index: '当前更新索引', value: { key:value } }
   */
  updateTeacherData: (state, data) => {
    if (typeof data.index !== 'number') { // 未传索引则不做任何修改操作
      return;
    }
    Object.keys(data.value).map(key => {
      state.teacher[data.index][key] = data.value[key];
    });
  },
  /**
   * 更新不可选择人员
   * userArrObj { manager:[] }
   */
  updateUnSelectUser: (state, userArrObj) => {
    Object.keys(userArrObj).map(key => {
      state.unSelectUser[key] = userArrObj[key];
    });
  },
  /**
   * 删除考站考核内容
   * @param {any} state
   * @param {any} index
   */
  removeStationContents: (state, index) => {
    let _id = state.info.stationContentList[index]._id;
    let teacher = _.defaultsDeep([], state.teacher);
    teacher.map(item => {
      delete item.contentScoreTableObj[_id];
    });
    console.log('delete:' + _id);
    state.teacher = teacher;
    state.info.stationContentList.splice(index, 1);
  },
  /**
   * [删除不允许选择的房间]
   * @param  {[type]} state  [description]
   * @param  {[type]} roomId [description]
   * @return {[type]}        [description]
   */
  removeUnSelectRoom: (state, roomId) => {
    let index = state.unSelectRoom.indexOf(+roomId);
    if (index > -1) {
      state.unSelectRoom.splice(index, 1);
    }
  },
  /**
   * 删除不可选择人员
   * userObj { type:sp, index:1 } 从sp人员中删除第2个
   */
  removeUnSelectUser: (state, userObj) => {
    state.unSelectUser[userObj.type].splice(userObj.index, 1);
  },
  /**
   * 删除不可选择人员
   * userObj { type:sp, id:1 } 从sp人员中删除指定id
   */
  removeUnSelectUserById: (state, userObj) => {
    let theUserIdArr = state.unSelectUser[userObj.type];
    let index = theUserIdArr.indexOf(userObj.id);
    theUserIdArr.splice(index, 1);
  },
  // 值销毁
  destroy: state => {
    state.info = null; // 基本共用信息
    state.room = null; // 该站房间信息
    state.teacher = null; // 监考老师信息
    state.unSelectRoom = null; // 禁选房间id集合
    state.unSelectUser = null; // 不允许选择的人员
  }
};

let getters = {
  teacher: state => state.teacher,
  /**
   * 获取状态里的数据
   * @param state
   * @param getters
   * @returns {function(*)}
   */
  val: (state) => (key) => {
    return key ? state[key] : undefined;
  }
};

export {
  state,
  mutations,
  getters
};
