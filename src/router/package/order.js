const purchaseOrder = [
  {
    path: "/order/purchase",
    name: "order_purchase",
    meta: { pageName: "采购订单" },
    component: () => import("@views/order/purchaseOrder/Index.vue")
  },
  {
    path: "/order/purchaseParam",
    name: "order_purchase_param",
    meta: { pageName: "采购订单-筛选" },
    component: () => import("@views/order/purchaseOrder/QueryParam.vue")
  },
  {
    path: "/order/purchasePersist",
    name: "order_purchase_persist",
    meta: { pageName: "采购订单-新增" },
    component: () => import("@views/order/purchaseOrder/Persist.vue")
  },
  {
    path: "/order/purchaseDetail",
    name: "order_purchase_detail",
    meta: { pageName: "采购订单-详情" },
    component: () => import("@views/order/purchaseOrder/Detail.vue")
  },
  {
    path: "/order/purchaseSupplier",
    name: "order_purchase_supplier",
    meta: { pageName: "采购订单-供应商" },
    component: () => import("@views/order/purchaseOrder/Supplier.vue")
  },
  {
    path: "/order/purchaseProduct",
    name: "order_purchase_product",
    meta: { pageName: "采购订单-商品" },
    component: () => import("@views/order/purchaseOrder/Product.vue")
  },
  {
    path: "/order/purchaseStore",
    name: "order_purchase_store",
    meta: { pageName: "采购订单-入库详情" },
    component: () => import("@views/order/purchaseOrder/DetailStore.vue")
  }
];

const saleOrder = [
  {
    path: "/order/sale",
    name: "order_sale",
    meta: { pageName: "销售订单" },
    component: () => import("@views/order/saleOrder/Index.vue")
  },
  {
    path: "/order/saleParam",
    name: "order_sale_param",
    meta: { pageName: "销售订单-筛选" },
    component: () => import("@views/order/saleOrder/QueryParam.vue")
  },
  {
    path: "/order/saleDetail",
    name: "order_sale_detail",
    meta: { pageName: "销售订单-详情" },
    component: () => import("@views/order/saleOrder/Detail.vue")
  },
  {
    path: "/order/salePersist",
    name: "order_sale_persist",
    meta: { pageName: "销售订单-新增" },
    component: () => import("@views/order/saleOrder/Persist.vue")
  },
  {
    path: "/order/saleCustomer",
    name: "order_sale_customer",
    meta: { pageName: "销售订单-客户" },
    component: () => import("@views/order/saleOrder/Customer.vue")
  },
  {
    path: "/order/saleProduct",
    name: "order_sale_product",
    meta: { pageName: "销售订单-商品" },
    component: () => import("@views/order/saleOrder/Product.vue")
  },
  {
    path: "/order/saleStore",
    name: "order_sale_store",
    meta: { pageName: "销售订单-出库详情" },
    component: () => import("@views/order/saleOrder/DetailStore.vue")
  }
];

export default [...purchaseOrder, ...saleOrder];
