<template>
  <table width="100%">
    <tr>
      <td colspan="2">
        <span>{{ data["orderNo"] }}</span>
      </td>
      <td rowspan="3">
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
      <td><app-fiance-num :value="data['orderAmount']" /></td>
      <td><app-fiance-num :value="data['extraAmount']" /></td>
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
