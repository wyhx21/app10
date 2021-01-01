<template>
  <app-page-container>
    <template #header>
      <div class="app-data-item">
        <table width="100%">
          <tr>
            <td width="35%">
              <app-text-show
                :modelValue="persistSupplier['supplierCode']"
                placeholder="供应商编码"
                disabled
              />
            </td>
            <td width="35%">
              <app-text-show
                :modelValue="persistSupplier['supplierName']"
                placeholder="供应商名称"
                disabled
              />
            </td>
            <td>
              <app-fiance-num v-model="extraAmount" placeholder="额外金额" />
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <van-field
                class="app-data-item_remark"
                v-model="remark"
                rows="2"
                autosize
                type="textarea"
                placeholder="备注信息"
              />
            </td>
          </tr>
        </table>
      </div>
    </template>

    <div
      class="app-data-item"
      v-if="perPersist && persistProductList.length > 0"
    >
      <div
        v-for="item of persistProductList"
        :key="item['id']"
        class="app-data-item_detail"
      >
        <app-item-row :data="item" />
      </div>
    </div>
    <div class="app-data-item" v-else-if="perPersist">
      <div class="app-data-item_placeholder" @click="selectProduct">
        <span>点击添加商品</span>
      </div>
    </div>
    <div class="app-data-item" v-else>
      <div class="app-data-item_placeholder"><span>您的权限不足</span></div>
    </div>

    <div class="app-bottom-fixed-search-button" v-if="perPersist">
      <span @click="persistData">保存订单</span>
      <span @click="selectSupplier">选择供应商</span>
      <span @click="selectProduct">添加商品</span>
    </div>
  </app-page-container>
</template>
<script>
import { mapGetters } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppTextShow from "@com/common/Number.vue";
import AppFianceNum from "@com/common/FianceNum.vue";
import AppItemRow from "./PersistProductItem.vue";
export default {
  components: {
    AppPageContainer,
    AppFianceNum,
    AppTextShow,
    AppItemRow
  },
  computed: {
    ...mapGetters("page/purchaseOrder", ["persistSupplier", "perPersist"]),
    ...mapGetters("page/purchaseOrder", ["persistProductList"])
  },
  data() {
    return {
      extraAmount: "0",
      remark: ""
    };
  },
  methods: {
    selectSupplier() {
      this.$router.replace("/order/purchaseSupplier");
    },
    selectProduct() {
      this.$router.replace("/order/purchaseProduct");
    },
    persistData() {
      console.log(this.persistProductList);
    }
  }
};
</script>
