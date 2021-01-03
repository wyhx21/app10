import { createRouter, createWebHashHistory } from "vue-router";
import store from "@store/index.js";
import { system } from "@router/package/common.js";
import { product, customer, supplier } from "@router/package/base.js";
import { prodType, verifyType } from "@router/package/dict.js";
import { storeSetting, inStore } from "@router/package/store.js";
import { purchaseOrder, saleOrder } from "@router/package/order.js";

const routes = [
  ...system,
  ...product,
  ...customer,
  ...supplier,
  ...prodType,
  ...verifyType,
  ...storeSetting,
  ...inStore,
  ...purchaseOrder,
  ...saleOrder
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
