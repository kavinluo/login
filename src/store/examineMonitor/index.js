let state = {
  data: {}, // 监控数据
  stationRoom: {}, // 当前考站信息
}

let mutations = {
  // 初始化data
  intData: (state, dataVal) => {
    state.data = dataVal
  },
  // 初始化考站信息
  intStationRoom: (state, stationObj) => {
    state.stationRoom = stationObj
  },
  // 更新当前考站数据
  updateData: (state, dataObj) => {
    Object.keys(dataObj).map(key => {
      state.data[key] = dataObj[key]
    })
  }
}

export {
  state,
  mutations
};
