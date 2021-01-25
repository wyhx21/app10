import { login, userLogout } from "@axios/system/account.js";

export default {
  namespaced: true,
  state: {
    roleId: null,
    roleType: null,
    sysId: null,
    userName: null,
    token: null,
    saveData: true,
    userInfo: {}
  },
  getters: {
    roleId: _state => _state.roleId,
    // roleType: _state => _state.roleType,
    sysId: _state => _state.sysId,
    userName: _state => _state.userName,
    token: _state => _state.token,
    saveData: _state => _state.saveData,
    userInfo: _state => _state.userInfo
  },
  mutations: {
    // 登录信息
    loginInfo: (
      _state,
      { roleId = null, roleType = null, sysId = null, userName = null } = {}
    ) => {
      _state.roleId = roleId;
      _state.roleType = roleType;
      _state.userName = userName;
      _state.sysId = sysId;
    },
    token: (_state, { token } = {}) => (_state.token = token),
    saveData: (_state, flag = false) => (_state.saveData = flag),
    userInfo: (_state, userInfo = {}) => (_state.userInfo = userInfo)
  },
  actions: {
    // 登录
    loginSubmit: async (
      { commit, getters },
      { userCode = "", passWord = "" } = {}
    ) => {
      const userInfo = getters.saveData
        ? { userCode, passWord }
        : { userCode: "", passWord: "" };
      return new Promise((resolve, reject) => {
        login({ userCode, passWord })
          .then(res => {
            commit("userInfo", userInfo);
            commit("loginInfo", res);
            commit("token", res);
            resolve();
          })
          .catch(err => {
            commit("loginInfo", {});
            reject(err);
          });
      });
    },
    logOut: async ({ commit }) => {
      return new Promise((resolve, reject) => {
        userLogout()
          .then(res => {
            commit("loginInfo");
            commit("token");
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    }
  }
};
