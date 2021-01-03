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

export { storeSetting, inStore };
