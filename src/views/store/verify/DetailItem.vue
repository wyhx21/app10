<template>
  <table class="app-data-item-table">
    <tr>
      <td width="50%">
        <em>区域编码</em>
        <span>{{ data["areaCode"] }}</span>
      </td>
      <td>
        <em>区域名称</em>
        <span>{{ data["areaName"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <em>商品编码</em>
        <span>{{ data["prodCode"] }}</span>
      </td>
      <td>
        <em>商品名称</em>
        <span>{{ data["prodName"] }}</span>
      </td>
    </tr>
    <tr>
      <td>
        <span>核销数量</span>
      </td>
      <td>
        <em>核销数量</em>
        <span>{{ data["prodNum"] }}({{ data["prodUnit"] }})</span>
      </td>
    </tr>

    <tr>
      <td>
        <span>改变数量</span>
      </td>
      <td>
        <em>改变数量</em>
        <span>{{ data["changeNum"] }}({{ data["prodUnit"] }})</span>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <em>备注信息</em>
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
