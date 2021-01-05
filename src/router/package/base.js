const product = [
  {
    path: "/base/product",
    name: "base_product",
    meta: { pageName: "商品信息" },
    component: () => import("@views/base/product/Index.vue")
  },
  {
    path: "/base/productPersist",
    name: "base_product_persist",
    meta: { pageName: "商品信息-新增" },
    component: () => import("@views/base/product/ProdPersist.vue")
  },
  {
    path: "/base/productDetail",
    name: "base_product_detail",
    meta: { pageName: "商品信息-详情" },
    component: () => import("@views/base/product/ProdDetail.vue")
  },
  {
    path: "/base/productEditor",
    name: "base_product_editor",
    meta: { pageName: "商品信息-编辑" },
    component: () => import("@views/base/product/ProdEditor.vue")
  }
];

const customer = [
  {
    path: "/base/customer",
    name: "base_customer",
    meta: { pageName: "客户信息" },
    component: () => import("@views/base/customer/Index.vue")
  },
  {
    path: "/base/customerDetail",
    name: "base_customer_detail",
    meta: { pageName: "客户信息-详情" },
    component: () => import("@views/base/customer/Detail.vue")
  },
  {
    path: "/base/customerEditor",
    name: "base_customer_editor",
    meta: { pageName: "客户信息-编辑" },
    component: () => import("@views/base/customer/Editor.vue")
  },
  {
    path: "/base/customerPersist",
    name: "base_customer_persist",
    meta: { pageName: "客户信息-新增" },
    component: () => import("@views/base/customer/Persist.vue")
  }
];

const supplier = [
  {
    path: "/base/supplier",
    name: "base_supplier",
    meta: { pageName: "供应商信息" },
    component: () => import("@views/base/supplier/Index.vue")
  },
  {
    path: "/base/supplierDetail",
    name: "base_supplier_detail",
    meta: { pageName: "供应商信息-详情" },
    component: () => import("@views/base/supplier/Detail.vue")
  },
  {
    path: "/base/supplierEditor",
    name: "base_supplier_editor",
    meta: { pageName: "供应商信息-编辑" },
    component: () => import("@views/base/supplier/Editor.vue")
  },
  {
    path: "/base/supplierPersist",
    name: "base_supplier_persist",
    meta: { pageName: "供应商信息-新增" },
    component: () => import("@views/base/supplier/Persist.vue")
  }
];

export default [...product, ...customer, ...supplier];
