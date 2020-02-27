/**
 * 考核场次 --- 考站操作索引
 */
let state = {
  index: 0,
  cIndex: 0
};

const mutations = {
  init: (state) => {
    state.index = 0;
    state.cIndex = 0
  },
  set: (state, indexObj) => {
    Object.keys(indexObj).map(key => {
      state[key] = indexObj[key]
    })
  }
};

const getters = {
  get: state => {
    return {
      index: state.index,
      cIndex: state.cIndex
    }
  }
}

export {
  state,
  mutations,
  getters
};
