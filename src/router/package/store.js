const storeSetting = [
  {
    path: "/store/setting",
    name: "store_setting",
    component: () => import("@com/store/setting/Index.vue")
  },
  {
    path: "/store/storePersist",
    name: "store_setting_persist",
    component: () => import("@com/store/setting/Persist.vue")
  },
  {
    path: "/store/storeDetail",
    name: "store_setting_detail",
    component: () => import("@com/store/setting/Detail.vue")
  },
  {
    path: "/store/storeEditor",
    name: "store_setting_editor",
    component: () => import("@com/store/setting/Editor.vue")
  },
  {
    path: "/store/storeDetailPersist",
    name: "store_setting_detail_persist",
    component: () => import("@com/store/setting/DetailPersist.vue")
  },
  {
    path: "/store/storeDetailEditor",
    name: "store_setting_detail_merge",
    component: () => import("@com/store/setting/DetailEditor.vue")
  }
];

export { storeSetting };
