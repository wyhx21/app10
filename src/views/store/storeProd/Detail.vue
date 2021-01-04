<template>
  <app-page-container>
    <template #header>
      <div class="app-data-item">
        <app-row-data :data="currentData" showDetail />
      </div>
    </template>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model:loading="listLoading"
        :finished="listFinished"
        :finished-text="finishedText"
        @load="loadList"
      >
        <div class="app-data-item">
          <div
            v-for="data of dataList"
            :key="data['id']"
            class="app-data-item_detail"
            :class="{ 'app-data-item_cur': data['id'] == currentDataId }"
            @click="currentDataId = data['id']"
          >
            <app-detail-data :data="data" />
          </div>
        </div>
      </van-list>
    </van-pull-refresh>

    <div class="app-bottom-fixed-search-button">
      <span @click="gotBack">返回</span>
    </div>
  </app-page-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
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
    ...mapGetters("appStore/storeProd", ["currentData"]),
    ...mapGetters("appStore/storeProdDetail", ["dataList"]),
    ...mapGetters("page", ["finishedText", "popupQueryParamStyle"])
  },
  data() {
    return {
      isLoading: true,
      listLoading: true,
      listFinished: false,
      currentDataId: null
    };
  },
  mounted() {
    this.initParam();
    this.onRefresh();
  },
  methods: {
    ...mapActions("appStore/storeProdDetail", ["queryPage", "addNextPage"]),
    ...mapMutations("appStore/storeProdDetail", ["queryParam"]),
    initParam() {
      const { areaId, prodId } = this.currentData;
      this.queryParam({ areaId, prodId });
    },
    onRefresh() {
      this.listLoading = true;
      this.queryPage(true)
        .then(res => {
          this.listFinished = !res;
          this.isLoading = false;
          this.listLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
          this.listLoading = false;
        });
    },
    loadList() {
      this.addNextPage()
        .then(res => {
          this.listLoading = false;
          this.listFinished = !res;
        })
        .catch(() => {
          this.listLoading = false;
        });
    },
    gotBack() {
      this.$router.push("/store/storeProd");
    }
  }
};
</script>
