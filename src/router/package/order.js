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
  }
];

export { purchaseOrder };
