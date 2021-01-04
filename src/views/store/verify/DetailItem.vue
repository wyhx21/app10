<template>
  <table width="100%">
    <tr>
      <td width="50%">
        <span>{{ data["areaCode"] }}</span>
      </td>
      <td>
        <span>{{ data["areaName"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <span>{{ data["prodCode"] }}</span>
      </td>
      <td>
        <span>{{ data["prodName"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <span>{{ data["prodNum"] }}({{ data["prodUnit"] }})</span>
      </td>
      <td>
        <span>{{ data["changeNum"] }}({{ data["prodUnit"] }})</span>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <p class="app-data-item_remark">{{ data["remark"] }}</p>
      </td>
    </tr>
  </table>

  <span class="app-data-item_deleted app-data-item_deleted_1">{{
    data["verifiType"]
  }}</span>
</template>
<script>
export default {
  props: {
    data: {
      default: {}
    }
  }
};
</script>
