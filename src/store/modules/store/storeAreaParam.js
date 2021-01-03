import { sysStore, storeArea } from "@axios/store/store.js";

export default {
  namespaced: true,
  state: {
    all: { text: "全部", value: "" },
    storeList: [],
    storeAreaList: [],
    selectStoreId: null,
    selectAreaId: null
  },
  getters: {
    storeList: _state => _state.storeList,
    allStoreList: _state => {
      return [_state.all, ..._state.storeList];
    },
    storeAreaList: _state => _state.storeAreaList,
    allStroeAreaList: _state => {
      return [_state.all, ..._state.storeAreaList];
    },
    storeId: _state => _state.selectStoreId,
    areaId: _state => _state.selectAreaId
  },
  mutations: {
    storeList: (_state, list = []) => (_state.storeList = list),
    storeAreaList: (_state, list = []) => (_state.storeAreaList = list),
    selectStoreId: (_state, storeId = "") => (_state.selectStoreId = storeId),
    selectAreaId: (_state, areaId = "") => (_state.selectAreaId = areaId)
  },
  actions: {
    querySysStore: async ({ commit }) => {
      commit("storeList");
      commit("storeAreaList");
      commit("selectStoreId");
      commit("selectAreaId");
      sysStore()
        .then(res => {
          const result = res.map(item => {
            let text = item["value"];
            let value = item["code"];
            return { text, value };
          });
          commit("storeList", result);
        })
        .catch(() => {});
    },
    selectStore: async ({ commit }, storeId = "") => {
      commit("selectStoreId");
      commit("storeAreaList");
      commit("selectAreaId");
      if (storeId != "" && null != storeId) {
        storeArea(storeId)
          .then(res => {
            const result = res.map(item => {
              let text = item["value"];
              let value = item["code"];
              return { text, value };
            });
            commit("selectStoreId", storeId);
            commit("storeAreaList", result);
          })
          .catch(() => {});
      }
    }
  }
};
