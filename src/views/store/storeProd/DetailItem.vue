<template>
  <table width="100%">
    <tr>
      <td colspan="3">
        <span>{{ data["orderNo"] }}</span>
      </td>
    </tr>
    <tr>
      <td width="30%">
        <span>{{ data["prodName"] }}</span>
      </td>
      <td width="30%">
        <span>{{ data["prodUnit"] }}</span>
      </td>
      <td>
        <span>{{ data["detailType"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <span>{{ data["beforeNum"] }}</span>
      </td>
      <td>
        <span>{{ data["changeNum"] }}</span>
      </td>
      <td>
        <span>{{ data["afterNum"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <span>{{ data["lastModifiedBy"] }}</span>
      </td>
      <td colspan="2">
        <span>{{ data["lastModifiedDate"] }}</span>
      </td>
    </tr>
  </table>
</template>
<script>
export default {
  props: ["data"]
};
</script>
