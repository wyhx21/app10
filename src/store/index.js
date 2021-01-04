import { createStore } from "vuex";
import VuexPersistence from "vuex-persist";
import account from "@store/modules/account.js";
import userRoleAuth from "@store/modules/userRoleAuth.js";
import page from "@store/modules/page.js";
import store from "@store/modules/store.js";

const appStore = createStore({
  modules: {
    account,
    userRoleAuth,
    page,
    store
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage,
      modules: ["account"]
    }).plugin
  ]
});

export default appStore;
