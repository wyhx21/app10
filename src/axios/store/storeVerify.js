import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/store/storeVerifi/findPage", data, { page, size });

const queryDetail = id => axios.doGet(`/store/storeVerifiDetail/detail/${id}`);

const persistRecord = data => axios.doPost(`/store/storeVerifi/persist`, data);

const confirmRecord = id => axios.doGet(`/store/storeVerifi/confirm/${id}`);

const deleteRecord = id => axios.doGet(`/store/storeVerifi/delete/${id}`);

export { queryPage, queryDetail, persistRecord, confirmRecord, deleteRecord };
