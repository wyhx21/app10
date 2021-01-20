import {
  queryPage,
  queryById,
  queryDetail,
  outStore
} from "@axios/store/outstore.js";
import { queryAreaProdNum, queryByOrderNo } from "@axios/store/storeProd.js";
import { sysStore, storeArea } from "@axios/store/store.js";
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
      cusCode: "",
      orderNo: ""
    },
    dataList: [],
    currentOrderId: null,
    currentData: {},
    detailList: [],
    storeList: [],
    storeAreaList: [],
    slectStoreId: null,
    orderStoreList: []
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
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"](
        "h5_store_outstore"
      );
      return arr.includes("h5_store_outstore_handler");
    },
    perDetail: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"](
        "h5_store_outstore"
      );
      return arr.includes("h5_store_outstore_detail");
    },
    currentOrderId: _state => _state.currentOrderId,
    currentData: _state => _state.currentData,
    detailList: _state => _state.detailList,
    storeList: _state => _state.storeList,
    slectStoreId: _state => _state.slectStoreId,
    storeAreaList: _state => _state.storeAreaList,
    orderStoreList: _state => _state.orderStoreList
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
    currentOrderId: (_state, { id }) => (_state.currentOrderId = id),
    detailList: (_state, list = []) => (_state.detailList = list),
    orderStoreList: (_state, list = []) => (_state.orderStoreList = list),
    storeList: (_state, list = []) => (_state.storeList = list),
    storeAreaList: (_state, list = []) => (_state.storeAreaList = list),
    slectStoreId: (_state, storeId) => (_state.slectStoreId = storeId),
    clearStoreArea: _state => {
      _state.detailList.map(item => {
        delete item["areaId"];
        delete item["storeNum"];
        delete item["storeProdId"];
      });
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
    detailInit: async ({ dispatch }) => {
      dispatch("queryCurrentData");
      dispatch("queryDetailData");
      dispatch("querySysStore");
    },
    storeDetailInit: async ({ dispatch, commit }) => {
      commit("orderStoreList");
      await dispatch("queryCurrentData");
      dispatch("orderStoreInfo");
    },
    queryCurrentData: async ({ getters, commit }) => {
      commit("currentData");
      return new Promise((resolve, reject) => {
        if (getters.perPersist) {
          const orderId = getters.currentOrderId;
          queryById(orderId)
            .then(res => {
              commit("currentData", res);
              resolve();
            })
            .catch(() => {
              reject();
            });
        }
      });
    },
    orderStoreInfo: async ({ getters, commit }) => {
      commit("orderStoreList");
      const { orderNo } = getters.currentData;
      const detailType = 1;
      queryByOrderNo({ orderNo, detailType })
        .then(res => {
          commit("orderStoreList", res);
        })
        .catch(() => {});
    },
    queryDetailData: async ({ getters, commit }) => {
      commit("detailList");
      if (getters.perPersist) {
        const orderId = getters.currentOrderId;
        queryDetail(orderId)
          .then(res => {
            commit("detailList", res);
          })
          .catch(() => {});
      }
    },
    querySysStore: async ({ getters, commit }) => {
      commit("storeList");
      commit("storeAreaList");
      commit("clearStoreArea");
      if (getters.perPersist) {
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
      }
    },
    queryStoreArea: async ({ getters, commit }, storeId) => {
      commit("storeAreaList");
      commit("clearStoreArea");
      commit("slectStoreId", storeId);
      if (getters.perPersist) {
        storeArea(storeId)
          .then(res => {
            const result = res.map(item => {
              let text = item["value"];
              let value = item["code"];
              return { text, value };
            });
            commit("storeAreaList", result);
          })
          .catch(() => {});
      }
    },
    selectStoreArea: async ({ getters }, { id, areaId }) => {
      const [rowData] = getters.detailList.filter(item => item["id"] == id);
      const productId = rowData["prodId"];
      queryAreaProdNum({ areaId, productId })
        .then(res => {
          const storeNum = res["prodNum"];
          const storeProdId = res["id"];
          Object.assign(rowData, {
            areaId,
            storeNum,
            storeProdId
          });
        })
        .catch(() => {
          delete rowData["areaId"];
          delete rowData["storeNum"];
          delete rowData["storeProdId"];
        });
    },
    submitOutstore: async ({ getters }) => {
      return new Promise((resolve, reject) => {
        const orderId = getters.currentData["id"];
        const storeId = getters.slectStoreId;
        const details = getters.detailList.map(item => {
          const storeProdId = item["storeProdId"];
          const orderDetailId = item["id"];
          return { storeProdId, orderDetailId };
        });
        outStore({ orderId, storeId, details })
          .then(res => resolve(res))
          .catch(err => reject(err));
      });
    }
  }
};
