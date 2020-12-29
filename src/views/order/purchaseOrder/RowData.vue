<template>
  <table width="100%">
    <tr>
      <td colspan="2">
        <span>{{ data["orderNo"] }}</span>
      </td>
      <td rowspan="2">
        <span class="app-link" @click="gotoDetail()">详情</span>
      </td>
    </tr>
    <tr>
      <td width="40%">
        <span>{{ data["supplierCode"] }}</span>
      </td>
      <td width="40%">
        <span>{{ data["supplierName"] }}</span>
      </td>
    </tr>
    <tr>
      <td><app-fiance-num :modelValue="data['orderAmount']" disabled /></td>
      <td colspan="2">
        <span>{{ data["createdDate"] }}</span>
      </td>
    </tr>
    <tr>
      <td><app-fiance-num :modelValue="data['extraAmount']" disabled /></td>
      <td colspan="2">
        <span>{{ data["orderTime"] }}</span>
      </td>
    </tr>
  </table>

  <span class="app-data-item_disable app-data-item_effect">{{
    data["statusValue"]
  }}</span>
</template>

<script>
import AppFianceNum from "@com/common/FianceNum.vue";
export default {
  components: {
    AppFianceNum
  },
  props: ["data"],
  methods: {
    gotoDetail() {}
  }
};
</script>
