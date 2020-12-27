import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/store/store/query", data, { page, size });

const storeMerge = (data = {}) => axios.doPost("/store/store/merge", data);

const storePersist = (data = {}) => axios.doPost("/store/store/persist", data);

export { queryPage, storeMerge, storePersist };
