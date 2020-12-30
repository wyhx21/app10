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
      <td width="30%">
        <span class="app-data-item_blod">{{ data["supplierCode"] }}</span>
      </td>
      <td width="55%">
        <span class="app-data-item_blod">{{ data["supplierName"] }}</span>
      </td>
      <td rowspan="2">
        <span class="app-link" @click="gotoDetail()">详情</span>
      </td>
    </tr>
    <tr>
      <td>{{ data["linkName"] }}</td>
      <td>{{ data["mobile"] }}</td>
    </tr>
    <tr>
      <td colspan="3">
        <p class="app-data-item_remark">{{ data["address"] }}</p>
      </td>
    </tr>
  </table>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: ["data"],
  methods: {
    ...mapMutations("page/supplier", ["currentData"]),
    gotoDetail() {
      this.currentData(this.data);
      this.$router.push("/base/supplierDetail");
    }
  }
};
</script>
