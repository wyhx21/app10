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
  }
];

export { purchaseOrder };
