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
      <span
        v-if="currentData['verifiStatus'] == 0 && perConfirm"
        @click="confirmData"
        >确认</span
      >
      <span
        v-if="
          perDelete &&
            (currentData['verifiStatus'] == 0 ||
              currentData['verifiStatus'] == 2)
        "
        @click="deleteData"
        >删除</span
      >
      <span @click="gotBack">返回</span>
    </div>
  </app-page-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppRowData from "./RowData.vue";
import AppDetailData from "./DetailItem.vue";
import { Confirm, Message } from "@utils/messagerUtil.js";
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
      "perDetail",
      "perDelete",
      "perConfirm"
    ]),
    ...mapGetters("page", ["finishedText", "popupQueryParamStyle"])
  },
  data() {
    return {
      currentDataId: null,
      loading: false
    };
  },
  mounted() {
    this.loadDetail();
  },
  methods: {
    ...mapActions("appStore/storeVerify", [
      "loadDetail",
      "deleteRecord",
      "confirmRecord"
    ]),
    gotBack() {
      this.$router.push("/store/verify");
    },
    deleteData() {
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
        return;
      }
      Confirm({ message: "确认删除该记录?" })
        .then(() => {
          this.loading = true;
          this.deleteRecord()
            .then(() => {
              this.$router.push("/store/verify");
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    },
    confirmData() {
      if (this.loading == true) {
        Message({ message: "请不要重复点击" });
        return;
      }
      Confirm({ message: "确认提交该记录?" })
        .then(() => {
          this.loading = true;
          this.confirmRecord()
            .then(() => {
              this.$router.push("/store/verify");
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        })
        .catch(() => {});
    }
  }
};
</script>
