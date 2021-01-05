import storeAreaParam from "@store/modules/store/storeAreaParam.js";
import storeVerify from "@store/modules/store/storeVerify.js";
import storeProd from "@store/modules/store/storeProd.js";
import storeProdDetail from "@store/modules/store/storeProdDetail.js";
import store from "@store/modules/store/store.js";
import storeArea from "@store/modules/store/storeArea.js";
import instore from "@store/modules/store/instore.js";
import outstore from "@store/modules/store/outstore.js";
import storeDispatch from "@store/modules/store/storeDispatch.js";

export default {
  namespaced: true,
  modules: {
    storeAreaParam,
    storeVerify,
    storeProd,
    storeProdDetail,
    store,
    storeArea,
    instore,
    outstore,
    storeDispatch
  }
};
