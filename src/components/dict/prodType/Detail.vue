<template>
  <app-page-container>
    <div class="app-data-detail">
      <table style="width:100%">
        <tr>
          <td class="app-table-lable4">类型编码</td>
          <td>{{ currentData["dicKey"] }}</td>
        </tr>
        <tr>
          <td class="app-table-lable4">类型名称</td>
          <td>{{ currentData["dicValue"] }}</td>
        </tr>
        <tr>
          <td class="app-table-lable4">排序</td>
          <td>
            {{ currentData["dicSort"] }}
          </td>
        </tr>
        <tr>
          <td class="app-table-lable4">状态</td>
          <td>{{ currentData["enable"] }}</td>
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
    ...mapGetters("page/prodType", ["currentData", "perMerge"])
  },
  methods: {
    editorData() {
      this.$router.replace("/dict/prodTypeEditor");
    }
  }
};
</script>
