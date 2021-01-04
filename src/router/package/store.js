const storeSetting = [
  {
    path: "/store/setting",
    name: "store_setting",
    component: () => import("@views/store/setting/Index.vue")
  },
  {
    path: "/store/storePersist",
    name: "store_setting_persist",
    component: () => import("@views/store/setting/Persist.vue")
  },
  {
    path: "/store/storeDetail",
    name: "store_setting_detail",
    component: () => import("@views/store/setting/Detail.vue")
  },
  {
    path: "/store/storeEditor",
    name: "store_setting_editor",
    component: () => import("@views/store/setting/Editor.vue")
  },
  {
    path: "/store/storeDetailPersist",
    name: "store_setting_detail_persist",
    component: () => import("@views/store/setting/DetailPersist.vue")
  },
  {
    path: "/store/storeDetailEditor",
    name: "store_setting_detail_merge",
    component: () => import("@views/store/setting/DetailEditor.vue")
  }
];

const inStore = [
  {
    path: "/store/inStore",
    name: "store_instore",
    component: () => import("@views/store/instore/Index.vue")
  },
  {
    path: "/store/inStoreDetail",
    name: "store_instore_detail",
    component: () => import("@views/store/instore/Detail.vue")
  }
];

const outStore = [
  {
    path: "/store/outStore",
    name: "store_outstore",
    component: () => import("@views/store/outstore/Index.vue")
  },
  {
    path: "/store/outStoreDetail",
    name: "store_outstore_detail",
    component: () => import("@views/store/outstore/Detail.vue")
  }
];

const storeProd = [
  {
    path: "/store/storeProd",
    name: "store_prod",
    component: () => import("@views/store/storeProd/Index.vue")
  },
  {
    path: "/store/storeProdDetail",
    name: "store_prod_detail",
    component: () => import("@views/store/storeProd/Detail.vue")
  }
];

const storeVerify = [
  {
    path: "/store/verify",
    name: "store_verify",
    component: () => import("@views/store/verify/Index.vue")
  },
  {
    path: "/store/verifyDetail",
    name: "store_verify_detail",
    component: () => import("@views/store/verify/Detail.vue")
  }
];

export default [
  ...storeSetting,
  ...inStore,
  ...outStore,
  ...storeProd,
  ...storeVerify
];
