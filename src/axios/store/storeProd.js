import axios from "@axios/index.js";

const queryByOrderNo = orderNo =>
  axios.doGet(`/store/storeProdDetail/orderNo/${orderNo}`);

export { queryByOrderNo };
