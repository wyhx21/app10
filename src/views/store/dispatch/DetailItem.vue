<template>
  <table width="100%">
    <tr>
      <td width="40%">调出区域</td>
      <td>{{ data["areaName"] }}({{ data["areaCode"] }})</td>
    </tr>
    <tr>
      <td>调入区域</td>
      <td>{{ data["toAreaName"] }}({{ data["toAreaCode"] }})</td>
    </tr>
    <tr>
      <td>调度商品</td>
      <td>{{ data["prodName"] }}({{ data["prodCode"] }})</td>
    </tr>
    <tr>
      <td>调度数量</td>
      <td>{{ data["prodNum"] }}({{ data["prodUnit"] }})</td>
    </tr>
  </table>
</template>
<script>
export default {
  props: ["data"]
};
</script>
