import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/orderInfo/saleOrder/query", data, { page, size });

const orderDetail = ({ id }) =>
  axios.doGet(`/orderInfo/orderDetail/sale/${id}`);

const orderPersist = data => axios.doPost("/orderInfo/saleOrder/persist", data);

const ordeSubmit = id => axios.doGet(`/orderInfo/saleOrder/submit/${id}`);

const orderTransfer = id => axios.doGet(`/orderInfo/saleOrder/transfer/${id}`);

const orderDelete = id => axios.doGet(`/orderInfo/saleOrder/delete/${id}`);

const queryCustomer = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/basic/cus/customer", data, { page, size });

const queryProduct = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/basic/product/prod", data, { page, size });

export {
  queryPage,
  orderDetail,
  queryCustomer,
  queryProduct,
  orderPersist,
  ordeSubmit,
  orderTransfer,
  orderDelete
};
