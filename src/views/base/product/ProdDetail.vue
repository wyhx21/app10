<template>
  <app-page-container>
    <div class="app-data-detail">
      <table style="width:100%">
        <tr>
          <td class="app-table-lable4">商品编码</td>
          <td>
            <span>{{ currentProduct["prodCode"] }}</span>
          </td>
        </tr>
        <tr>
          <td class="app-table-lable4">商品名称</td>
          <td>
            <span>{{ currentProduct["prodName"] }}</span>
          </td>
        </tr>
        <tr>
          <td class="app-table-lable4">商品类型</td>
          <td>
            <span>{{ currentProduct["prodTypeName"] }}</span>
          </td>
        </tr>
        <tr>
          <td class="app-table-lable4">商品单位</td>
          <td>
            <span>{{ currentProduct["prodUnit"] }}</span>
          </td>
        </tr>
        <tr>
          <td class="app-table-lable4">采购单价</td>
          <td>
            <app-fiance-num
              v-model="currentProduct['purchPrice']"
              disabled
            ></app-fiance-num>
          </td>
        </tr>
        <tr>
          <td class="app-table-lable4">销售单价</td>
          <td>
            <app-fiance-num
              v-model="currentProduct['salePrice']"
              disabled
            ></app-fiance-num>
          </td>
        </tr>
        <tr>
          <td class="app-table-lable4">是否有效</td>
          <td>
            <span>{{ currentProduct["enable"] }}</span>
          </td>
        </tr>
        <tr>
          <td class="app-table-lable4">备注信息</td>
          <td>
            <span>{{ currentProduct["remark"] }}</span>
          </td>
        </tr>
      </table>
    </div>
    <div class="app-bottom-fixed-search-button">
      <span @click="editorProd" v-if="perMerge">编辑</span>
    </div>
  </app-page-container>
</template>
<script>
import AppPageContainer from "@com/common/PageContainer.vue";
import AppFianceNum from "@com/common/FianceNum.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    AppPageContainer,
    AppFianceNum
  },
  computed: {
    ...mapGetters("appBase/product", ["currentProduct", "perMerge"])
  },
  methods: {
    editorProd() {
      this.$router.replace("/base/productEditor");
    }
  }
};
</script>
