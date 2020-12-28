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
        <span class="app-data-item_blod">{{ data["cusCode"] }}</span>
      </td>
      <td width="55%">
        <span class="app-data-item_blod">{{ data["cusName"] }}</span>
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
        <address class="app-data-item_thin">{{ data["address"] }}</address>
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
