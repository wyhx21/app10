<template>
  <span
    class="app-data-item_deleted"
    :class="
      data['deleted'] == 1
        ? 'app-data-item_deleted_1'
        : 'app-data-item_deleted_0'
    "
  >
    {{ data["enable"] }}
  </span>
  <table width="100%">
    <tr>
      <td width="30%">
        <span class="app-data-item_primary">{{ data["cusCode"] }}</span>
      </td>
      <td width="55%">
        <span class="app-data-item_primary">{{ data["cusName"] }}</span>
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
    ...mapMutations("page/customer", ["currentCustomer"]),
    gotoDetail() {
      this.currentCustomer(this.data);
      this.$router.push("/base/customerDetail");
    }
  }
};
</script>
