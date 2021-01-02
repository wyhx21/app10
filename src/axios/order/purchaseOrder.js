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

const ordeSubmit = id => axios.doGet(`/orderInfo/purchaseOrder/submit/${id}`);

const orderTransfer = id =>
  axios.doGet(`/orderInfo/purchaseOrder/transfer/${id}`);

const orderDelete = id => axios.doGet(`/orderInfo/purchaseOrder/delete/${id}`);

export {
  queryPage,
  orderDetail,
  querySupplier,
  queryProduct,
  orderPersist,
  ordeSubmit,
  orderTransfer,
  orderDelete
};
