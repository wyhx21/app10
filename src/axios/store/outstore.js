import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/orderInfo/saleOrder/outstoreOrder", data, { page, size });

const outStore = (data = {}) => axios.doPost("/store/storeProd/outstore", data);

const queryById = id => axios.doGet(`/orderInfo/saleOrder/findByOrderId/${id}`);

const queryDetail = id => axios.doGet(`/orderInfo/orderDetail/outstore/${id}`);

export { queryPage, outStore, queryById, queryDetail };
