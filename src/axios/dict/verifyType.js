import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/system/dic/verifyType/query", data, { page, size });

const verifyTypeMerge = (data = {}) =>
  axios.doPost("/system/dic/verifyType/merge", data);

const verifyTypePersist = (data = {}) =>
  axios.doPost("/system/dic/verifyType/persist", data);

const verifyTypeList = () => axios.doGet("/system/dic/sysDic/verifiType");

export { queryPage, verifyTypeMerge, verifyTypePersist, verifyTypeList };
