const prodType = [
  {
    path: "/dict/prodType",
    name: "dict_prodType",
    meta: { pageName: "商品类型" },
    component: () => import("@views/dict/prodType/Index.vue")
  },
  {
    path: "/dict/prodTypeDetail",
    name: "dict_prodType_detail",
    meta: { pageName: "商品类型-详情" },
    component: () => import("@views/dict/prodType/Detail.vue")
  },
  {
    path: "/dict/prodTypeEditor",
    name: "dict_prodType_editor",
    meta: { pageName: "商品类型-编辑" },
    component: () => import("@views/dict/prodType/Editor.vue")
  },
  {
    path: "/dict/prodTypePersist",
    name: "dict_prodType_persist",
    meta: { pageName: "商品类型-新增" },
    component: () => import("@views/dict/prodType/Persist.vue")
  }
];

const verifyType = [
  {
    path: "/dict/verifyType",
    name: "dict_verifyType",
    meta: { pageName: "核销类型" },
    component: () => import("@views/dict/verifyType/Index.vue")
  },
  {
    path: "/dict/verifyTypeDetail",
    name: "dict_verifyType_detail",
    meta: { pageName: "核销类型-详情" },
    component: () => import("@views/dict/verifyType/Detail.vue")
  },
  {
    path: "/dict/verifyTypeEditor",
    name: "dict_verifyType_editor",
    meta: { pageName: "核销类型-编辑" },
    component: () => import("@views/dict/verifyType/Editor.vue")
  },
  {
    path: "/dict/verifyTypePersist",
    name: "dict_verifyType_persist",
    meta: { pageName: "核销类型-新增" },
    component: () => import("@views/dict/verifyType/Persist.vue")
  }
];

export default [...prodType, ...verifyType];
