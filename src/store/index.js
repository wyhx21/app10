import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import account from "@store/modules/account.js";
import userRoleAuth from "@store/modules/userRoleAuth.js";
import page from "@store/modules/page.js";
import appStore from "@store/modules/store.js";
import appBase from "@store/modules/base.js";

const store = createStore({
  modules: {
    account,
    userRoleAuth,
    page,
    appBase,
    appStore
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
      modules: ["account"]
    }).plugin
  ]
});

export default store;
