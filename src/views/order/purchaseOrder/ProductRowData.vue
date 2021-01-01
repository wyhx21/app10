<template>
  <table width="100%">
    <tr>
      <td width="40%">
        <span class="app-data-item_primary">{{ data["prodCode"] }}</span>
      </td>
      <td>
        <span class="app-data-item_primary">{{ data["prodName"] }}</span>
      </td>
    </tr>
    <tr>
      <td>{{ data["prodUnit"] }}</td>
      <td><app-fiance-num :modelValue="data['price']" disabled /></td>
    </tr>
    <tr>
      <td colspan="2">
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
