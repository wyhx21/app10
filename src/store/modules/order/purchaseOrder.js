import {
  queryPage,
  orderDetail,
  orderPersist,
  ordeSubmit,
  orderTransfer,
  orderDelete
} from "@axios/order/purchaseOrder.js";
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
      orderNo: "",
      cusCode: "",
      orderAmountMax: "",
      orderAmountMin: "",
      orderStatus: "",
      orderTimeBegin: "",
      orderTimeEnd: ""
    },
    dataList: [],
    currentData: {},
    detailList: [],
    orderStatusList: [
      { text: "全部", value: "" },
      { text: "创建", value: "0" },
      { text: "生效", value: "1" },
      { text: "交易", value: "2" },
      { text: "出库", value: "3" },
      { text: "入库", value: "4" }
    ],
    persistSupplier: {},
    persistProductList: []
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
    orderStatusList: _state => _state.orderStatusList,
    detailList: _state => _state.detailList,
    persistSupplier: _state => _state.persistSupplier,
    persistProductList: _state => _state.persistProductList,
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"](
        "h5_order_purchase"
      );
      return arr.includes("h5_order_purchase_persist");
    },
    perDetail: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"](
        "h5_order_purchase"
      );
      return arr.includes("h5_order_purchase_detail");
    },
    perSubmit: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"](
        "h5_order_purchase"
      );
      return arr.includes("h5_order_purchase_submit");
    },
    perTransfer: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"](
        "h5_order_purchase"
      );
      return arr.includes("h5_order_purchase_transfer");
    },
    perDelete: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"](
        "h5_order_purchase"
      );
      return arr.includes("h5_order_purchase_delete");
    }
  },
  mutations: {
    pageInfo: (_state, { page = 1, size = defaultPageSize } = {}) =>
      (_state.pageInfo = { page, size }),
    pageResult: (_state, { toalPage = 2, total = 1 } = {}) => {
      _state.pageResult = { toalPage, total };
    },
    queryParam: (_state, params = { orderStatus: "" }) =>
      (_state.params = params),
    nextPage: _state => _state.pageInfo.page++,
    dataClear: _state => (_state.dataList = []),
    dataList: (_state, list = []) => _state.dataList.push(...list),
    currentData: (_state, data = {}) => (_state.currentData = data),
    detailList: (_state, list = []) => (_state.detailList = list),
    persistSupplier: (_state, supplier = {}) => {
      if (_state.persistSupplier["id"] != supplier["id"]) {
        _state.persistSupplier = supplier;
      }
    },
    persistProductList: (_state, list = []) =>
      (_state.persistProductList = list),
    deleteProduct: (_state, { id }) => {
      const list = _state.persistProductList;
      _state.persistProductList = list.filter(item => item["id"] != id);
    },
    updateProduct: (_state, { id, price = 0, prodNum = 0 }) => {
      const _persistProductList = _state.persistProductList;
      const [rowData] = _persistProductList.filter(item => item["id"] == id);
      const prodAmount = price * prodNum;
      Object.assign(rowData, { price, prodNum, prodAmount });
    },
    updateProdRemark: (_state, { id, itemRemark }) => {
      const _persistProductList = _state.persistProductList;
      const [rowData] = _persistProductList.filter(item => item["id"] == id);
      Object.assign(rowData, { itemRemark });
    },
    persistSupplierAmount: (_state, extraAmount) => {
      Object.assign(_state.persistSupplier, { extraAmount });
    },
    persistSupplierRemark: (_state, orderRemark) => {
      Object.assign(_state.persistSupplier, { orderRemark });
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
      commit("detailList");
      if (!getters.perDetail) {
        return;
      }
      orderDetail(getters.currentData)
        .then(res => {
          commit("detailList", res);
        })
        .catch(() => {});
    },
    persistOrder: async ({ getters, commit }) => {
      const supplier = getters.persistSupplier;
      const prodList = getters.persistProductList;
      const data = {
        supplierId: supplier["id"],
        extraAmount: supplier["extraAmount"],
        remark: supplier["orderRemark"]
      };
      const detailList = prodList.map(item => {
        const [prodId, prodNum, prodPrice, remark] = [
          item["id"],
          item["prodNum"],
          item["price"],
          item["itemRemark"]
        ];
        return { prodId, prodNum, prodPrice, remark };
      });
      Object.assign(data, { detailList });
      return new Promise((resolve, reject) => {
        orderPersist(data)
          .then(() => {
            commit("persistSupplier");
            commit("persistProductList");
            resolve();
          })
          .catch(err => reject(err));
      });
    },
    submitOrder: async (args0, { id }) => {
      return ordeSubmit(id);
    },
    transferOrder: async (args0, { id }) => {
      return orderTransfer(id);
    },
    deleteOrder: async (args0, { id }) => {
      return orderDelete(id);
    }
  }
};
