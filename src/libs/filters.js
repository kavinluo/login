import {
  formatDate,
  parseDate
} from './date';
import lang from './systemLanguage';

import allUserRolu from '../config/userRolu';
// 引入--访问前缀--组件
import globlURLPrefix from "../libs/globlURLPrefix";
const getVueObj = function (vue) {
  const typeNames = { // 声明全局类型描述文本
    typeText: { // 公共类型描述文本
      '1': '是',
      '0': '否',
      'Y': '是',
      'N': '否',
      'YES': '是',
      'NO': '否',
      // 用户性别
      'BOY': '男',
      'GIRL': '女',
      // 房间使用类型
      'PRACTISE': '练习',
      'EXAM': '考核',
      'OTHER': '其他',
      // 设备状态
      'NORMAL': '正常',
      'DEFECT': '缺损',
      'DAMAGE': '损坏',
      'SERVICING': '维修中',
      'INUSE': '使用中',
      // 导师类别
      'SD': '硕导',
      'BD': '博导',
      'XSBD': '学术学位博导',
      'ZYBD': '专业学位博导',
      'XSZYBD': '学术&专业学位博导',
      'XSSD': '学术学位硕导',
      'ZYSD': '专业学位硕导',
      // 考核状态
      'NOARRANGED': '未生成轮转表',
      'UNPUBLISH': '未发布',
      'PUBLISH': '已发布',
      'ONGOING': '考核中',
      'FINISH': '考核结束',
      'MISS': '缺考',
      'SUSPEND': '暂停中',
      // 考核类型
      'STANDARD': '规范考核',
      'FREE': '自由考核',
      // 考生考核状态
      'NOTEXAM': '未考核',
      'DRAW': '待抽签',
      // 设备品牌
      'HIKVISION': '海康威视',
      'MCU': '科达视讯',
      'DAHUA': '大华',
      'KAIXI': '凯熙',
      'SPON': '世邦',
      // 设备位置
      'ROOM': '房间内',
      // 设备状态
      'OFFLINE': '离线',
      'ONLINE': '在线',
      // 任务执行状态
      'EXECUTING': '执行中',
      'UNEXECUTED': '未执行',
      // 预约开放时间类型
      'ALL': '全天候',
      'SPECIFIC': '特定时间',
      // 评价表设置活动状态
      'NO_PUBLISH': '未发布',
      'PROGRESS': '进行中',
      'END': '结束',
      // 实习生报名审核状态
      'NOT_SUBMIT': '未上报',
      'NOT_AUDIT': '待审核',
      'AUDIT_FAILURE': '未通过',
      'AUDIT_SUCCESS': '审核通过',
      // 是否合格
      'QUALIFIED': '合格',
      'NO_QUALIFIED': '不合格',
      'USER_NOT_REPORT': '未上报',
      'EDU_NOT_REPORT': '单位意见未填写',
      // 病种填写
      'NO_SUBMIT': '未上报',
      'REJECT': '驳回',
      'NO_PASS': '待审核',
      'PASS': '通过',
      // 报到
      'REGISTER': '报到',
      'NO_REGISTER': '未报到',
      // 预约状态
      'UNREPORTED': '待上报',
      'START': '待使用',
      'UNEVALUATED': '待评分',
      //培训标准
      'ENABLE': '启用',
      'DISABLE': '禁用',

      'MAIN_COMPLETED': '主要完成',
      'ASSISTANT': '助手',
      'WATCH': '观摩',

      'SUBMIT': '未审核',

      // 在线学习课程状态
      'TESTRUN': '试运行',
      'EXIT': '退出',

      // 在线学习课程作业类型
      'RADIO': '单选题',
      'CHECKBOX': '多选题',
      'JUDGMENT': '判断题',
      'ANSWER': '问答题',
      //教学计划
      'RELEASE': '发布',
      'NO_RELEASE': '未发布',

      // 研究生 状态
      'UNORGANIZED': '未组织',
      'ORGANIZE': '已组织',
      //通知类型
      'OPENTOPIC': '开题通知',
      'REPORT': '开题报告通知',
      'MIDSEMESTER': '中期考核通知',
      'DEFENSE': '答辩通知',
      //培养计划
      'NOTPASS': '驳回',
      'ADOPT': '通过',
      'AUDIT': '待审核',

      //开题
      'WSB': '未上报',
      'DSDSH': '导师审核中',
      'DSBH': '导师审核驳回',
      'JYSDSH': '教研室审核中',
      'JYSBH': '教研室审核驳回',
      'JYCDSH': '教育处审核中',
      'JYCBH': '教育处审核驳回',
      'TG': '通过',

      'DSB': '未上报',
      'DSTG': '教研室审核中',
      'JYSTG': '教育处审核中',

      'MODIFY_END': '更改开题作废',
      'AGAIN_END': '再次开题作废',
      //拟录取
      'QUASIADMISSION': '拟录取',
      'NONADMISSION': '不拟录取',
      'GIVEUP': '放弃',
      //录取
      'ENROLL': '录取',
      'NOENROLL': '不录取',
      //培养类型
      "BS": "博士",
      "SS": "硕士",
      //学位
      "MAJOR": "学术学位",
      "LEARNING": "专业学位",
      //研究生答辩管理
      //'WSB':'未上报',   --已有
      'DSH': '待审核',
      //'TG':'通过',      --已有
      'BH': '未通过',
      'BTG': '未通过',

      //大病历
      'DRAFT': '草稿',

      // 缴费方式
      'CASH': '现金',
      'TRANSFER': '转账',

      // 出入账
      'OUT': '出账',
      'ENTER': '入账',

      'DPF': '待评分',
      'YPF': '已评分',

      'VILLAGES': '农村',
      'CITYS': '城镇',

      'NOTICE': '已通知',
      'NOTNOTICE': '未通知',

      'ZC': '正常',
      'BFF': '不发放',
      'TEACH': '教学活动',
      'COURSE': '课程',

      //学期
      'ONE': '第一学期',
      'TWO': '第二学期'
    },
    //研究生资料和导师资料类型
    modelType: {
      //研究生
      'OUT_STUDY': '外出学习',
      'PUBLISHED_PAPERS': '发表论文',
      'REWARDED': '获得奖励',
      'OPEN_REPORT': '开题报告',
      'MID_EXAM_FORM': '中期考核表',
      'FINAL_DISSERTATION': '终版学位论文',

      'NO_SUBMIT': '未上报',
      'NO_PASS': '待审核',
      'TEC_PASS': '审核中',
      'PASS': '审核通过',
      'REJECT': '不通过',
      //导师
      'PUBLISHED_ARTICLE': '发表文章',
      'SCIENCE_PROJECT': '科研课题',
      'EDU_REFORM_PROGRAM': '教改项目',
      'MATERIALS': '编写材料',
      'TEACH_AWARDS': '教学奖励',
      'ACADEMIC_PART_TIME': '学术兼职',
      'HONOR_TITLE': '荣誉称号',

      'KYGZ': '科研工作',
      'LWDBF': '论文答辩费',
      'GMZYSJ': '购买专业书籍',
      'WXFYF': '文献检索费、打印复印费',
      'YDCCSB': '科研用移动存储设备',
      'XSLWBMF': '发表学术论文版面费',
      'CLF': '差旅费',
      'TQF': '通勤费',

      'ZYXW': '专业学位',
      'XSXW': '学术学位',
      'TDXL': '同等学历',
      'SBLDXS': '硕博连读（学术）',
      'SBLDZY': '硕博连读（专业）',
    },

    //是否毕业
    whetherGraduation: {
      NORMAL: '正常',
      SUSPENSION: '休学',
      DROP_OUT: '退学',
      DELAY: '延期'
    },
    //学位类型
    degreeType: {
      ZYXW: '专业学位',
      XSXW: '学术学位',
      TDXL: '同等学力',
      SBLDXS: '硕博连读（学术）',
      SBLDZY: '硕博连读（专业）'
    },

    /* 特殊描述文本（与公共部分冲突的可以作为特殊处理） */
    unit: { // 单位
      'm': ' m',
      'cm': ' cm',
      'kg': ' kg'
    },

    //本科教育  课程统计
    courseStatistics: {
      'NO_SUBMIT': '未上报',
      'NO_ISSUED': '已上报未下发',
      'NO_RELEASE': '已下发未发布',
      'RELEASE': '已发布'
    },

    //本科教育 教育处审核页面列表
    courseArrangeStateList: {
      'NO_SUBMIT': '未上报',
      'NO_PASS': '待审核',
      'JYC_NO_PASS': '待审核',
      'REJECT': '驳回',
      'PASS': '通过'
    },
    courseArrangeState: {
      'NO_SUBMIT': '未上报',
      'NO_PASS': '教研室待审核',
      'JYC_NO_PASS': '教育处待审核',
      'REJECT': '驳回',
      'PASS': '通过'
    },

    //审批流
    workFlower: {
      'SB': '上报',
      'TG': '通过',
      'BH': '驳回',
      'BTG': '不通过'
    },
    markType: {
      'THEORY': '理论',
      'SKILL': '技能'
    },

    //导师审核
    tutor: {
      DSDSH: '待审核',
      DSBH: ' 不通过',
      JYSDSH: '通过',
      'MODIFY_END': '更改开题作废',
      'AGAIN_END': '再次开题作废',
      'DSH': '待审核',
      'DSTG': '通过',

      JYSBH: '教研室不通过',

      JYCDSH: '教育处待审核',
      JYSTG: '教育处待审核',
      TG: '教育处通过',
      'JYCBH': '教育处不通过'
    },

    //日常职业暴露
    occupationalExposure: {
      'WSB': '未上报',
      'DSH': '待审核',
      'BTG': '不通过',
      'BH': '驳回',
      'TG': '通过',
      'REPORTWSB': '化验报告未上报',
      'REPORTDSH': '化验报告待审核',
      'REPORTBH': '化验报告驳回',
      'REPORTTG': '化验报告通过',
      'REIMBURSEMENTWSB': '报销申请未上报',
      'REIMBURSEMENTDSH': '报销申请待审核',
      'REIMBURSEMENTBH': '报销申请被驳回',
      'REIMBURSEMENTTG': '报销申请通过'
    },

    //教研室审核
    staffRoom: {
      DSDSH: '导师待审核',
      DSBH: ' 导师不通过',
      TG: '教育处通过',
      'JYCBH': '教育处不通过',

      DSTG: '待审核',
      JYSDSH: '待审核',
      JYSBH: '不通过',
      JYCDSH: '通过',
      'MODIFY_END': '更改开题作废',
      'AGAIN_END': '再次开题作废',
      'JYSTG': '通过'
    },
    //教育处审核
    education: {
      DSDSH: '导师待审核',
      DSBH: ' 导师不通过',

      DSTG: '教研室待审核',
      JYSDSH: '教研室待审核',
      JYSBH: '教研室不通过',

      JYCDSH: '教育处待审核',
      JYSTG: '教育处待审核',
      TG: '教育处通过',
      'MODIFY_END': '更改开题作废',
      'AGAIN_END': '再次开题作废',
      'JYCBH': '教育处不通过'
    },

    //毕业
    graduate: {
      'DSB': '未上报'
    },
    //开题状态
    applicantType: {
      'ORDINARY': '普通申请',
      'CHANGE': '更改申请',
      'AGAIN': '再次开题申请'
    },
    auditStatus: {
      NOT_SUBMIT: '草稿',
      NOT_AUDIT: '已上报',
      AUDIT_FAILURE: '驳回',
      AUDIT_SUCCESS: '通过'
    },
    roomSex: { // 宿舍
      'BOY': '男宿舍',
      'GIRL': '女宿舍'
    },
    qfcLevel: { // 医师执业资格级别
      '0': '职业',
      '1': '助理',
      '2': '无'
    },
    rotaryState: { //轮转状态
      '-1': '暂停',
      '9': '已安排未开始轮转',
      '99': '轮转中',
      '999': '轮转完成',
      '9999': '轮转结束',
      '-99': '已终止',
      '0': '未安排轮转'
    },

    relation: {
      'NO': '无直接关系',
      'LOOP': '轮转关系',
      'DEPT': '本部门或本科室',
      'MENTOR': '导师'
    },
    bespeakSetRoomStatus: { // 预约房间设置开放状态
      'NO': '关闭预约',
      'YES': '开放预约'
    },
    synthesizeStatistics: { // 教学评价 - 综合分析统计 - 分析对象
      'ALL': '全部',
      'PART': '部分人',
      'ROLE': '角色',
      'DEPT': '科室'
    },

    //教学活动（参加主体对象）
    participantSubject: {
      'ALL': '所有类型',
      'SXS': '实习生',
      'BKS': '本科生',
      'JXS': '进修生',
      'ZYY': '住院医',
      'YJS': '研究生',
      'PTYH': '普通用户'
    },
    print: { // 打印
      '0': '未打印',
      '1': '已打印',
      '3': '住宿费未打印',
      '4': '实习费未打印'
    },
    isPay: { // 缴费
      '0': '未缴费',
      '1': '已缴费'
    },
    isNeed: { // 是否需要
      '0': '不需要',
      '1': '需要'
    },

    userType: { // 用户类型
      'ALL': '所有人员',
      'ZYY': '住院医',
      'JXS': '进修生',
      'SXS': '实习生',
      'YJS': '研究生',
      'DJLS': '带教老师',
      'SPECIFIC': '特定人员',
      'BKS': '本科生',
      'PTYH': '普通人员',
      'SXS,JXS,ZYY,YJS': '所有人'
    },
    bespeakType: { // 预约审核类型
      'UNREPORTED': '待上报',
      'PENDING': '待审核',
      'REJECT': '驳回',
      'ADOPT': '通过',
      'START': '已开课',
      'UNEVALUATED': '待评价',
      'END': '结束',
      'INCLASS': '上课中'
    },
    affairsType: { // 事项类型
      'FOCUS': '集中培训',
      'PERSONAL': '零散培训',
      'EXAM': '练习',
      'ORTHER': '其他'
    },
    courseStatus: { // 课程状态(标准|授课)
      'DXD': '待修订',
      'TESTRUN': '试运行',
      'DSH': '待审核',
      'RUN': '在运行',
      'TG': '通过',
      'BH': '驳回',
      'EXIT': '已退出'
    },
    casesStatus: { // 基础教务-资源库管理-病历库
      'NOT_SUBMIT': '未上报',
      'NOT_AUDIT': '待审核',
      'AUDIT_FAILURE': '不通过',
      'AUDIT_SUCCESS': '通过',
      'PUBLISH': '已发布',
      'UNPUBLISH': '未发布'
    },
    //占位符
    placeholder: {
      '': '　',
      'null': '　',
      'undefined': '　'
    },
    // 是否在线
    isOnline: {
      'YES': '在线',
      'NO': '离线'
    },
    //手术操作-术中职务
    opDuty: {
      'INDEPENDENT': '独立操作',
      'ASSIST': '协助操作',
      'PERFORMER': '术者',
      'AHELP': '一助',
      'BHELP': '二助',
      'INSPECT': '观摩',
      'ASSISTANCE': '三助'
    },
    /*loopType: {
      1: '学生评价老师',
      2: '学生评价科室',
      3: '老师评价学生'
    },*/
    // 劳务费人员类型
    laborUserType: {
      0: '院内人员',
      1: '院内人员'
    },
    // 劳务费支付状态
    laborPayStatus: {
      0: '未支付',
      1: '已支付'
    },
    year: {
      'HALF_YEAR': '6个月',
      'A_YEAR': '12个月',
    },
    auditStatus0: {
      0: '未审核',
      1: '通过',
    },
    finalSelection: {
      0: '已结束',
      1: '未结束',
    },
    // 补轮转状态
    makeUpRotateState: {
      'NO_SUBMIT': '待安排补轮转',
      'SUBMIT': '已安排补轮转'
    },
    // 进修生（外出进修状态）
    outEducationAntragWriteStatus: {
      0: '草稿',
      1: '已上报',
      2: '驳回',
      3: '通过',
      4: '草稿',
      5: '上报',
      6: '通过',
      7: '驳回',
      8: '已报销'
    },
    midExamination: { //中期考核
      1: '优',
      2: '良',
      3: '中',
      4: '差'
    },
    //进修过程记录
    monthlyReview: {
      'NO_SUBMIT': '未上报',
      'SUBMIT': '上报待审核',
      'PASS': '完成'
    },
    podType: { //大病历类型
      'PIC': '图片',
      'ONLINE': '在线填写',
    },
    //安排面试
    interview: {
      'NOINTERVIEW': '未安排',
      'PUBLISH': '已安排',
      'LEARNING': '专业学位',
      'MAJOR': '学术学位',
      'CONFIRM': '导师已确认',
      'INTERVIEW': '已安排面试',
      'JYCCONFIRM': '教育处已确认',
      'KSCCONFIRM': '科室已确认'
    },

    //确认招生
    dsInterview: {
      'NOINTERVIEW': '未安排',
      'INTERVIEW': '导师未确认',
      //      'CONFIRM': '科室未确认',//(老师确认)
      'CONFIRM': '教育处未确认', //(老师确认)
      'KSCCONFIRM': '教育处未确认', //(科室确认)
      'JYCCONFIRM': '教育处已确认'
    },
    //培养计划
    plane: {
      'AUDIT': '待审核',
      'JYCADOPT': '教育处通过',
      'JYCTPASS': '教育处未通过',
      'KSZRADOPT': '科室主任通过',
      'KSZRTPASS': '科室主任未通过',
      'DSADOPT': '导师通过',
      'DSTPASS': '导师未通过'
    },

    depSyllabusManagement: {
      '1': '未安排',
      '2': '教研室待审核',
      '3': '教育处待审核',
      '4': '驳回',
      '5': '通过'
    },
    staffRoomFineTuningReview: {
      '1': '未安排',
      '2': '教研室待审核',
      '3': '通过',
      '4': '驳回',
      '5': '通过'
    },
    //培养计划
    dsPlanAudit: {
      'AUDIT': '待审核',
      'DSADOPT': '通过',
      'DSTPASS': '不通过'
    },
    ksPlanAudit: {
      'KSZRADOPT': '通过',
      'KSZRTPASS': '不通过',
      'DSADOPT': '待审核'
    },
    jycPlanAudit: {
      'JYCADOPT': '通过',
      'JYCTPASS': '不通过',
      'KSZRADOPT': '待审核'
    },
    //答辩结果记录
    dsresultRecord: {
      '0': '未确认',
      //      '1': '教育处未确认',
      '1': '通过',
      '2': '不通过'
      //      '3': '教育处未确认',
      //      '4': '教育处已确认'
    },
    ksresultRecord: {
      '1': '未确认',
      '3': '未确认',
      '4': '教育处已确认'

    },
    // 是否结束
    isEnd: {
      0: '未结束',
      1: '已结束'
    },
    //报名招录
    recruit: {
      'HALF_YEAR': '半年',
      'A_YEAR': '一年',
      'SUBMIT': '待审核',
      'PASS': '已通过',
      'STOP': '结束进修',
      'N': '未缴费',
      'Y': '已缴费'
    },
    instudyConfirmation: {
      'Y': '已确认',
      'N': '未通过确认',
      'S': '待确认'
    },

    wehterSelection: {
      '-1': '未遴选',
      0: '不通过',
      1: '通过'
    },
    noticeSend: {
      '-1': '待发送',
      1: '已发送',
      0: '未发送'
    },
    // 学位
    degree: {
      MAJOR: '学术学位',
      LEARNING: '专业学位'
    },
    // 住院医网上预审状态
    yjsYsState: {
      SUBMIT: '待审核',
      NO_PASS: '未通过',
      PASS: '通过'
    },
    // 住院医考试通知状态
    zskstzState: {
      Y: '已通知',
      N: '未通知'
    },
    // 住院医录取状态
    lqexamMarkState: {
      SUBMIT: '待录取',
      NO_PASS: '不录取',
      PASS: '已录取'
    },
    // 是否结婚
    marry: {
      Y: '已婚',
      N: '未婚'
    },
    // 职业证书考核
    exam: {
      'SUBMIT': '待审核',
      'NO_PASS': '不通过',
      'PASS': '通过'
    },
    //
    reportStatus: {
      '0': '未报到',
      'NOREPORT': '未报到',
      'REPORT': '已报到'
    },
    //进修生在线支付
    tradeState: { //支付状态
      'DZF': '待支付',
      'YZF': '已支付',
      'ZFSB': '支付失败',
      'GQ': '失效'
    },
    //进修生在线支付
    trade: { //支付状态
      'DZF': '待支付',
      'YZF': '恭喜您，支付成功',
      'ZFSB': '支付失败',
      'GQ': '支付失效'
    },
    channel: { //支付方式
      'A': '支付宝',
      'W': '微信',
      'Y': '银联'
    },
    appraisingStatus: {
      NO_START: '未开始',
      ONGOING: '进行中',
      FINALLY: '已结束'
    },

    educationEvaluation: { //月度考核
      NO_SUBMIT: '未上报',
      SUBMIT: '已上报'
    },
    educationEvaluationAudit: { //月度考核审核
      NO_SUBMIT: '未上报',
      SUBMIT: '待审核',
      JYC_NO_PASS: '教育处待审核',
      PASS: '通过'
    },
    //否补轮转
    isMakeupRotary: {
      '0': '无需补轮转',
      '1': '需要补轮转'
    },
    rdyReductionManageState: {
      'NO_SUBMIT': '未上报',
      'NO_PASS': '上报',
      'PASS': '审核完成'
    },
    isFreeSelect: { //是否自由选择
      '1': '自由',
      '0': '服从安排'
    },
    isArranged: { //是否已安排宿舍
      '1': '已安排',
      '0': '未安排'
    },
    isDormitory: { //是否需要住宿
      '1': '是',
      '0': '否'
    },
    payStatus: { // 课时费支付状态
      '1': '已支付',
      '0': '未支付'
    },

    givenSkillMakeUpAudit: {
      'AUDIT': '已审核',
      'NO_AUDIT': '未审核'
    },

    roomReserve: { // 预约房间
      UNREPORTED: '未上报',
      REPORTED: '待审核',
      ADOPT: '通过',
      REJECT: '驳回'
    },
    converter:{ //转换请假条状态status
      'WSB':'未上报',
      'DSH':'审核中(待审)',
      'TG':'通过',
      'BTG':'不通过',
      'BH':'驳回修改'
    },
    converterLeaveType:{ // 请假类型转换
      'SHI':'事假',
      'BING':'病假',
      'SANG':'丧假',
      'CHAN':'产假',
      'TAN':'探亲假',
      'HUN':'婚假',
      'OTHER':'其他'
    },
  };
  let dictionary = {}; // 动态字典
  const filters = [ // 声明全局过滤器及回调函数
    { // 货币格式化
      name: 'money',
      call(value, n, str) { // n 保留小数点位数 | str 货币前缀 | 使用： 10 | money(3,'$') ===> $ 10.000
        // 如果是非Number类型的直接返回源字符串，否则按照过滤器格式处理
        var ret = value;
        if (!isNaN(value)) {
          ret = (+value).toFixed(typeof n === 'number' ? n : 2);
          var intSum = ret.substring(0, ret.indexOf('.')).replace(/\B(?=(?:\d{3})+$)/g, ','); //取到整数部分
          var dot = ret.substring(ret.length, ret.indexOf('.')); //取到小数部分搜索
          ret = (str || '￥') + ' ' + intSum + dot;
        }
        return ret;
      }
    },
    { // 默认图片
      name: 'isDefImg',
      call(value) {
        if (value) return value;
        return '/static/image/physician.png';
      }
    },
    {
      name: 'loopType',
      call(value, type) {
        let loopType = {
          LOOP: {
            1: '学生评价老师',
            2: '学生评价科室',
            3: '老师评价学生'
          },
          MENTOR: {
            1: '学生评价导师',
            2: '导师评价学生',
            3: '导师自评'
          },
        }
        return loopType[type] && loopType[type][value] || value

      }
    },
    {
      name: 'formatSize',
      call(value) {
        let temp;
        let init;
        let float;
        if (!value) return '0KB';
        if (value < 1024) {
          return value + 'B';
        } else if (value < (1024 * 1024)) {
          temp = value / 1024;
          temp = temp.toFixed(2);
          return temp + 'KB';
        } else if (value < (1024 * 1024 * 1024)) {
          init = (value / (1024 * 1024));
          //float = (value % (1024*1024))/1024;
          return init.toFixed(2) + 'MB '; //+float.toFixed(2)+'KB';
        } else {
          init = (value / (1024 * 1024 * 1024));
          //float = (value % (1024*1024*1024))/(1024*1024);
          return init.toFixed(2) + 'GB '; //+ float.toFixed(2) + 'MB';
        }

      }
    },
    {
      name: 'formatUploadSize',
      call(value) {
        let temp;
        let init;
        let float;
        if (!value) return '0KB';
        if (value < 1024) {
          return value + 'kB';
        } else if (value < (1024 * 1024)) {
          temp = value / 1024;
          temp = temp.toFixed(2);
          return temp + 'MB';
        } else if (value < (1024 * 1024 * 1024)) {
          init = (value / (1024 * 1024));
          //float = (value % (1024*1024))/1024;
          return init.toFixed(2) + 'GB '; //+float.toFixed(2)+'KB';
        }
      }
    },
    {
      name: 'formatLength', //格式化时长
      call(value) {
        let temp;
        let init;
        if (!value) return '0秒';
        if (value < 60) {
          return value + '秒';
        } else if (value < (60 * 60)) {
          init = parseInt(value / 60);
          temp = (value % 60);
          return init + '分' + temp + '秒';
        } else {
          init = parseInt(value / (60 * 60));
          temp = parseInt((value % (60 * 60)) / 60);
          //float = (value % (1024*1024))/1024;
          return init + '时' + temp + '分';
        }

      }
    },
    {
      name: 'formatTime',
      call(value, str) {
        return getDateDiff(value, str);
      }
    },
    { // 时间格式化
      name: 'formatDate',
      /**
       * @param {any} value 需要处理的时间数据
       * @param {any} format 字符模版 yyyy-MM-dd HH:mm:ss.SSS
       * @returns
       */
      call(value, format) {
        return typeof date == 'string' ? parseDate(value, format) : formatDate(value, format);
      }
    },
    { // 用户角色字典
      name: 'userRoluName',
      call(value) {
        return allUserRolu[value] && allUserRolu[value].name || value;
      }
    },
    // 动态字典查询
    {
      name: 'dictionary',
      /**
       * @param value 过滤值
       * @param v 调用实例（this）
       * @param getByCode  动态字典码
       * @returns {*}
       * 使用示例： dictionary(this,'ROTARY_ZYY_TYPE') =>住院医人员属性
       */
      call(value, v, getByCode) {
        if (!dictionary[getByCode]) {
          let opt = {
            ajaxSuccess: res => {
              let t = {};
              if (res.data instanceof Object && res.data.child instanceof Array) {
                res.data.child.map(item => t[item.code] = item.name);
              }
              dictionary[getByCode] = t; // 缓存，相同字典码不再重复请求
            },
            ajaxParams: {
              url: globlURLPrefix.passport + '/dictionary/getByCode/' + getByCode
            }
          };
          v.ajax(opt);
        }
        return dictionary[getByCode] && dictionary[getByCode][value] || value;
      }
    },
    { // 系统语言
      name: 'sysLan',
      /**
       * @param value 字典
       * @param type 语言版本（默认中文）
       * @returns {*}
       */
      call(value, type = 'zh') {
        return lang[type][value] || value;
      }
    },
    { // 保留几位小数
      name: 'toFixed',
      call(value, len = 2) {
        return isNaN(value) ? 0 : Number(Number(value).toFixed(len));
      }
    },
    {
      name: 'getStr', //传入字符串分割为数组
      call(value, fileterName) {
        let list = [];
        if (!value) {
          return '-';
        } else {
          value.split(',').map(item => list.push(typeNames[fileterName][item.toLocaleUpperCase()]));
        }
        return list.join('、');
      }
    },
    {
      name: 'getArrText', // 获取数组中的指定属性的值
      call(arr, key) {
        let list = [];
        if (arr && arr instanceof Array) {
          arr.map(item => list.push(item[key]));
        }
        return list.join('、') || '-';
      }
    },
    {
      name: 'second2Format', // 秒转换为时间显示 1200 -> 00:20:00
      call(second) {
        let arr = [];
        let h = 0,
          m = 0,
          s = 0;
        if (second > 0) {
          h = parseInt(second / (60 * 60));
          m = parseInt((second - (h * 60 * 60)) / 60);
          s = second - (h * 60 * 60) - (m * 60);
        }
        arr = [h, m, s];
        return arr.map(i => i.toString().padStart(2, '0')).join(':') || '00:00:00';
      }
    },
    {
      name: 'num2Str', // 数字转文字
      call(index) {
        index += 1;
        let text = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
        let str = [];
        let bit = index % 10; // 个位
        let ten = (index - bit) / 10; // 十位
        ten > 1 && (str[0] = text[ten - 1]);
        index > 9 && (str[1] = text[9]);
        str[2] = (text[bit - 1]) || '';
        return str.join('');
      }
    },
    { // 移除html标签
      name: 'delHtmlTag',
      call(html, keepStyleText = false) {
        let resultStr = '';
        if (html) {
          if (keepStyleText) {
            resultStr = html.replace(/<img[^>]+>/g, '[图片]'); //去掉html
            resultStr = resultStr.replace(/<video[^>]*>/g, '[视频]'); //去掉html
            resultStr = resultStr.replace(/<audio[^>]+>/g, '[音频]'); //去掉html
          }
          resultStr = (resultStr || html).replace(/<[^>]+>/g, ''); //去掉html
          resultStr = resultStr.replace(/&nbsp;/g, ' '); // 转换
          resultStr = resultStr.replace(/ +/g, ' '); //多个空格转为一个空格
          // resultStr = resultStr.replace(/[ ]/g, "");    //去掉空格
          resultStr = resultStr.replace(/[\r\n]/g, ''); //去掉回车换行
        }
        return resultStr;
      }
    },
    {
      // 字符串截取
      name: 'sliceText',
      call(val, len = 10, str = '') {
        let temp = val ? val.slice(0, len) : val;
        return val.length > len ? temp + str : val;
      }
    },
    {
      name: 'showUserType', // 预约对象
      call(val) {
        let str = [];
        (val && val.split(',') || []).map(item => str.push(typeNames.userType[item]));
        return str.join('、');
      }
    },
    {
      name: 'score', // 分数/100
      call(val) {
        return val && val / 100;
      }
    },
    {
      name: 'affairType', // 事项类型
        call(value, v)
      {
        if (dictionary.affairType && !dictionary.affairType._load || !dictionary.affairType) {
          let opt = {
            ajaxSuccess: res => {
              let t = {
                _load: true
              };
              if (res.data instanceof Array) {
                res.data.map(item => t[item.code] = item.name);
              }
              dictionary.affairType = t; // 缓存，相同字典码不再重复请求
            },
            ajaxParams: {
              url: globlURLPrefix.cstc + '/affair/getAffairType'
            }
          };
          dictionary.affairType = {};
          dictionary.affairType._load = true;
          v.ajax(opt);
        }
        return dictionary.affairType && dictionary.affairType[value] || value;
      }
    },
    {
      name: 'roomType', // 房间类型
      call (value, v) {
        if (dictionary.roomType && !dictionary.roomType._load ||
          !dictionary.roomType) {
          let opt = {
            ajaxSuccess: res => {
              let t = {
                _load: true
              };
              if (res.data instanceof Array) {
                res.data.map(item => t[item.code] = item.name);
              }
              dictionary.roomType = t; // 缓存，相同字典码不再重复请求
            },
            ajaxParams: {
              url: globlURLPrefix.cstc + '/room/getAffairType'
            }
          };
          dictionary.roomType = {};
          dictionary.roomType._load = true;
          v.ajax(opt);
        }
        return dictionary.roomType && dictionary.roomType[value] || value;
      }
    }
];

  function getDateDiff(dateTimeStamp, str) {
    let minute = 1000 * 60;
    let hour = minute * 60;
    let day = hour * 24;
    let halfamonth = day * 15;
    let month = day * 30;

    let now = new Date().getTime();
    let diffValue = now - dateTimeStamp;

    let result = '';
    if (diffValue < 0) {
      //若日期不符则弹出窗口告之
      //alert("结束日期不能小于开始日期！");
    }
    let monthC = diffValue / month;
    let weekC = diffValue / (7 * day);
    let dayC = diffValue / day;
    let hourC = diffValue / hour;
    let minC = diffValue / minute;
    if (monthC >= 1) {
      result = str + parseInt(monthC) + '个月前';
    } else if (weekC >= 1) {
      result = str + parseInt(weekC) + '周前';
    } else if (dayC >= 1) {
      result = str + parseInt(dayC) + '天前';
    } else if (hourC >= 1) {
      result = str + parseInt(hourC) + '个小时前';
    } else if (minC >= 1) {
      result = str + parseInt(minC) + '分钟前';
    } else
      result = '刚刚';
    return result;
  }

  // 全局注册自定义过滤器
  filters.map(item => vue.filter(item.name, item.call)); // 在应用中直接通过name使用
  Object.keys(typeNames).map(item => vue.filter(item, function (value) { // 在应用中直接通过typeNames中的对象名使用
    if (typeof value === 'number' || typeof value === 'string') {
      // 如果描述文本中没有匹配的则返回原字符
      return typeNames[item][value.toString().toUpperCase()] || value;
    }
    return value;
  }));

};

export default getVueObj;
