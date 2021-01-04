<template>
  <app-page-container>
    <template #header>
      <div class="app-data-item">
        <app-row-data :data="currentData" showDetail />
      </div>
    </template>

    <div class="app-data-item" v-if="perDetail">
      <div
        v-for="item of detailList"
        :key="item['id']"
        @click="currentDataId = item['id']"
        :class="[
          { 'app-data-item_cur': item['id'] == currentDataId },
          'app-data-item_detail'
        ]"
      >
        <app-detail-data :data="item" />
      </div>
    </div>
    <div v-else class="app-data-item">
      <div class="app-data-item_placeholder"><span>您的权限不足</span></div>
    </div>

    <div class="app-bottom-fixed-search-button">
      <span @click="gotBack">返回</span>
    </div>
  </app-page-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppRowData from "./RowData.vue";
import AppDetailData from "./DetailItem.vue";
export default {
  components: {
    AppPageContainer,
    AppRowData,
    AppDetailData
  },
  computed: {
    ...mapGetters("appStore/storeVerify", [
      "currentData",
      "detailList",
      "perDetail"
    ]),
    ...mapGetters("page", ["finishedText", "popupQueryParamStyle"])
  },
  data() {
    return {
      currentDataId: null
    };
  },
  mounted() {
    this.loadDetail();
  },
  methods: {
    ...mapActions("appStore/storeVerify", ["loadDetail"]),
    gotBack() {
      this.$router.push("/store/verify");
    }
  }
};
</script>
