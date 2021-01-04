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
      <span @click="confirmSelect">选择</span>
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
    ...mapGetters("appOrder/purchaseProduct", ["dataList"]),
    ...mapGetters("appOrder/purchaseOrder", ["persistProductList"]),
    ...mapGetters("page", ["finishedText", "popupQueryParamStyle"])
  },
  watch: {
    persistProductList: {
      handler(val) {
        this.currentDataIds = val.map(item => item["id"]);
      },
      immediate: true
    }
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
    ...mapActions("appOrder/purchaseProduct", ["queryPage", "addNextPage"]),
    ...mapMutations("appOrder/purchaseOrder", {
      setProductList: "persistProductList"
    }),
    ...mapMutations("appOrder/purchaseProduct", ["queryParam"]),
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
    },
    confirmSelect() {
      // 查询结果
      // const dataIdList = this.dataList.map(item => item["id"]);
      // 原有的
      const oldIdList = this.persistProductList.map(item => item["id"]);
      // 查询结果内没有的
      // const list1 = this.persistProductList.filter(
      //   item => !dataIdList.includes(item["id"])
      // );
      // 已经选择的(原有的)
      const list2 = this.persistProductList.filter(item =>
        this.currentDataIds.includes(item["id"])
      );
      // 已经选择的(新增的)
      const list3 = this.dataList
        .filter(item => this.currentDataIds.includes(item["id"]))
        .filter(item => !oldIdList.includes(item["id"]));
      const res = [...list2, ...list3].sort((a, b) =>
        a["id"] > b["id"] ? 1 : -1
      );
      this.setProductList(res);
      this.$router.replace("/order/purchasePersist");
    }
  }
};
</script>
