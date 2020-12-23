import product from '@store/modules/base/product.js';
import customer from '@store/modules/base/customer.js';

export default {
  namespaced: true,
  modules: {
    product,
    customer
  }
}