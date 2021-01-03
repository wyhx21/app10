import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/orderInfo/purchaseOrder/instoreOrder", data, { page, size });

const inStore = (data = {}) => axios.doPost("/store/storeProd/instore", data);

export { queryPage, inStore };
