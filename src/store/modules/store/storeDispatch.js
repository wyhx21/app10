import {
  queryPage,
  queryDetail,
  deleteRecord,
  confirmRecord,
  persistRecord
} from "@axios/store/storeDispatch.js";
import { queryAreaProdNum } from "@axios/store/storeProd.js";
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
    },
    // 调出区域选择
    sourceAreaSelect: (_state, { rowId, prodList, sourceAreaId }) => {
      const [addRow] = _state.addDetailList.filter(
        item => item["rowId"] == rowId
      );
      if (!addRow) {
        return;
      }
      const prodOptions = prodList.map(item => {
        const {
          prodName: text,
          id: value,
          prodNum,
          prodUnit,
          prodCode,
          prodId
        } = item;
        return { text, value, prodNum, prodUnit, prodCode, prodId };
      });
      Object.assign(addRow, {
        sourceAreaId,
        prodOptions
      });
      delete addRow["sourceProdId"];
      delete addRow["prodNum"];
      delete addRow["prodUnit"];
      delete addRow["prodId"];
      delete addRow["storeProdId"];

      delete addRow["toAreaId"];
      delete addRow["toProdNum"];
      delete addRow["dispatchNum"];
    },
    // 调出商品选择
    sourceProductSelect: (_state, { rowId, sourceProdId }) => {
      const [addRow] = _state.addDetailList.filter(
        item => item["rowId"] == rowId
      );
      if (!addRow) {
        return;
      }
      // 记录不能重复
      const length = _state.addDetailList
        .filter(item => item["rowId"] != rowId)
        .filter(item => item["sourceProdId"] == sourceProdId).length;
      if (length > 0) {
        Message({ message: "请不要重复添加记录" });
        return;
      }
      const { prodOptions } = addRow;
      if (!prodOptions) {
        return;
      }
      const [prod] = prodOptions.filter(item => item["value"] == sourceProdId);
      if (!prod) {
        return;
      }
      const { prodNum, prodUnit, prodId } = prod;
      Object.assign(addRow, {
        sourceProdId, // storeProdId
        prodNum,
        prodUnit,
        prodId
      });

      delete addRow["toAreaId"];
      delete addRow["toProdNum"];
      delete addRow["dispatchNum"];
    },
    toAreaProdSelect: (_state, { rowId, toAreaId, prodNum }) => {
      const [addRow] = _state.addDetailList.filter(
        item => item["rowId"] == rowId
      );
      if (!addRow) {
        return;
      }
      Object.assign(addRow, {
        toAreaId,
        toProdNum: prodNum
      });
    },
    dispatchNumSelect: (_state, { rowId, dispatchNum }) => {
      const [addRow] = _state.addDetailList.filter(
        item => item["rowId"] == rowId
      );
      if (!addRow) {
        return;
      }
      Object.assign(addRow, {
        dispatchNum
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
    deleteRecord: async ({ getters }) => {
      return deleteRecord(getters.currentData["id"]);
    },
    confirmRecord: async ({ getters }) => {
      return confirmRecord(getters.currentData["id"]);
    },
    sourecAreaSelect: async ({ commit }, { rowId, sourceAreaId }) => {
      // 查询区域商品信息
      return new Promise((resolve, reject) => {
        queryProdList(sourceAreaId)
          .then(prodList => {
            if (!prodList) {
              return reject("该区域没有商品库存,请选择其他区域");
            }
            commit("sourceAreaSelect", { rowId, prodList, sourceAreaId });
            return resolve();
          })
          .catch(err => {
            return reject(err);
          });
      });
    },
    toAreaSelect: async (
      { commit },
      { rowId, prodId, toAreaId, sourceProdId }
    ) => {
      return new Promise((resolve, reject) => {
        queryAreaProdNum({ productId: prodId, areaId: toAreaId })
          .then(({ id, prodNum }) => {
            if (id == sourceProdId) {
              return reject("必须是不同区域间的调度");
            } else {
              commit("toAreaProdSelect", { rowId, toAreaId, prodNum });
              resolve();
            }
          })
          .catch(() => {
            commit("toAreaProdSelect", { rowId, toAreaId, prodNum: "0" });
            resolve();
          });
      });
    },
    persistDispatch: async ({ getters }, params) => {
      return new Promise((resolve, reject) => {
        const details = getters.addDetailList.map(item => {
          const {
            sourceAreaId,
            toAreaId,
            sourceProdId: storeProdId,
            dispatchNum: prodNum
          } = item;
          return { sourceAreaId, toAreaId, storeProdId, prodNum };
        });
        Object.assign(params, { details });
        persistRecord(params)
          .then(() => resolve())
          .catch(() => reject());
      });
    }
  }
};
