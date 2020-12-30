<template>
  <app-page-container>
    <div class="app-data-detail">
      <table style="width:100%">
        <tr>
          <td class="app-table-lable4">客户编码</td>
          <td>{{ currentCustomer["cusCode"] }}</td>
        </tr>
        <tr>
          <td class="app-table-lable4">客户名称</td>
          <td>{{ currentCustomer["cusName"] }}</td>
        </tr>
        <tr>
          <td class="app-table-lable4">联系人</td>
          <td>
            {{ currentCustomer["linkName"] }} ({{
              currentCustomer["sex"] == 0 ? "先生" : "女士"
            }})
          </td>
        </tr>
        <tr>
          <td class="app-table-lable4">联系方式</td>
          <td>{{ currentCustomer["mobile"] }}</td>
        </tr>
        <tr>
          <td class="app-table-lable4">状态</td>
          <td>{{ currentCustomer["enable"] }}</td>
        </tr>
        <tr>
          <td class="app-table-lable4">地址</td>
          <td>{{ currentCustomer["address"] }}</td>
        </tr>
        <tr>
          <td class="app-table-lable4">备注</td>
          <td>{{ currentCustomer["remark"] }}</td>
        </tr>
      </table>
    </div>
    <div class="app-bottom-fixed-search-button">
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
    ...mapGetters("page/customer", ["currentCustomer", "perMerge"])
  },
  methods: {
    editorData() {
      this.$router.replace("/base/customerEditor");
    }
  }
};
</script>
