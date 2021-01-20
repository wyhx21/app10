<template>
  <app-page-container>
    <template #header>
      <div class="app-data-item">
        <app-row-data :data="currentData" showDetail />
      </div>
    </template>
    <div v-if="orderStoreList" class="app-data-item">
      <div
        class="app-data-item_detail"
        v-for="item of orderStoreList"
        :key="item['id']"
        :class="{
          'app-data-item_cur': currentDetailId == item['id']
        }"
        @click="currentDetailId = item['id']"
      >
        <app-detail-item :data="item" />
      </div>
    </div>

    <div class="app-bottom-fixed-search-button">
      <span @click="cancelInstore">返回</span>
    </div>
  </app-page-container>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppRowData from "./RowData.vue";
import AppDetailItem from "./DetailItem.vue";
export default {
  components: {
    AppPageContainer,
    AppRowData,
    AppDetailItem
  },
  computed: {
    ...mapGetters("appStore/instore", ["currentData", "orderStoreList"])
  },
  data() {
    return {
      currentDetailId: null
    };
  },
  beforeMount() {
    this.storeDetailInit();
  },
  methods: {
    ...mapActions("appStore/instore", ["storeDetailInit"]),
    cancelInstore() {
      this.$router.push("/store/inStore");
    }
  }
};
</script>
