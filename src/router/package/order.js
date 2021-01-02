const purchaseOrder = [
  {
    path: "/order/purchase",
    name: "order_purchase",
    component: () => import("@views/order/purchaseOrder/Index.vue")
  },
  {
    path: "/order/purchaseParam",
    name: "order_purchase_param",
    component: () => import("@views/order/purchaseOrder/QueryParam.vue")
  },
  {
    path: "/order/purchasePersist",
    name: "order_purchase_persist",
    component: () => import("@views/order/purchaseOrder/Persist.vue")
  },
  {
    path: "/order/purchaseDetail",
    name: "order_purchase_detail",
    component: () => import("@views/order/purchaseOrder/Detail.vue")
  },
  {
    path: "/order/purchaseSupplier",
    name: "order_purchase_supplier",
    component: () => import("@views/order/purchaseOrder/Supplier.vue")
  },
  {
    path: "/order/purchaseProduct",
    name: "order_purchase_product",
    component: () => import("@views/order/purchaseOrder/Product.vue")
  }
];

const saleOrder = [
  {
    path: "/order/sale",
    name: "order_sale",
    component: () => import("@views/order/saleOrder/Index.vue")
  },
  {
    path: "/order/saleParam",
    name: "order_sale_param",
    component: () => import("@views/order/saleOrder/QueryParam.vue")
  },
  {
    path: "/order/saleDetail",
    name: "order_sale_detail",
    component: () => import("@views/order/saleOrder/Detail.vue")
  }
];

export { purchaseOrder, saleOrder };
