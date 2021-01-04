<template>
  <app-page-container>
    <template #header>
      <div class="app-data-item">
        <app-row-data :data="currentData" showDetail />
      </div>
    </template>
    <div class="app-data-item">
      <div v-if="perOrderStore">
        <div
          v-for="item of orderStoreList"
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
      <span @click="goBack">返回</span>
    </div>
  </app-page-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppRowData from "./RowData.vue";
import AppOrderDetail from "./DetailStoreItem.vue";
export default {
  components: {
    AppPageContainer,
    AppRowData,
    AppOrderDetail
  },
  computed: {
    ...mapGetters("appOrder/saleOrder", [
      "orderStoreList",
      "perOrderStore",
      "currentData"
    ])
  },
  data() {
    return {
      currentDetailId: null
    };
  },
  beforeMount() {
    this.orderStoreInfo();
  },
  methods: {
    ...mapActions("appOrder/saleOrder", ["orderStoreInfo"]),
    goBack() {
      this.$router.push("/order/saleDetail");
    }
  }
};
</script>
