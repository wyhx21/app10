import {
  queryPage,
  customerMerge,
  customerPersist
} from "@axios/base/customer.js";
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
      deleted: null,
      cusCode: "",
      cusName: "",
      linkName: "",
      mobile: ""
    },
    customerList: [],
    currentCustomer: {}
  },
  getters: {
    customerList: _state => _state.customerList,
    params: _state => _state.params,
    pageInfo: _state => _state.pageInfo,
    hasNextPage: _state => {
      const totalPage = _state.pageResult.toalPage;
      const currentPage = _state.pageInfo.page;
      return totalPage > currentPage;
    },
    perMerge: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"]("h5_prod_customer");
      return arr.includes("h5_prod_customer_merge");
    },
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"]("h5_prod_customer");
      return arr.includes("h5_prod_customer_persist");
    },
    salePersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"]("h5_order_sale");
      return arr.includes("h5_order_sale_persist");
    },
    saleQuery: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"]("h5_order_sale");
      return arr.includes("h5_order_sale_query");
    },
    currentCustomer: _state => _state.currentCustomer
  },
  mutations: {
    pageInfo: (_state, { page = 1, size = defaultPageSize } = {}) =>
      (_state.pageInfo = { page, size }),
    pageResult: (_state, { toalPage = 2, total = 1 } = {}) => {
      _state.pageResult = { toalPage, total };
    },
    queryParam: (_state, params = {}) => (_state.params = params),
    nextPage: _state => _state.pageInfo.page++,
    customerClear: _state => (_state.customerList = []),
    customerList: (_state, list = []) => _state.customerList.push(...list),
    currentCustomer: (_state, customer = {}) =>
      (_state.currentCustomer = customer)
  },
  actions: {
    initData: async ({ commit }, initData = false) => {
      if (initData) {
        commit("pageInfo");
        commit("pageResult");
        commit("customerClear");
      }
    },
    queryPage: async ({ commit, getters, dispatch }, initData = false) => {
      await dispatch("initData", initData);
      return new Promise((resolve, reject) => {
        queryPage(getters.params, getters.pageInfo)
          .then(res => {
            commit("pageResult", res);
            commit("customerList", res["data"]);
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
    dataMerge: async (args0, val = {}) => {
      return customerMerge(val);
    },
    dataPersist: async (args0, val = {}) => {
      return customerPersist(val);
    }
  }
};
