import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/orderInfo/purchaseOrder/query", data, { page, size });

const orderDetail = ({ id }) =>
  axios.doGet(`/orderInfo/orderDetail/purchase/${id}`);

const querySupplier = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/basic/supplier/supplier", data, { page, size });

const queryProduct = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/basic/product/purchase", data, { page, size });

const orderPersist = data =>
  axios.doPost("/orderInfo/purchaseOrder/persist", data);

export { queryPage, orderDetail, querySupplier, queryProduct, orderPersist };
