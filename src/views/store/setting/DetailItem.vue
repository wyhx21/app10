<template>
  <table width="100%">
    <tr>
      <td width="40%">
        <span>{{ data["areaCode"] }}</span>
      </td>
      <td>
        <span>{{ data["areaName"] }}</span>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <p class="app-data-item_remark">{{ data["remark"] }}</p>
      </td>
    </tr>
  </table>

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
</template>
<script>
export default {
  props: ["data"]
};
</script>
