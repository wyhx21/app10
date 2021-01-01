<template>
  <app-page-container>
    <template #header>
      <div class="app-top-tobar-search">
        <span class="app-link" @click="showQueryInfo">筛选</span>
      </div>
    </template>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model:loading="listLoading"
        :finished="listFinished"
        :finished-text="finishedText"
        @load="loadList"
      >
        <div
          v-for="data of dataList"
          :key="data['id']"
          class="app-data-item"
          :class="{ 'app-data-item_cur': currentDataIds.includes(data['id']) }"
          @click="selectRowData(data['id'])"
        >
          <app-row-data :data="data" />
        </div>
      </van-list>
    </van-pull-refresh>
    <van-popup
      v-model:show="queryInfoShow"
      position="right"
      round
      :style="popupQueryParamStyle"
    >
      <app-query-param @refreshData="onRefresh" />
    </van-popup>
    <div class="app-bottom-fixed-search-button">
      <span>选择</span>
      <span @click="cancelSelect">取消</span>
    </div>
  </app-page-container>
</template>
<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import AppPageContainer from "@com/common/PageContainer.vue";
import AppQueryParam from "./ProductQueryParam.vue";
import AppRowData from "./ProductRowData.vue";
export default {
  components: {
    AppPageContainer,
    AppQueryParam,
    AppRowData
  },
  computed: {
    ...mapGetters("page/purchaseProduct", ["dataList"]),
    ...mapGetters("page", ["finishedText", "popupQueryParamStyle"])
  },
  data() {
    return {
      isLoading: true,
      listLoading: true,
      listFinished: false,
      queryInfoShow: false,
      currentDataIds: []
    };
  },
  mounted() {
    this.queryParam();
    this.onRefresh();
  },
  methods: {
    ...mapActions("page/purchaseProduct", ["queryPage", "addNextPage"]),
    ...mapMutations("page/purchaseProduct", ["queryParam"]),
    onRefresh() {
      this.listLoading = true;
      this.queryPage(true)
        .then(res => {
          this.queryInfoShow = false;
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
    showQueryInfo() {
      this.queryInfoShow = true;
    },
    selectRowData(val) {
      if (this.currentDataIds.includes(val)) {
        this.currentDataIds = this.currentDataIds.filter(item => item != val);
      } else {
        this.currentDataIds.push(val);
      }
    },
    cancelSelect() {
      this.$router.replace("/order/purchasePersist");
    }
  }
};
</script>
