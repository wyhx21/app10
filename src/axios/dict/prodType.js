import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/system/dic/prodType/query", data, { page, size });

const prodTypeMerge = (data = {}) =>
  axios.doPost("/system/dic/prodType/merge", data);

const prodTypePersist = (data = {}) =>
  axios.doPost("/system/dic/prodType/persist", data);

export { queryPage, prodTypeMerge, prodTypePersist };
