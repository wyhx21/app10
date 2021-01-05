import axios from "@axios/index.js";

const queryPage = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/store/storeProd/findPage", data, { page, size });

const queryDetail = (data, { page = 1, size = 10 } = {}) =>
  axios.doPost("/store/storeProdDetail/detail", data, { page, size });

const queryByOrderNo = orderNo =>
  axios.doGet(`/store/storeProdDetail/orderNo/${orderNo}`);

const queryProdList = areaId =>
  axios.doGet(`/store/storeProd/prodList/${areaId}`);

export { queryPage, queryDetail, queryByOrderNo, queryProdList };
