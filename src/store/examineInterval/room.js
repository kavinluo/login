import _ from 'lodash';
//import { getS2M } from '../../components/osce/examineInterval/formatData';

let stationRoomItem = { // 站点集合
  stationName: '', // 考站名
  stationType: 'ORDINARY', // 站点类型 ORDINARY | SP
  timeCount: 1, // 站内考核时间基数倍数 如果是SP考站，则为站点考核内容的考核时间基础相加的和
  number: 1, // 单次考核人数
  randomType: 'SYSTEM', // 抽题类型
  randomNum: 1, // 抽题数量 默认为 1
  isQueue: 'NO', // 是否是队列
  queueNum: '', // 队列编号
  queueOrder: '', // 队列内顺序
  isDraw: 'NO', // 是否抽签
  drawNum: '', // 抽签编号
  roomIds: '', // 平行考站房间id集合
  stationWeight: '', // 考站权重
  roomSpecialtyList: [], // 可选专业
  stationContentList: [ // 站点考核内容列表
    {
      _id: 0,
      contentName: '',
//      scoreTableId: '', // 教师评分表id
//      scoreTableName: '', // 教师评分表名称 （del）
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
    }
  ]
};

/**
 * 考核场次 --- 考站信息
 */
const state = {
  roomList: [], // 考站列表
  roomInfo: [], // 考站房间信息
  scriptList: {}, // 可选剧本列表
  specialtyList: [], // 专业列表
  unSelectRoom: [], // 不允许选择的房间id
  unSelectUser: {} // 不允许选择的人员
};

