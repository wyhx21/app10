<template>
  <table width="100%">
    <tr>
      <td width="50%">
        <span>{{ data["prodName"] }}({{ data["prodCode"] }})</span>
      </td>
      <td>
        <span>{{ data["changeNum"] }}({{ data["prodUnit"] }})</span>
      </td>
    </tr>
    <tr>
      <td>
        <span>{{ data["storeName"] }}({{ data["storeCode"] }})</span>
      </td>
      <td>
        <span>{{ data["areaName"] }}({{ data["areaCode"] }})</span>
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  props: ["data"]
};
</script>
