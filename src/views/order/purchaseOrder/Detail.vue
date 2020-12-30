<template>
  <app-page-container>
    <div class="app-data-item">
      <app-row-data :data="currentData" showDetail />
    </div>
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
  </app-page-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppRowData from "./RowData.vue";
import AppOrderDetail from "./OrderDetail.vue";
export default {
  components: {
    AppPageContainer,
    AppRowData,
    AppOrderDetail
  },
  computed: {
    ...mapGetters("page/purchaseOrder", [
      "currentData",
      "perDetail",
      "detailList"
    ])
  },
  data() {
    return {
      currentDetailId: null
    };
  },
  beforeMount() {
    this.loadDetail();
  },
  methods: {
    ...mapActions("page/purchaseOrder", ["loadDetail"])
  }
};
</script>
<style lang="scss">
@import "@style/component/order/purchaseOrder.scss";
</style>
