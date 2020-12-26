const product = [
  {
    path: "/base/product",
    name: "base_product",
    component: () => import("@com/base/product/Index.vue")
  },
  {
    path: "/base/productPersist",
    name: "base_product_persist",
    component: () => import("@com/base/product/ProdPersist.vue")
  },
  {
    path: "/base/productDetail",
    name: "base_product_detail",
    component: () => import("@com/base/product/ProdDetail.vue")
  },
  {
    path: "/base/productEditor",
    name: "base_product_editor",
    component: () => import("@com/base/product/ProdEditor.vue")
  }
];

const customer = [
  {
    path: "/base/customer",
    name: "base_customer",
    component: () => import("@com/base/customer/Index.vue")
  },
  {
    path: "/base/customerDetail",
    name: "base_customer_detail",
    component: () => import("@com/base/customer/Detail.vue")
  },
  {
    path: "/base/customerEditor",
    name: "base_customer_editor",
    component: () => import("@com/base/customer/Editor.vue")
  },
  {
    path: "/base/customerPersist",
    name: "base_customer_persist",
    component: () => import("@com/base/customer/Persist.vue")
  }
];

const supplier = [
  {
    path: "/base/supplier",
    name: "base_supplier",
    component: () => import("@com/base/supplier/Index.vue")
  },
  {
    path: "/base/supplierDetail",
    name: "base_supplier_detail",
    component: () => import("@com/base/supplier/Detail.vue")
  },
  {
    path: "/base/supplierEditor",
    name: "base_supplier_editor",
    component: () => import("@com/base/supplier/Editor.vue")
  },
  {
    path: "/base/supplierPersist",
    name: "base_supplier_persist",
    component: () => import("@com/base/supplier/Persist.vue")
  }
];

export { product, customer, supplier };
