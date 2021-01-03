import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/orderInfo/saleOrder/outstoreOrder", data, { page, size });

const outStore = (data = {}) => axios.doPost("/store/storeProd/outstore", data);

export { queryPage, outStore };
