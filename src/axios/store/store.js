import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/store/store/query", data, { page, size });

const storeMerge = (data = {}) => axios.doPost("/store/store/merge", data);

const storePersist = (data = {}) => axios.doPost("/store/store/persist", data);

const areaList = (storeId = 0) =>
  axios.doGet(`/store/storeArea/list/${storeId}`);

const areaMerge = (data = {}) => axios.doPost("/store/storeArea/merge", data);

const areaPersist = (data = {}) =>
  axios.doPost("/store/storeArea/persist", data);

export {
  queryPage,
  storeMerge,
  storePersist,
  areaList,
  areaMerge,
  areaPersist
};
