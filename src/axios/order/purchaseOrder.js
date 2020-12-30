import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/orderInfo/purchaseOrder/query", data, { page, size });

const orderDetail = ({ id }) =>
  axios.doGet(`/orderInfo/orderDetail/purchase/${id}`);

export { queryPage, orderDetail };
