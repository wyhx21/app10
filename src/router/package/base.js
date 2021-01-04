const product = [
  {
    path: "/base/product",
    name: "base_product",
    component: () => import("@views/base/product/Index.vue")
  },
  {
    path: "/base/productPersist",
    name: "base_product_persist",
    component: () => import("@views/base/product/ProdPersist.vue")
  },
  {
    path: "/base/productDetail",
    name: "base_product_detail",
    component: () => import("@views/base/product/ProdDetail.vue")
  },
  {
    path: "/base/productEditor",
    name: "base_product_editor",
    component: () => import("@views/base/product/ProdEditor.vue")
  }
];

const customer = [
  {
    path: "/base/customer",
    name: "base_customer",
    component: () => import("@views/base/customer/Index.vue")
  },
  {
    path: "/base/customerDetail",
    name: "base_customer_detail",
    component: () => import("@views/base/customer/Detail.vue")
  },
  {
    path: "/base/customerEditor",
    name: "base_customer_editor",
    component: () => import("@views/base/customer/Editor.vue")
  },
  {
    path: "/base/customerPersist",
    name: "base_customer_persist",
    component: () => import("@views/base/customer/Persist.vue")
  }
];

const supplier = [
  {
    path: "/base/supplier",
    name: "base_supplier",
    component: () => import("@views/base/supplier/Index.vue")
  },
  {
    path: "/base/supplierDetail",
    name: "base_supplier_detail",
    component: () => import("@views/base/supplier/Detail.vue")
  },
  {
    path: "/base/supplierEditor",
    name: "base_supplier_editor",
    component: () => import("@views/base/supplier/Editor.vue")
  },
  {
    path: "/base/supplierPersist",
    name: "base_supplier_persist",
    component: () => import("@views/base/supplier/Persist.vue")
  }
];

export default [...product, ...customer, ...supplier];
