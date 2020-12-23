import axios from '@axios/index.js';

const queryPage = (data, {page=1,size = 10} = {}) => axios.doPost('/basic/cus/query', data, {page, size})

export {
  queryPage,
}