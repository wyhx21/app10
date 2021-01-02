<template>
  <app-page-container>
    <div class="app-data-detail">
      <table style="width:100%">
        <tr>
          <td class="app-table-lable4">供应商编码</td>
          <td>{{ currentData["supplierCode"] }}</td>
        </tr>
        <tr>
          <td class="app-table-lable4">供应商名称</td>
          <td>{{ currentData["supplierName"] }}</td>
        </tr>
        <tr>
          <td class="app-table-lable4">联系人</td>
          <td>
            {{ currentData["linkName"] }} ({{
              currentData["sex"] == 0 ? "先生" : "女士"
            }})
          </td>
        </tr>
        <tr>
          <td class="app-table-lable4">联系方式</td>
          <td>{{ currentData["mobile"] }}</td>
        </tr>
        <tr>
          <td class="app-table-lable4">状态</td>
          <td>{{ currentData["enable"] }}</td>
        </tr>
        <tr>
          <td class="app-table-lable4">地址</td>
          <td>{{ currentData["address"] }}</td>
        </tr>
        <tr>
          <td class="app-table-lable4">备注</td>
          <td>{{ currentData["remark"] }}</td>
        </tr>
      </table>
    </div>
    <div class="app-bottom-fixed-search-button">
      <span @click="editorData" v-if="perMerge">编辑</span>
      <span
        @click="queryPurchaseOrder"
        v-if="purchaseQuery && currentData['deleted'] == 1"
        >订单查询</span
      >
      <span
        @click="persistPurchaseOrder"
        v-if="purchasePersist && currentData['deleted'] == 1"
        >订单新增</span
      >
    </div>
  </app-page-container>
</template>
<script>
import { mapGetters, mapMutations } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
export default {
  components: {
    AppPageContainer
  },
  computed: {
    ...mapGetters("page/supplier", [
      "currentData",
      "perMerge",
      "purchasePersist",
      "purchaseQuery"
    ])
  },
  methods: {
    ...mapMutations("page/purchaseOrder", ["queryParam", "persistSupplier"]),
    editorData() {
      this.$router.replace("/base/supplierEditor");
    },
    persistPurchaseOrder() {
      this.persistSupplier(this.currentData);
      this.$router.push("/order/purchasePersist");
    },
    queryPurchaseOrder() {
      const cusCode = this.currentData["supplierCode"];
      const orderStatus = "";
      this.queryParam({ cusCode, orderStatus });
      this.$router.push("/order/purchase");
    }
  }
};
</script>
