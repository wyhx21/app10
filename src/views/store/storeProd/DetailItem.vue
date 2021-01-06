<template>
  <table class="app-data-item-table">
    <tr>
      <td colspan="3">
        <em>订单号</em>
        <span>{{ data["orderNo"] }}</span>
      </td>
    </tr>
    <tr>
      <td width="30%">
        <em>商品名称</em>
        <span>{{ data["prodName"] }}</span>
      </td>
      <td width="30%">
        <em>商品单位</em>
        <span>{{ data["prodUnit"] }}</span>
      </td>
      <td>
        <em>改变类型</em>
        <span>{{ data["detailType"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <em>改变前数量</em>
        <span>{{ data["beforeNum"] }}</span>
      </td>
      <td>
        <em>改变数量</em>
        <span>{{ data["changeNum"] }}</span>
      </td>
      <td>
        <em>改变后数量</em>
        <span>{{ data["afterNum"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <em>更新人</em>
        <span>{{ data["lastModifiedBy"] }}</span>
      </td>
      <td colspan="2">
        <em>更新时间</em>
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
