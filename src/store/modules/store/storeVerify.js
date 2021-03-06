import {
  queryPage,
  queryDetail,
  persistRecord,
  deleteRecord,
  confirmRecord
} from "@axios/store/storeVerify.js";
import { verifyTypeList } from "@axios/dict/verifyType.js";
import { queryProdList } from "@axios/store/storeProd.js";
import { Message } from "@utils/messagerUtil.js";
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
      storeId: "",
      verifiCode: "",
      verifiStatus: "",
      orderNo: ""
    },
    dataList: [],
    currentData: {},
    detailList: [],
    verifyOptions: [
      { text: "全部", value: "" },
      { text: "创建", value: "0" },
      { text: "确认", value: "1" },
      { text: "失效", value: "2" }
    ],
    verifyTypeOptions: [
      { text: "总量", value: "0" },
      { text: "核增", value: "1" },
      { text: "核减", value: "2" }
    ],
    typeOptions: [],
    addDetailList: []
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
    detailList: _state => _state.detailList,
    addDetailList: _state => _state.addDetailList,
    verifyOptions: _state => _state.verifyOptions,
    typeOptions: _state => _state.typeOptions,
    verifyTypeOptions: _state => _state.verifyTypeOptions,
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"]("h5_store_verify");
      return arr.includes("h5_store_verify_persist");
    },
    perConfirm: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"]("h5_store_verify");
      return arr.includes("h5_store_verify_confirm");
    },
    perDelete: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"]("h5_store_verify");
      return arr.includes("h5_store_verify_delete");
    },
    perDetail: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"]("h5_store_verify");
      return arr.includes("h5_store_verify_detail");
    }
  },
  mutations: {
    pageInfo: (_state, { page = 1, size = defaultPageSize } = {}) =>
      (_state.pageInfo = { page, size }),
    pageResult: (_state, { toalPage = 2, total = 1 } = {}) => {
      _state.pageResult = { toalPage, total };
    },
    queryParam: (_state, params = {}) => (_state.params = params),
    typeOptions: (_state, list = []) => (_state.typeOptions = list),
    nextPage: _state => _state.pageInfo.page++,
    dataClear: _state => (_state.dataList = []),
    dataList: (_state, list = []) => _state.dataList.push(...list),
    currentData: (_state, data = {}) => (_state.currentData = data),
    detailList: (_state, list = []) => (_state.detailList = list),
    addDetail: (_state, rowId) => _state.addDetailList.push({ rowId }),
    removeDetail: (_state, { rowId }) => {
      _state.addDetailList = _state.addDetailList.filter(
        item => item["rowId"] != rowId
      );
    },
    clearAddDetail: _state => (_state.addDetailList = []),

    prodListSelect: (_state, { rowId, prodList = [], areaId }) => {
      const [rowData] = _state.addDetailList.filter(
        item => item["rowId"] == rowId
      );
      if (!rowData) {
        return;
      }
      const prodOptions = prodList.map(item => {
        const { id, prodName } = item;
        return { value: id, text: prodName };
      });
      Object.assign(rowData, {
        prodList,
        prodOptions,
        areaId
      });
      delete rowData["storeProdId"];
      delete rowData["prodNum"];
      delete rowData["prodUnit"];
      delete rowData["verifyNum"];
      delete rowData["verifyRemark"];
    },
    prodListError: (_state, { rowId }) => {
      const [rowData] = _state.addDetailList.filter(
        item => item["rowId"] == rowId
      );
      if (!rowData) {
        return;
      }
      delete rowData["prodList"];
      delete rowData["prodOptions"];
      delete rowData["areaId"];
      delete rowData["storeProdId"];
      delete rowData["prodNum"];
      delete rowData["prodUnit"];
      delete rowData["verifyNum"];
      delete rowData["verifyRemark"];
    },
    selectProd: (_state, { rowId, storeProdId }) => {
      const [oldData] = _state.addDetailList.filter(
        item => item["storeProdId"] == storeProdId
      );
      if (oldData) {
        Message({ message: "该商品已选择，请不要重复选择" });
        return;
      }
      const [rowData] = _state.addDetailList.filter(
        item => item["rowId"] == rowId
      );
      if (!rowData) {
        return;
      }
      const [{ prodNum, prodUnit }] = rowData["prodList"].filter(
        item => item["id"] == storeProdId
      );
      if (!prodNum) {
        return;
      }
      Object.assign(rowData, {
        storeProdId,
        prodNum,
        prodUnit
      });

      delete rowData["verifyNum"];
      delete rowData["verifyRemark"];
    },
    selectVerifyType: (_state, { rowId, verifyType }) => {
      const [rowData] = _state.addDetailList.filter(
        item => item["rowId"] == rowId
      );
      if (!rowData) {
        return;
      }
      Object.assign(rowData, {
        verifyType
      });
    },
    selectVerifyNum: (_state, { rowId, verifyNum }) => {
      const [rowData] = _state.addDetailList.filter(
        item => item["rowId"] == rowId
      );
      if (!rowData) {
        return;
      }
      Object.assign(rowData, {
        verifyNum
      });
    },
    selectVerifyRemark: (_state, { rowId, verifyRemark }) => {
      const [rowData] = _state.addDetailList.filter(
        item => item["rowId"] == rowId
      );
      if (!rowData) {
        return;
      }
      Object.assign(rowData, {
        verifyRemark
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
    loadDetail: async ({ getters, commit }) => {
      const { id } = getters.currentData;
      queryDetail(id)
        .then(res => {
          commit("detailList", res);
        })
        .catch(() => {});
    },
    initVerifyOptions: async ({ commit }, whithAll = true) => {
      verifyTypeList()
        .then(res => {
          const all = whithAll ? [{ text: "全部", value: "" }] : [];
          const result = res.map(item => {
            let text = item["value"];
            let value = item["code"];
            return { text, value };
          });
          commit("typeOptions", [...all, ...result]);
        })
        .catch(() => {});
    },
    queryProdList: async ({ commit }, { areaId, rowId }) => {
      queryProdList(areaId)
        .then(prodList => {
          commit("prodListSelect", { rowId, prodList, areaId });
        })
        .catch(() => {
          commit("prodListError", { rowId });
        });
    },
    persistData: async (
      { getters, commit },
      { storeId, verifyCode, remark }
    ) => {
      const details = getters.addDetailList.map(item => {
        const {
          areaId,
          storeProdId,
          verifyNum: prodNum,
          verifyRemark: remark,
          verifyType: verifiType
        } = item;
        return { areaId, storeProdId, prodNum, remark, verifiType };
      });
      const req = { storeId, remark, verifiCode: verifyCode, details };
      return new Promise((resolve, reject) => {
        persistRecord(req)
          .then(() => {
            commit("clearAddDetail");
            resolve();
          })
          .catch(() => {
            reject();
          });
      });
    },
    deleteRecord: async ({ getters }) => {
      return deleteRecord(getters.currentData["id"]);
    },
    confirmRecord: async ({ getters }) => {
      return confirmRecord(getters.currentData["id"]);
    }
  }
};