const mutations = {
  /******************* 初始化 ********************************/
  /**
   * 初始化考站列表
   */
  initRoomList: state => state.roomList = [ // 监考考站
    {
      stationName: '',
      children: [1],
      room: [ // 该考站的房间信息
        {
          roomId: '',
          roomNum: '',
          roomName: '',
          specialty: 0 // 专业
        }
      ],
      teacher: [ // 监考老师
        [ // 该考站对应的监考老师集
          // { // 监考老师信息
          //   teacherId: '', // 监考老师id
          //   teacherName: '', // 监考老师姓名
          //   weight: '', // 监考老师权重
          // }
        ]
      ]
    }
  ],
  /**
   * 初始化考站信息
   */
  initRoomInfo: state => {
    let roomInfo = [];
    roomInfo[0] = _.defaultsDeep({}, stationRoomItem);
    state.roomInfo = roomInfo;
  }, // 考站房间信息
  /**
   * 初始化剧本列表
   * @param state
   * @param scripts {id:{id:1,scriptName:'病例名称'}}
   */
  initScriptList: (state, scripts) => {
    state.scriptList = scripts || {};
  },
  /**
   * 初始化隐藏考站
   * @param state
   */
  initUnSelectRoom: state => state.unSelectRoom = [],
  // 初始化不可选择人员
  initUnSelectUser: (state, unSelObj) => state.unSelectUser = unSelObj || {
    manager: [], // 考场管理员
    sp: [], // SP 人员
    user: [], // 参考人员
    teacher: [] // 监考老师
  },
  // 初始化专业列表
  initSpecialtyList: (state, specialtyArr) => state.specialtyList = specialtyArr || [],
  /******************* 添加 **********************************/
  // 添加考站
  addRoom: state => {
    state.roomList.push({ // 考站
      stationName: '',
      children: [1],
      room: [ // 该考站的房间信息
        {
          roomId: '',
          roomNum: '',
          roomName: '',
          specialty: 0 // 专业
        }
      ],
      teacher: [ // 监考老师
        [ // 该考站对应的监考老师集
          // { // 监考老师信息
          //   teacherId: '', // 监考老师id
          //   teacherName: '', // 监考老师姓名
          //   weight: '', // 监考老师权重
          // }
        ]
      ]
    });
    state.roomInfo.push(_.defaultsDeep({}, stationRoomItem));
  },
  /**
   * [添加平行站]
   * @param  {Object} state 无需传参
   * @param  {Number} index 平行站索引
   */
  addRoomChildren: (state, index) => {
    let station = state.roomList[index];
    let child = station.children;
    let len = child.length - 1;
    child.push(child[len] + 1); // 添加平行站
    station.room.push({ // 初始化该考站的房间信息
      roomId: '',
      roomNum: '',
      roomName: '',
      specialty: 0 // 专业
    });
    station.teacher.push([ // 该考站对应的监考老师集
      // { // 监考老师信息
      //   teacherId: '', // 监考老师id
      //   teacherName: '', // 监考老师姓名
      //   weight: '', // 监考老师权重
      // }
    ]);
  },
  /**
   * [添加考站考核内容]
   * @param  {Object} state 无需传参
   * @param  {Number} index 考站索引
   */
  addStationContentList: (state, index) => state.roomInfo[index].stationContentList.push({
    // 站点考核内容列表
    contentName: '',
    scoreTableId: '', // 教师评分表id
    scoreTableName: '', // 教师评分表名称 （del）
    spScoreTableId: '', // SP评分表id
    spScoreTableName: '', // SP评分表名称 （del）
    caseId: '', // 病例id
    caseName: '', // 病例名称 （del）
    scriptId: '', // 剧本id
    scriptName: '', // 剧本名称 （del）
    timeCount: 1, // 考核时间基数倍数
    paperContentList: [] // 试题集合（仅理论考核才使用）
  }),
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
   * 删除不可选择人员
   * userObj { type:sp, id:1000 } 追加一个人员到sp不可选择队列中
   */
  addUnSelectUser: (state, userObj) => {
    if (userObj.id instanceof Array) {
      state.unSelectUser[userObj.type] = state.unSelectUser[userObj.type].concat(userObj.id);
    } else {
      state.unSelectUser[userObj.type].push(userObj.id);
    }
  },
  // 增加专业列表
  addSpecialtyList: (state, specialtyArr) => {
    if (specialtyArr instanceof Array) {
      state.specialtyList = state.specialtyList.concat(_.compact(specialtyArr));
    } else {
      state.specialtyList.push(specialtyArr);
    }
    state.specialtyList = _.uniq(state.specialtyList);
  },
  /******************** 更新 **********************************/
  /**
   * [更新考站名称]
   * @param  {[type]} state [description]
   * @param  {[type]} data  [description]
   * @return {[type]}       [description]
   */
  updateStationName: (state, data) => state.roomInfo[data.index].stationName = data.name,
  /**
   * [更新考核指定内容]
   * @param  {[type]} state [description]
   * @param  {[type]} data  [数据对象] { index: { index: '当前考站索引', cIndex: '当前考站平行站索引' }, value: { key:value } }
   */
  updateStationContentList: (state, data) => {
    if (typeof data.index !== 'object') { // 未传索引对象则不做任何修改操作
      return;
    }
    Object.keys(data.value).map(key => {
      state.roomInfo[data.index.index].stationContentList[data.index.cIndex][key] = data.value[key];
    });
  },
  /**
   * [更新考站信息]
   * @param  {[type]} state [description]
   * @param  {[type]} data  [数据对象] { index: '当前考站索引', value: { key:value } }
   */
  updateRoomInfo(state, data) {
    if (typeof data.index !== 'number') {
      return;
    }
    Object.keys(data.value).map(key => {
      state.roomInfo[data.index][key] = data.value[key];
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
  // 增加专业列表
  updateSpecialtyList: (state, specialtyArr = []) => state.specialtyList = _.uniq(_.compact(specialtyArr)),
  // 更新考站权重
  updateRoomWeight(state, weightObj) {
    state.roomInfo[weightObj.index].stationWeight = weightObj.stationWeight;
  },
  /******************* 设置考站信息初始化数据 ********************************/
  setInitData: (state, infoData) => {
    let originData = _.defaultsDeep({}, infoData);
    let stationList = originData.stationList;
    let roomList = [];
    let disSelRoom = [];
    let specialtyList = [];
    state.roomList = [];
    state.roomInfo = [];

    for (var j = 0; j < stationList.length; j++) {
      roomList = stationList[j].roomList;

      if (originData.sceneType === 'FREE') { // 只有自由考核的时候才把秒转换成分钟
        stationList[j].timeCount = getS2M(stationList[j].timeCount);
        stationList[j].stationContentList.map(item => {
          item.timeCount = getS2M(item.timeCount);
        });
      }

      let roomListTempObj = {};

      let children = [],
        room = [],
        teacher = [];

      // 权重还原（0-1）
      stationList[j].stationWeight = Number(((stationList[j].stationWeight || 0) * 100).toFixed(2));

      stationList[j].stationContentList.map((item, index) => {
        // 增加标识提供老师选择评分表的时候进行关系确认（删除考核内容则直接删除监考老师所选择的评分表）
        item._id = index;
        (item.scoreTableList || []).map(stItem => {
          // 转换评分表id
          stItem.scoreTableId = stItem.oldScoreTableId || stItem.scoreTableId;
        });
      });

      for (var i = 0, item; i < roomList.length; i++) {
        item = roomList[i];

        if (typeof roomListTempObj[stationList[j]['id']] == 'undefined') {
          roomListTempObj[stationList[j]['id']] = {};
          roomListTempObj[stationList[j]['id']].children = [];
          roomListTempObj[stationList[j]['id']].room = [];
          roomListTempObj[stationList[j]['id']].teacher = [];
          roomListTempObj[stationList[j]['id']].stationName = '';
        }

        children = roomListTempObj[stationList[j]['id']].children;
        room = roomListTempObj[stationList[j]['id']].room;
        teacher = roomListTempObj[stationList[j]['id']].teacher;
        roomListTempObj[stationList[j]['id']].stationName = stationList[j]['stationName'];

        children.push(children.length + 1);
        room.push({
          roomId: item['roomId'],
          roomNum: item['roomNum'],
          roomName: stationList[j]['stationName'],
          specialty: item['specialty'] || 0 // 默认为0表示全部，但是提交的时候会置为空
        });

        if (item['specialty'] && specialtyList.indexOf(item['specialty']) < 0) {
          specialtyList.push(item['specialty']); // 专业
        }

        disSelRoom.push(item['roomId']); // 禁选房间初始化

        // 监考老师初始化
        for (var k = 0, roomTeacher = []; k < (item.teacherList || []).length; k++) {
          let contentScoreTableObj = {};
          (item.teacherList[k].contentScoreTableList || []).map((item, index) => {
            contentScoreTableObj[index] = item;
          });
          roomTeacher.push({
            teacherId: item.teacherList[k]['teacherId'] || item.teacherList[k]['userId'], // 监考老师id
            teacherName: item.teacherList[k]['teacherName'] || item.teacherList[k]['userName'], // 监考老师姓名
            weight: item.teacherList[k]['weight'] * 100, // 监考老师权重
            contentScoreTableObj // 评分表
          });
        }
        teacher.push(roomTeacher);
      }

      let tempArr = _.values(roomListTempObj);
      state.roomList = state.roomList.concat(tempArr);
      delete stationList[j].roomList;
      state.roomInfo.push(stationList[j]);
      state.unSelectRoom = disSelRoom;
      state.specialtyList = specialtyList;
    }
  },
  /********************* 删除 **********************************/
  /**
   * [删除考站附带删除对应的数据信息]
   * @param  {[type]} state [description]
   * @param  {[type]} index [description]
   * @return {[type]}       [description]
   */
  removeRoom: (state, index) => {
    state.roomList.splice(index, 1);
    state.roomInfo.splice(index, 1);
  },
  /**
   * [删除平行考站]
   * @param  {[type]} state [description]
   * @param  {[type]} data  [description]
   * @return {[type]}       [description]
   */
  removeRoomChildren: (state, data) => {
    let station = state.roomList[data.index];
    // 移除考站
    station.children.splice(data.cIndex, 1);
    // 移除考站房间
    station.room.splice(data.cIndex, 1);
    // 移除监考老师集合
    station.teacher.splice(data.cIndex, 1);
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
   * [删除考站考核指定内容]
   * @param  {[type]} state [description]
   * @param  {[type]} data  [description] {index:操作索引对象,remove:需删除考核内容的键数组}
   * @return {[type]}       [description]
   */
  removeStationContent: (state, data) => {
    if (data.index instanceof Array) { // 未传索引对象则不做任何修改操作
      return;
    }
    data.remove.map(key => {
      state.roomInfo[data.index.index].stationContentList[data.index.cIndex][key] = '';
    });
  },
  /**
   * 删除考站考核内容
   * @param {any} state
   * @param {any} indexObj
   */
  removeStationContents: (state, indexObj) => state.roomInfo[indexObj.index].stationContentList.splice(indexObj.cIndex, 1),
  /**
   * 删除不可选择人员
   * userObj { type:sp, index:1 } 从sp人员中删除第2个
   */
  removeUnSelectUser: (state, userObj) => {
    state.unSelectUser[userObj.type].splice(userObj.index, 1);
  },
  /**
   * 删除不可选择人员
   * userObj { type:sp, id:1 } 从禁选人员类型中删除指定id
   */
  removeUnSelectUserById: (state, userObj) => {
    let theUserIdArr = state.unSelectUser[userObj.type];
    let index = theUserIdArr.indexOf(userObj.id);
    theUserIdArr.splice(index, 1);
  },
  /**
   * 删除考站专业
   * { index:考站索引，cIndex: 平行站索引 }
   */
  removeRoomSpecialty: (state, indexObj) => state.roomList[indexObj.index].room[indexObj.cIndex].specialty = 0,
  /******************************************* 销毁值 ******************************************/
  destroy: state => {
    state.roomList = null; // 考站列表
    state.roomInfo = null; // 考站房间信息
    state.scriptList = null; // 可选剧本列表
    state.specialtyList = null; // 专业列表
    state.unSelectRoom = null; // 不允许选择的房间id
    state.unSelectUser = null; // 不允许选择的人员
  }
};

export {
  state,
  mutations
};
