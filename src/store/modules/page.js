import product from "@store/modules/base/product.js";
import customer from "@store/modules/base/customer.js";

export default {
  namespaced: true,
  modules: {
    product,
    customer
  },
  state: {
    style: {
      dividerStyle: {
        color: "#1989fa",
        borderColor: "#1989fa",
        padding: "0 16px",
        margin: "5px"
      }
    }
  },
  getters: {
    dividerStyle: _state => _state.style.dividerStyle
  }
};
