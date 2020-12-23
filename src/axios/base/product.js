import axios from '@axios/index.js';

const queryPage = (data, {page=1,size = 10} = {}) => axios.doPost('/basic/product/h5Query', data, {page, size})

const prodType = () => axios.doGet('/system/dic/sysDic/prodType')

const prodMerge = (data) => axios.doPost('/basic/product/merge', data)

const prodPersist = (data) => axios.doPost('/basic/product/persist', data)

export {
  queryPage,
  prodType,
  prodMerge,
  prodPersist
}