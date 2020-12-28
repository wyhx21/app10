<template>
  <span
    class="app-data-item_disable"
    :class="
      data['deleted'] == 1 ? 'app-data-item_effect' : 'app-data-item_ineffect'
    "
  >
    {{ data["enable"] }}
  </span>
  <table width="100%">
    <tr>
      <td width="40%">
        <span class="app-data-item_blod">{{ data["storeCode"] }}</span>
      </td>
      <td width="40%">
        <span class="app-data-item_blod">{{ data["storeName"] }}</span>
      </td>
      <td>
        <span class="app-link" @click="gotoDetail()">详情</span>
      </td>
    </tr>
  </table>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: ["data"],
  methods: {
    ...mapMutations("page/store", ["currentData"]),
    ...mapMutations("page/stroeArea", ["dataList"]),
    gotoDetail() {
      this.currentData(this.data);
      this.dataList();
      this.$router.push("/store/storeDetail");
    }
  }
};
</script>
