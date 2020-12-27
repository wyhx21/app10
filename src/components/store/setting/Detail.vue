<template>
  <app-page-container>
    <div class="app-data-detail">
      <table style="width:100%">
        <tr>
          <td class="app-table-lable4">仓库编码</td>
          <td>{{ currentData["storeCode"] }}</td>
        </tr>
        <tr>
          <td class="app-table-lable4">仓库名称</td>
          <td>{{ currentData["storeName"] }}</td>
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
    ...mapGetters("page/store", ["currentData", "perMerge"])
  },
  methods: {
    editorData() {
      this.$router.replace("/store/storeEditor");
    }
  }
};
</script>
