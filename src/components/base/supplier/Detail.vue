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
    <div class="app-data-editor">
      <span @click="editorData" v-if="perMerge">编辑</span>
    </div>
  </app-page-container>
</template>
<script>
import { mapGetters } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
export default {
  components: {
    AppPageContainer
  },
  computed: {
    ...mapGetters("page/supplier", ["currentData", "perMerge"])
  },
  methods: {
    editorData() {
      this.$router.replace("/base/supplierEditor");
    }
  }
};
</script>
