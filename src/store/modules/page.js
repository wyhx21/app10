import prodType from "@store/modules/dict/prodType.js";
import verifyType from "@store/modules/dict/verifyType.js";
import purchaseOrder from "@store/modules/order/purchaseOrder.js";
import purchaseSupplier from "@store/modules/order/purchaseSupplier.js";
import purchaseProduct from "@store/modules/order/purchaseProduct.js";
import saleOrder from "@store/modules/order/saleOrder.js";
import saleCustomer from "@store/modules/order/saleCustomer.js";
import saleProduct from "@store/modules/order/saleProduct.js";

export default {
  namespaced: true,
  modules: {
    prodType,
    verifyType,
    purchaseOrder,
    purchaseSupplier,
    purchaseProduct,
    saleOrder,
    saleCustomer,
    saleProduct
  },
  state: {
    style: {
      dividerStyle: {
        color: "#1989fa",
        borderColor: "#1989fa",
        padding: "0 16px",
        margin: "5px"
      },
      popupQueryParam: {
        height: "100%",
        width: "70%"
      }
    },
    msg: {
      finishedText: "我也是有底线的..."
    }
  },
  getters: {
    dividerStyle: _state => _state.style.dividerStyle,
    popupQueryParamStyle: _state => _state.style.popupQueryParam,
    finishedText: _state => _state.msg.finishedText
  }
};
