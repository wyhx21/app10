import {
  queryPage,
  queryDetail,
  deleteRecord,
  confirmRecord
} from "@axios/store/storeDispatch.js";
const defaultPageSize = 10;

export default {
  namespaced: true,
  state: {
    pageInfo: {
      page: 0,
      size: defaultPageSize
    },
    pageResult: {
      total: 2 * defaultPageSize,
      toalPage: 2
    },
    params: {
      sourceStoreId: "",
      toStoreId: "",
      disPacherStatus: "",
      orderNo: ""
    },
    dataList: [],
    currentData: {},
    // *****************
    detailList: [],
    // *****************
    dispatchOptions: [
      { text: "全部", value: "" },
      { text: "创建", value: "0" },
      { text: "确认", value: "1" }
    ],
    // persist
    addDetailList: [],
    sourceAreaOptions: [],
    toAreaOptions: []
  },
  getters: {
    dataList: _state => _state.dataList,
    params: _state => _state.params,
    pageInfo: _state => _state.pageInfo,
    hasNextPage: _state => {
      const totalPage = _state.pageResult.toalPage;
      const currentPage = _state.pageInfo.page;
      return totalPage > currentPage;
    },
    currentData: _state => _state.currentData,
    // *****************
    detailList: _state => _state.detailList,
    // *****************
    dispatchOptions: _state => _state.dispatchOptions,
    // persist
    addDetailList: _state => _state.addDetailList,
    sourceAreaOptions: _state => _state.sourceAreaOptions,
    toAreaOptions: _state => _state.toAreaOptions,
    // *****************
    perDetail: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"](
        "h5_store_dispatch"
      );
      return arr.includes("h5_store_dispatch_detail");
    },
    perConfirm: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"](
        "h5_store_dispatch"
      );
      return arr.includes("h5_store_dispatch_confirm");
    },
    perDelete: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"](
        "h5_store_dispatch"
      );
      return arr.includes("h5_store_dispatch_delete");
    },
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"](
        "h5_store_dispatch"
      );
      return arr.includes("h5_store_dispatch_persist");
    }
  },
  mutations: {
    pageInfo: (_state, { page = 1, size = defaultPageSize } = {}) =>
      (_state.pageInfo = { page, size }),
    pageResult: (_state, { toalPage = 2, total = 1 } = {}) => {
      _state.pageResult = { toalPage, total };
    },
    queryParam: (_state, params = {}) => (_state.params = params),
    nextPage: _state => _state.pageInfo.page++,
    dataClear: _state => (_state.dataList = []),
    dataList: (_state, list = []) => _state.dataList.push(...list),
    currentData: (_state, data = {}) => (_state.currentData = data),
    // ***************
    detailList: (_state, list = []) => (_state.detailList = list),
    // persist
    setSourceAreaOptions: (_state, list = []) =>
      (_state.sourceAreaOptions = list),
    setToAreaOptions: (_state, list = []) => (_state.toAreaOptions = list),
    cleanAddDetail: _state => (_state.addDetailList = []),
    addPersistRowData: (_state, { rowId }) =>
      _state.addDetailList.push({ rowId }),
    deletePersistRowData: (_state, { rowId }) => {
      _state.addDetailList = _state.addDetailList.filter(
        item => item["rowId"] != rowId
      );
    }
  },
  actions: {
    initData: async ({ commit }, initData = false) => {
      if (initData) {
        commit("pageInfo");
        commit("pageResult");
        commit("dataClear");
      }
    },
    queryPage: async ({ commit, getters, dispatch }, initData = false) => {
      await dispatch("initData", initData);
      return new Promise((resolve, reject) => {
        queryPage(getters.params, getters.pageInfo)
          .then(res => {
            commit("pageResult", res);
            commit("dataList", res["data"]);
            resolve(getters.hasNextPage);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    addNextPage: async ({ getters, commit, dispatch }) => {
      return new Promise((resolve, reject) => {
        if (getters.hasNextPage) {
          commit("nextPage");
          dispatch("queryPage")
            .then(() => {
              resolve(getters.hasNextPage);
            })
            .catch(err => reject(err));
        } else {
          resolve(false);
        }
      });
    },
    loadDetail: async ({ getters, commit }) => {
      const { id } = getters.currentData;
      queryDetail(id)
        .then(res => {
          commit("detailList", res);
        })
        .catch(() => {});
    },
    deleteRecord: async ({ getters }) => {
      return deleteRecord(getters.currentData["id"]);
    },
    confirmRecord: async ({ getters }) => {
      return confirmRecord(getters.currentData["id"]);
    }
  }
};
