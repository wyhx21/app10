import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/basic/cus/query", data, { page, size });

const customerMerge = (data = {}) => axios.doPost("/basic/cus/merge", data);

const customerPersist = (data = {}) => axios.doPost("/basic/cus/persist", data);

export { queryPage, customerMerge, customerPersist };
