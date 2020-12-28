import { areaList, areaMerge, areaPersist } from "@axios/store/store.js";

export default {
  namespaced: true,
  state: {
    dataList: [],
    currentData: {}
  },
  getters: {
    areaList: _state => _state.dataList,
    perAreaList: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"]("h5_store_setting");
      return arr.includes("h5_store_area_query");
    },
    perAreaMerge: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"]("h5_store_setting");
      return arr.includes("h5_store_area_merge");
    },
    perAreaPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"]("h5_store_setting");
      return arr.includes("h5_store_area_persist");
    },
    currentAreaData: _state => _state.currentData
  },
  mutations: {
    dataList: (_state, list = []) => (_state.dataList = list),
    currentAreaData: (_state, data = {}) => (_state.currentData = data)
  },
  actions: {
    queryAreaList: async ({ commit }, storeId) => {
      commit("dataList");
      return new Promise((resolve, reject) => {
        areaList(storeId)
          .then(res => {
            commit("dataList", res);
            resolve();
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    areaMerge: async (args0, val = {}) => {
      return areaMerge(val);
    },
    areaPersist: async (args0, val = {}) => {
      return areaPersist(val);
    }
  }
};
