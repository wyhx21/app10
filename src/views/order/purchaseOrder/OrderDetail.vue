<template>
  <table width="100%">
    <tr>
      <td width="35%">
        <span>{{ data["prodCode"] }}</span>
      </td>
      <td width="35%">
        <span>{{ data["prodName"] }}</span>
      </td>
      <td>
        <span>{{ data["prodUnit"] }}</span>
      </td>
    </tr>
    <tr>
      <td><app-fiance-num :modelValue="data['prodPrice']" disabled /></td>
      <td>
        <app-number v-model="data['prodNum']" disabled></app-number>
      </td>
      <td><app-fiance-num :modelValue="data['prodAmount']" disabled /></td>
    </tr>
    <tr>
      <td colspan="3">
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
    AppFianceNum,AppNumber
  },
  props: ["data"]
};
</script>
