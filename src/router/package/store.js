const storeSetting = [
  {
    path: "/store/setting",
    name: "store_setting",
    meta: { pageName: "仓库信息" },
    component: () => import("@views/store/setting/Index.vue")
  },
  {
    path: "/store/storePersist",
    name: "store_setting_persist",
    meta: { pageName: "仓库信息-新增" },
    component: () => import("@views/store/setting/Persist.vue")
  },
  {
    path: "/store/storeDetail",
    name: "store_setting_detail",
    meta: { pageName: "仓库信息-详情" },
    component: () => import("@views/store/setting/Detail.vue")
  },
  {
    path: "/store/storeEditor",
    name: "store_setting_editor",
    meta: { pageName: "仓库信息-编辑" },
    component: () => import("@views/store/setting/Editor.vue")
  },
  {
    path: "/store/storeDetailPersist",
    name: "store_setting_detail_persist",
    meta: { pageName: "仓库详情-新增" },
    component: () => import("@views/store/setting/DetailPersist.vue")
  },
  {
    path: "/store/storeDetailEditor",
    name: "store_setting_detail_merge",
    meta: { pageName: "仓库详情-编辑" },
    component: () => import("@views/store/setting/DetailEditor.vue")
  }
];

const inStore = [
  {
    path: "/store/inStore",
    name: "store_instore",
    meta: { pageName: "订单入库" },
    component: () => import("@views/store/instore/Index.vue")
  },
  {
    path: "/store/instoreEdit",
    name: "store_instore_edit",
    meta: { pageName: "订单入库-操作" },
    component: () => import("@views/store/instore/Edit.vue")
  },
  {
    path: "/store/instoreDetail",
    name: "store_instore_detail",
    meta: { pageName: "订单入库-详情" },
    component: () => import("@views/store/instore/Detail.vue")
  }
];

const outStore = [
  {
    path: "/store/outStore",
    name: "store_outstore",
    meta: { pageName: "订单出库" },
    component: () => import("@views/store/outstore/Index.vue")
  },
  {
    path: "/store/outStoreDetail",
    name: "store_outstore_detail",
    meta: { pageName: "订单出库-操作" },
    component: () => import("@views/store/outstore/Detail.vue")
  }
];

const storeProd = [
  {
    path: "/store/storeProd",
    name: "store_prod",
    meta: { pageName: "商品库存" },
    component: () => import("@views/store/storeProd/Index.vue")
  },
  {
    path: "/store/storeProdDetail",
    name: "store_prod_detail",
    meta: { pageName: "商品库存-详情" },
    component: () => import("@views/store/storeProd/Detail.vue")
  }
];

const storeVerify = [
  {
    path: "/store/verify",
    name: "store_verify",
    meta: { pageName: "库存核销" },
    component: () => import("@views/store/verify/Index.vue")
  },
  {
    path: "/store/verifyDetail",
    name: "store_verify_detail",
    meta: { pageName: "库存核销-详情" },
    component: () => import("@views/store/verify/Detail.vue")
  },
  {
    path: "/store/verifyPersist",
    name: "store_verify_persist",
    meta: { pageName: "库存核销-新增" },
    component: () => import("@views/store/verify/Persist.vue")
  }
];

const storeDispatch = [
  {
    path: "/store/dispatch",
    name: "store_dispatch",
    meta: { pageName: "库存调度" },
    component: () => import("@views/store/dispatch/Index.vue")
  },
  {
    path: "/store/dispatchDetail",
    name: "store_dispatch_detail",
    meta: { pageName: "库存调度-详情" },
    component: () => import("@views/store/dispatch/Detail.vue")
  },
  {
    path: "/store/dispatchPersist",
    name: "store_dispatch_persist",
    meta: { pageName: "库存调度-新增" },
    component: () => import("@views/store/dispatch/Persist.vue")
  }
];

export default [
  ...storeSetting,
  ...inStore,
  ...outStore,
  ...storeProd,
  ...storeVerify,
  ...storeDispatch
];
