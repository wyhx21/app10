import { createRouter, createWebHashHistory } from "vue-router";
import store from "@store/index.js";
import commonRouter from "@router/package/common.js";
import baseRouter from "@router/package/base.js";
import dictRouter from "@router/package/dict.js";
import storeRouter from "@router/package/store.js";
import orderRouter from "@router/package/order.js";

const routes = [
  ...commonRouter,
  ...baseRouter,
  ...dictRouter,
  ...storeRouter,
  ...orderRouter
];

const route = createRouter({
  history: new createWebHashHistory(),
  routes
});

route.beforeEach((to, from, next) => {
  if (to.name === "login") {
    store.commit("account/loginInfo", {});
    return next();
  } else if (to.matched.length < 1) {
    return next("/container");
  } else {
    next();
  }
});

// route.isReady().then(succ => console.log(succ)).catch(err => console.log(err))

export default route;
