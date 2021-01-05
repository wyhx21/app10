import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/store/dispacher/findPage", data, { page, size });

const queryDetail = id => axios.doGet(`/store/dispacherDetail/detail/${id}`);

const persistRecord = data => axios.doPost(`/store/dispacher/persist`, data);

const confirmRecord = id => axios.doGet(`/store/dispacher/merge/${id}`);

const deleteRecord = id => axios.doGet(`/store/dispacher/delete/${id}`);

export { queryPage, queryDetail, persistRecord, confirmRecord, deleteRecord };
