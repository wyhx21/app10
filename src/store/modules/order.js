import purchaseOrder from "@store/modules/order/purchaseOrder.js";
import purchaseSupplier from "@store/modules/order/purchaseSupplier.js";
import purchaseProduct from "@store/modules/order/purchaseProduct.js";
import saleOrder from "@store/modules/order/saleOrder.js";
import saleCustomer from "@store/modules/order/saleCustomer.js";
import saleProduct from "@store/modules/order/saleProduct.js";

export default {
  namespaced: true,
  modules: {
    purchaseOrder,
    purchaseSupplier,
    purchaseProduct,
    saleOrder,
    saleCustomer,
    saleProduct
  }
};
