import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/basic/supplier/query", data, { page, size });

const supplierMerge = (data = {}) =>
  axios.doPost("/basic/supplier/merge", data);

const supplierPersist = (data = {}) =>
  axios.doPost("/basic/supplier/persist", data);

export { queryPage, supplierMerge, supplierPersist };
