import product from "@store/modules/base/product.js";
import customer from "@store/modules/base/customer.js";
import supplier from "@store/modules/base/supplier.js";
import prodType from "@store/modules/dict/prodType.js";

export default {
  namespaced: true,
  modules: {
    product,
    customer,
    supplier,
    prodType
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
