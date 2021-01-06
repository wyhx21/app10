<template>
  <table class="app-data-item-table">
    <tr>
      <td width="35%">
        <em>商品编码</em>
        <span>{{ data["prodCode"] }}</span>
      </td>
      <td width="35%">
        <em>商品名称</em>
        <span>{{ data["prodName"] }}</span>
      </td>
      <td>
        <em>商品单位</em>
        <span>{{ data["prodUnit"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <em>单价</em>
        <app-fiance-num :modelValue="data['prodPrice']" disabled />
      </td>
      <td>
        <em>数量</em>
        <app-number :modelValue="data['prodNum']" disabled></app-number>
      </td>
      <td>
        <em>总价</em>
        <app-fiance-num :modelValue="data['prodAmount']" disabled />
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
import AppFianceNum from "@com/common/FianceNum.vue";
import AppNumber from "@com/common/Number.vue";
export default {
  components: {
    AppFianceNum,
    AppNumber
  },
  props: ["data"]
};
</script>
