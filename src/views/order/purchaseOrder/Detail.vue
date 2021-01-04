<template>
  <app-page-container>
    <template #header>
      <div class="app-data-item">
        <app-row-data :data="currentData" showDetail />
      </div>
    </template>
    <div class="app-data-item">
      <div v-if="perDetail">
        <div
          v-for="item of detailList"
          :key="item['id']"
          class="app-data-item_detail"
          @click="currentDetailId = item['id']"
          :class="{
            'app-data-item_cur': currentDetailId == item['id']
          }"
        >
          <app-order-detail :data="item" />
        </div>
      </div>
      <div class="app-data-item_placeholder" v-else>
        暂无权限
      </div>
    </div>
    <div class="app-bottom-fixed-search-button">
      <span
        v-if="perSubmit && currentData['orderStatus'] == 0"
        @click="orderSubmit"
        >提交</span
      >
      <span
        v-else-if="perTransfer && currentData['orderStatus'] == 1"
        @click="orderTransfer"
        >交易</span
      >
      <span
        v-else-if="perInStore && currentData['orderStatus'] == 2"
        @click="orderInstore"
        >入库</span
      >
      <span
        v-else-if="perOrderStore && currentData['orderStatus'] == 4"
        @click="orderDetailStore"
        >入库详情</span
      >
      <span
        v-if="perDelete && currentData['orderStatus'] == 0"
        @click="orderDelete"
        >删除</span
      >
    </div>
  </app-page-container>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppRowData from "./RowData.vue";
import AppOrderDetail from "./OrderDetail.vue";
import { Confirm, Message } from "@utils/messagerUtil.js";
export default {
  components: {
    AppPageContainer,
    AppRowData,
    AppOrderDetail
  },
  computed: {
    ...mapGetters("appOrder/purchaseOrder", [
      "currentData",
      "perDetail",
      "perSubmit",
      "perTransfer",
      "perInStore",
      "perDelete",
      "perOrderStore",
      "detailList"
    ])
  },
  data() {
    return {
      currentDetailId: null,
      loading: false
    };
  },
  beforeMount() {
    this.loadDetail();
  },
  methods: {
    ...mapActions("appOrder/purchaseOrder", [
      "loadDetail",
      "submitOrder",
      "transferOrder",
      "deleteOrder"
    ]),
    ...mapMutations("appStore/instore", ["currentOrderId"]),
    orderSubmit() {
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
      } else {
        Confirm({ message: "确认提交该订单?" })
          .then(() => {
            this.loading = true;
            this.submitOrder(this.currentData)
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
    orderTransfer() {
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
      } else {
        Confirm({ message: "确认交易该订单?" })
          .then(() => {
            this.loading = true;
            this.transferOrder(this.currentData)
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
    orderDelete() {
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
      } else {
        Confirm({ message: "确认删除该订单?" })
          .then(() => {
            this.loading = true;
            this.deleteOrder(this.currentData)
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
    orderDetailStore() {
      this.$router.push("/order/purchaseStore");
    },
    orderInstore() {
      Confirm({ message: "确认前往入库?" })
        .then(() => {
          this.currentOrderId(this.currentData);
          this.$router.push("/store/inStoreDetail");
        })
        .catch(() => {});
    }
  }
};
</script>
