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
  }
];

export { storeSetting };
