const prodType = [
  {
    path: "/dict/prodType",
    name: "dict_prodType",
    component: () => import("@com/dict/prodType/Index.vue")
  },
  {
    path: "/dict/prodTypeDetail",
    name: "dict_prodType_detail",
    component: () => import("@com/dict/prodType/Detail.vue")
  },
  {
    path: "/dict/prodTypeEditor",
    name: "dict_prodType_editor",
    component: () => import("@com/dict/prodType/Editor.vue")
  },
  {
    path: "/dict/prodTypePersist",
    name: "dict_prodType_persist",
    component: () => import("@com/dict/prodType/Persist.vue")
  }
];

const verifyType = [
  {
    path: "/dict/verifyType",
    name: "dict_verifyType",
    component: () => import("@com/dict/verifyType/Index.vue")
  },
  {
    path: "/dict/verifyTypeDetail",
    name: "dict_verifyType_detail",
    component: () => import("@com/dict/verifyType/Detail.vue")
  },
  {
    path: "/dict/verifyTypeEditor",
    name: "dict_verifyType_editor",
    component: () => import("@com/dict/verifyType/Editor.vue")
  },
  {
    path: "/dict/verifyTypePersist",
    name: "dict_verifyType_persist",
    component: () => import("@com/dict/verifyType/Persist.vue")
  }
];

export { prodType, verifyType };
