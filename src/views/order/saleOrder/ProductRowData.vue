<template>
  <table class="app-data-item-table">
    <tr>
      <td width="40%">
        <em>商品编码</em>
        <span class="app-data-item_primary">{{ data["prodCode"] }}</span>
      </td>
      <td>
        <em>商品名称</em>
        <span class="app-data-item_primary">{{ data["prodName"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <em>单位</em>
        {{ data["prodUnit"] }}
      </td>
      <td>
        <em>销售单价</em>
        <app-fiance-num :modelValue="data['price']" disabled />
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <em>备注</em>
        <p class="app-data-item_remark">{{ data["remark"] }}</p>
      </td>
    </tr>
  </table>
</template>
<script>
import AppFianceNum from "@com/common/FianceNum.vue";
export default {
  components: {
    AppFianceNum
  },
  props: ["data"]
};
</script>
