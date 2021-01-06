<template>
  <table class="app-data-item-table">
    <tr>
      <td width="30%">
        <em>客户编码</em>
        <span class="app-data-item_primary">{{ data["cusCode"] }}</span>
      </td>
      <td width="55%">
        <em>客户名称</em>
        <span class="app-data-item_primary">{{ data["cusName"] }}</span>
      </td>
      <td rowspan="2">
        <span class="app-link" @click="selectRecode()">选择</span>
      </td>
    </tr>
    <tr>
      <td>
        <em>联系人</em>
        <span>{{ data["linkName"] }}</span>
      </td>
      <td>
        <em>联系方式</em>
        <span>{{ data["mobile"] }}</span>
      </td>
    </tr>
    <tr>
      <td colspan="3">
        <em>地址</em>
        <p class="app-data-item_remark">{{ data["address"] }}</p>
      </td>
    </tr>
    <tr>
      <td colspan="3">
        <em>备注</em>
        <p class="app-data-item_remark">{{ data["remark"] }}</p>
      </td>
    </tr>
  </table>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  props: ["data"],
  methods: {
    ...mapMutations("appOrder/saleOrder", ["persistCustomer"]),
    selectRecode() {
      this.persistCustomer(this.data);
      this.$router.push("/order/salePersist");
    }
  }
};
</script>
