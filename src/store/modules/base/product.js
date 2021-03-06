import {
  queryPage,
  prodType,
  prodMerge,
  prodPersist
} from "@axios/base/product.js";
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
      prodCode: "",
      prodName: "",
      prodType: null
    },
    prodType: [],
    productList: [],
    currentProduct: {}
  },
  getters: {
    productList: _state => _state.productList,
    pageInfo: _state => _state.pageInfo,
    params: _state => _state.params,
    hasNextPage: _state => {
      const totalPage = _state.pageResult.toalPage;
      const currentPage = _state.pageInfo.page;
      return totalPage > currentPage;
    },
    prodTypeList: _state => _state.prodType,
    prodTypes: _state => _state.prodType.filter((item, index) => index > 0),
    currentProduct: _state => _state.currentProduct,
    perMerge: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"]("h5_prod_setting");
      return arr.includes("h5_prod_setting_merge");
    },
    perPersist: (_state, _getters, _rootState, _rootGetters) => {
      const arr = _rootGetters["userRoleAuth/pageRoleAuth"]("h5_prod_setting");
      return arr.includes("h5_prod_setting_persist");
    }
  },
  mutations: {
    pageInfo: (_state, { page = 1, size = defaultPageSize } = {}) =>
      (_state.pageInfo = { page, size }),
    pageResult: (_state, { toalPage = 2, total = 1 } = {}) => {
      _state.pageResult = { toalPage, total };
    },
    nextPage: _state => _state.pageInfo.page++,
    queryParam: (_state, params = {}) => (_state.params = params),
    productList: (_state, list = []) => _state.productList.push(...list),
    productClear: _state => (_state.productList = []),
    prodType: (_state, list = []) => (_state.prodType = list),
    currentProduct: (_state, prod = {}) => (_state.currentProduct = prod)
  },
  actions: {
    initData: async ({ commit }, initData = false) => {
      if (initData) {
        commit("pageInfo");
        commit("pageResult");
        commit("productClear");
      }
    },
    queryPage: async ({ commit, getters, dispatch }, initData = false) => {
      await dispatch("initData", initData);
      return new Promise((resolve, reject) => {
        queryPage(getters.params, getters.pageInfo)
          .then(res => {
            commit("pageResult", res);
            commit("productList", res["data"]);
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
    queryProdType: async ({ commit }) => {
      return new Promise(resolve => {
        prodType()
          .then(res => {
            const result = [{ text: "全部", value: null }];
            for (let item of res) {
              result.push({ text: item["value"], value: item["code"] });
            }
            commit("prodType", result);
            resolve();
          })
          .catch(() => resolve());
      });
    },
    prodMerge: async (args0, val) => {
      return prodMerge(val);
    },
    prodPersist: async (args0, val) => {
      return prodPersist(val);
    }
  }
};
