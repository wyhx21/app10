<template>
  <app-page-container>
    <template #header>
      <div class="app-data-item" v-if="persistSupplier['id']">
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
              <app-fiance-num
                :model-value="persistSupplier['extraAmount']"
                @update:modelValue="updateExtraAmount"
                placeholder="额外金额"
              />
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <van-field
                class="app-data-item_remark"
                :model-value="persistSupplier['orderRemark']"
                @update:modelValue="updateOrderRemark"
                rows="2"
                autosize
                type="textarea"
                placeholder="备注信息"
              />
            </td>
          </tr>
        </table>
      </div>
      <div class="app-data-item" v-else @click="selectSupplier">
        <div class="app-data-item_placeholder"><span>点击选择供应商</span></div>
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
        :class="{ 'app-data-item_cur': currentProdId == item['id'] }"
        @click="currentProdId = item['id']"
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
import { mapGetters, mapMutations, mapActions } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppTextShow from "@com/common/Number.vue";
import AppFianceNum from "@com/common/FianceNum.vue";
import AppItemRow from "./PersistProductItem.vue";
import { Confirm, Message } from "@utils/messagerUtil.js";
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
      loading: false,
      currentProdId: null
    };
  },
  methods: {
    ...mapMutations("page/purchaseOrder", [
      "persistSupplierAmount",
      "persistSupplierRemark"
    ]),
    ...mapActions("page/purchaseOrder", ["persistOrder"]),
    selectSupplier() {
      this.$router.replace("/order/purchaseSupplier");
    },
    selectProduct() {
      this.$router.replace("/order/purchaseProduct");
    },
    persistData() {
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
      } else {
        Confirm({ message: "确认保存?" })
          .then(() => {
            this.loading = true;
            this.persistOrder()
              .then(() => {
                this.$router.replace("/order/purchase");
                this.loading = false;
              })
              .catch(() => {
                this.loading = false;
              });
          })
          .catch(() => {});
      }
    },
    updateExtraAmount(extraAmount) {
      this.persistSupplierAmount(extraAmount);
    },
    updateOrderRemark(orderRemark) {
      this.persistSupplierRemark(orderRemark);
    }
  }
};
</script>
